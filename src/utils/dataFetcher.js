import Papa from 'papaparse';

const CSV_URL = 'https://docs.google.com/spreadsheets/d/1ENd88QxTlSEyp2GTILBd_U7j1MCnFeMJI7lvo_i-L_0/export?format=csv';

const parseCurrency = (str) => parseFloat((str || "0").replace(/[^\d,-]/g, '').replace(',', '.'));

export async function fetchDashboardData() {
  return new Promise((resolve, reject) => {
    Papa.parse(CSV_URL, {
      download: true,
      complete: (results) => {
        try {
          const data = results.data;
          
          let totalRevenue = "р.0,00";
          let safeBox = "р.0,00";
          let opProfit = "р.0,00";
          let dailyRevenue = "р.0,00";
          let occupancy = "0,00%";

          let totalHotel = 0;
          let totalBaths = 0;
          let totalRestaurant = 0;
          
          let dailyHotel = 0;
          let dailyBaths = 0;
          let dailyRestaurant = 0;

          // "ВЫРУЧКА (ИТОГО)" from row 3 (index 2)
          if (data && data[2]) {
             if (data[2][1]) totalRevenue = data[2][1];
             if (data[2][5]) safeBox = data[2][5];
             if (data[2][9]) opProfit = data[2][9];
          }

          // Format today's date as DD.MM.YYYY
          const today = new Date();
          const day = String(today.getDate()).padStart(2, '0');
          const month = String(today.getMonth() + 1).padStart(2, '0');
          const year = today.getFullYear();
          const todayString = `${day}.${month}.${year}`;

          // Look for 'Дата' row to strictly find today's stats, or fallback to the latest valid row
          const headersRowIndex = data.findIndex(row => row[0] === 'Дата');
          if (headersRowIndex !== -1) {
            
            // Try matching today's date first
            const matchingRow = data.find(row => row[0] === todayString);
            
            if (matchingRow) {
               if (matchingRow[1]) dailyHotel = parseCurrency(matchingRow[1]);
               if (matchingRow[2]) dailyBaths = parseCurrency(matchingRow[2]);
               if (matchingRow[3]) dailyRestaurant = parseCurrency(matchingRow[3]);
               if (matchingRow[4]) dailyRevenue = matchingRow[4];
               if (matchingRow[9]) occupancy = matchingRow[9];
            } else {
               // Fallback: Find the last non-empty row to get the latest day's data
               let lastValidRowIndex = headersRowIndex + 1;
               while(data[lastValidRowIndex] && data[lastValidRowIndex][0] && data[lastValidRowIndex][0].trim() !== '') {
                  lastValidRowIndex++;
               }
               const latestDataRow = data[lastValidRowIndex - 1];
               
               if (latestDataRow) {
                  if (latestDataRow[1]) dailyHotel = parseCurrency(latestDataRow[1]);
                  if (latestDataRow[2]) dailyBaths = parseCurrency(latestDataRow[2]);
                  if (latestDataRow[3]) dailyRestaurant = parseCurrency(latestDataRow[3]);
                  if (latestDataRow[4]) dailyRevenue = latestDataRow[4];
                  if (latestDataRow[9]) occupancy = latestDataRow[9];
               }
            }
            
            // Calculate monthly totals
            for (let i = headersRowIndex + 1; i < data.length; i++) {
              const r = data[i];
              if (!r || !r[0] || r[0].trim() === '') break;
              totalHotel += parseCurrency(r[1]);
              totalBaths += parseCurrency(r[2]);
              totalRestaurant += parseCurrency(r[3]);
            }
          }

          // Clean up formatting
          const cleanTotalRev = totalRevenue.replace('р.', '₽ ').trim();
          const cleanDailyRev = dailyRevenue.replace('р.', '₽ ').trim();
          const cleanSafeBox = safeBox.replace('р.', '₽ ').trim();
          const cleanOpProfit = opProfit.replace('р.', '₽ ').trim();

          resolve({
            totalRevenue: cleanTotalRev,
            dailyRevenue: cleanDailyRev,
            safeBox: cleanSafeBox,
            operatingProfit: cleanOpProfit,
            occupancy: occupancy,
            dailyBreakdown: [
              { name: 'Номерной фонд', value: dailyHotel, fill: '#4DB8FF' },
              { name: 'Ресторан', value: dailyRestaurant, fill: '#D4AF37' },
              { name: 'Банный комплекс', value: dailyBaths, fill: '#2ECC71' }
            ],
            monthlyBreakdown: [
              { name: 'Номерной фонд', value: totalHotel, fill: '#4DB8FF' },
              { name: 'Ресторан', value: totalRestaurant, fill: '#D4AF37' },
              { name: 'Банный комплекс', value: totalBaths, fill: '#2ECC71' }
            ],
            raw: data
          });
        } catch(e) {
          console.error("Error parsing spreadsheet data:", e);
          resolve(getMockData());
        }
      },
      error: (error) => {
        console.error("PapaParse error:", error);
        resolve(getMockData());
      }
    });
  });
}

function getMockData() {
  return {
    totalRevenue: "₽ 3 680 000,00",
    dailyRevenue: "₽ 380 000,00",
    safeBox: "₽ 3 405 000,00",
    operatingProfit: "₽ 3 665 000,00",
    occupancy: "85.00%",
    dailyBreakdown: [
      { name: 'Номерной фонд', value: 50000, fill: '#4DB8FF' },
      { name: 'Ресторан', value: 300000, fill: '#D4AF37' },
      { name: 'Банный комплекс', value: 30000, fill: '#2ECC71' }
    ],
    monthlyBreakdown: [
      { name: 'Номерной фонд', value: 1500000, fill: '#4DB8FF' },
      { name: 'Ресторан', value: 9000000, fill: '#D4AF37' },
      { name: 'Банный комплекс', value: 900000, fill: '#2ECC71' }
    ],
    raw: null
  };
}
