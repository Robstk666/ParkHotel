import { X } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import './RevenueModal.css';

const formatCurrency = (value) => `₽ ${(value / 1000).toFixed(0)}k`;

export default function RevenueModal({ onClose, title, revenueTotal, breakdownData }) {
  const rawTotal = breakdownData ? breakdownData.reduce((acc, curr) => acc + curr.value, 0) : 0;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">{title}</h2>
            <p className="modal-subtitle">Итого: {revenueTotal}</p>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        
        <div className="modal-body">
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={breakdownData} layout="vertical" margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" horizontal={false} />
                <XAxis type="number" tickFormatter={formatCurrency} stroke="rgba(255,255,255,0.5)" fontSize={12} />
                <YAxis dataKey="name" type="category" stroke="rgba(255,255,255,0.7)" width={110} fontSize={11} />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  contentStyle={{ backgroundColor: 'rgba(17, 34, 64, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="revenue-stats">
            {breakdownData && breakdownData.map(item => (
              <div key={item.name} className="stat-card" style={{ borderTop: `3px solid ${item.fill}` }}>
                <span className="stat-name">{item.name}</span>
                <span className="stat-value">₽ {item.value.toLocaleString('ru-RU')}</span>
                <span className="stat-percent">{rawTotal > 0 ? ((item.value / rawTotal) * 100).toFixed(1) : 0}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
