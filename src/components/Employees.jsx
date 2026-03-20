import { User, Shield, Briefcase, FileText, Calendar as CalendarIcon, Target } from 'lucide-react';
import './Employees.css';

const employees = [
  { id: 1, name: 'Анна Петрова', role: 'Администратор', status: 'На смене', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', roleColor: '#4DB8FF' },
  { id: 2, name: 'Дмитрий Иванов', role: 'Менеджер', status: 'Выходной', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', roleColor: '#D4AF37' },
  { id: 3, name: 'Елена Смирнова', role: 'Горничная', status: 'На смене', avatar: 'https://randomuser.me/api/portraits/women/68.jpg', roleColor: '#2ECC71' },
  { id: 4, name: 'Макс Волков', role: 'Охрана', status: 'На смене', avatar: 'https://randomuser.me/api/portraits/men/45.jpg', roleColor: '#FF6B6B' },
  { id: 5, name: 'Нина Соколова', role: 'Банщица', status: 'Перерыв', avatar: 'https://randomuser.me/api/portraits/women/24.jpg', roleColor: '#9b59b6' },
  { id: 6, name: 'Олег Морозов', role: 'Шеф-повар', status: 'На смене', avatar: 'https://randomuser.me/api/portraits/men/83.jpg', roleColor: '#e67e22' }
];

export default function Employees() {
  return (
    <div className="employees-container glass-panel">
      <div className="employees-header">
        <h2 className="section-title">Управление персоналом</h2>
        <div className="staff-filters">
          <button className="filter-btn active">Все сотрудники</button>
          <button className="filter-btn">На смене</button>
          <button className="filter-btn">Отделы</button>
        </div>
      </div>

      <div className="employees-grid">
        {employees.map(emp => (
          <div key={emp.id} className="employee-card">
            <div className="employee-profile">
              <div className="avatar-wrapper">
                <img src={emp.avatar} alt={emp.name} className="employee-avatar"/>
                <span className={`status-indicator ${emp.status === 'На смене' ? 'active' : emp.status === 'Перерыв' ? 'warning' : 'offline'}`}></span>
              </div>
              <div className="employee-info">
                <h3 className="employee-name">{emp.name}</h3>
                <span className="employee-role" style={{ color: emp.roleColor }}>{emp.role}</span>
              </div>
            </div>
            
            <div className="employee-controls">
              <div className="tooltip-container">
                <button className="btn btn-inactive control-btn" disabled>
                  <FileText size={16} /> Регл.
                </button>
                <span className="tooltip-text">Скоро будет доступно</span>
              </div>
              
              <div className="tooltip-container">
                <button className="btn btn-inactive control-btn" disabled>
                  <CalendarIcon size={16} /> График
                </button>
                <span className="tooltip-text">Скоро будет доступно</span>
              </div>
              
              <div className="tooltip-container">
                <button className="btn btn-inactive control-btn" disabled>
                  <Target size={16} /> KPI
                </button>
                <span className="tooltip-text">Скоро будет доступно</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
