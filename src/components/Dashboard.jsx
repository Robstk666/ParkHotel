import { useState, useEffect } from 'react';
import { ArrowUpRight, ChevronRight, CheckCircle, AlertTriangle, Clock, CalendarIcon } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { fetchDashboardData } from '../utils/dataFetcher';
import RevenueModal from './RevenueModal';
import './Dashboard.css';

const sparklineData = [
  { value: 400 }, { value: 600 }, { value: 500 }, 
  { value: 800 }, { value: 750 }, { value: 900 }, { value: 1200 }
];

const occupancyData = [
  { name: 'Занято', value: 85, color: '#4DB8FF' },
  { name: 'Свободно', value: 15, color: 'rgba(255,255,255,0.1)' }
];

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [isRevenueModalOpen, setRevenueModalOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      const fetchedData = await fetchDashboardData();
      if (isMounted) setData(fetchedData);
    }
    loadData();

    // Refresh every hour (3600000 ms) automatically
    const intervalId = setInterval(loadData, 3600000);

    // Event listener for manual refresh from Header
    const handleForceRefresh = () => {
      setData(null);
      loadData();
    };
    window.addEventListener('refresh-dashboard', handleForceRefresh);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
      window.removeEventListener('refresh-dashboard', handleForceRefresh);
    };
  }, []);

  if (!data) return <div className="placeholder">Загрузка данных...</div>;

  return (
    <div className="dashboard-container">
      
      {/* Metrics Row */}
      <div className="metrics-grid">
        
        {/* Revenue Card */}
        <div className="metric-card glass-panel interactive" onClick={() => setRevenueModalOpen(true)}>
          <div className="metric-header">
            <h3 className="metric-title">Выручка сегодня</h3>
            <button className="drill-down-btn"><ChevronRight size={18} /></button>
          </div>
          <div className="metric-value">{data.dailyRevenue}</div>
          <div className="metric-trend success" style={{color: 'var(--text-muted)'}}>
             <span>Всего (Итого): <strong style={{color: 'var(--text-main)'}}>{data.totalRevenue}</strong></span>
          </div>
          <div className="sparkline-container">
            <ResponsiveContainer width="100%" height={40}>
              <AreaChart data={sparklineData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="value" stroke="#D4AF37" fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Occupancy Card */}
        <div className="metric-card glass-panel">
          <div className="metric-header">
            <h3 className="metric-title">Загрузка</h3>
          </div>
          <div className="metric-value-row">
            <div className="metric-value">{data.occupancy}</div>
            <div className="gauge-container">
              <ResponsiveContainer width={60} height={60}>
                <PieChart>
                  <Pie
                    data={occupancyData}
                    innerRadius={20}
                    outerRadius={28}
                    startAngle={90}
                    endAngle={-270}
                    dataKey="value"
                    stroke="none"
                  >
                    {occupancyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Operating Profit */}
        <div className="metric-card glass-panel">
          <div className="metric-header">
            <h3 className="metric-title">Опер. прибыль</h3>
          </div>
          <div className="metric-value">{data.operatingProfit}</div>
          <div className="metric-trend success">
            <ArrowUpRight size={14} /> <span>Прогноз: Позитивный</span>
          </div>
        </div>

        {/* Guest Satisfaction */}
        <div className="metric-card glass-panel">
          <div className="metric-header">
            <h3 className="metric-title">Оценка гостей</h3>
          </div>
          <div className="metric-value">4.9/5.0</div>
          <div className="stars-container">
             ⭐⭐⭐⭐⭐
          </div>
        </div>
      </div>

      <div className="lower-grid">
        {/* Operational Overview */}
        <div className="operational-panel glass-panel">
          <h3 className="panel-title">Обзор операций</h3>
          <div className="status-list">
            <div className="status-item">
              <span className="dept-name">Ресепшн</span>
              <div className="status-badge success"><CheckCircle size={14} /> В сети</div>
            </div>
            <div className="status-item">
              <span className="dept-name">Ресторан</span>
              <div className="status-badge warning"><Clock size={14} /> Загружен</div>
            </div>
            <div className="status-item">
              <span className="dept-name">Бани</span>
              <div className="status-badge success"><CheckCircle size={14} /> Активно</div>
            </div>
            <div className="status-item">
              <span className="dept-name">Клининг</span>
              <div className="status-badge success"><CheckCircle size={14} /> В графике</div>
            </div>
          </div>
        </div>

        {/* Upcoming Alerts/Tasks */}
        <div className="alerts-panel glass-panel">
          <h3 className="panel-title">Уведомления и Задачи</h3>
          <div className="alerts-list">
            <div className="alert-item warning">
              <div className="alert-icon"><AlertTriangle size={18} /></div>
              <div className="alert-content">
                <div className="alert-title">Обновление договора</div>
                <div className="alert-date">22 Марта, 2026</div>
              </div>
              <button className="btn btn-outline btn-sm">Проверить</button>
            </div>
            <div className="alert-item">
              <div className="alert-icon"><CalendarIcon size={18} /></div>
              <div className="alert-content">
                <div className="alert-title">Замена фильтров в бане</div>
                <div className="alert-date">25 Марта, 2026</div>
              </div>
              <button className="btn btn-outline btn-sm">График</button>
            </div>
          </div>
        </div>
      </div>

      {isRevenueModalOpen && <RevenueModal onClose={() => setRevenueModalOpen(false)} revenueTotal={data.dailyRevenue} />}
    </div>
  );
}
