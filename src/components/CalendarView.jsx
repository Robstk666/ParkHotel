import { ChevronLeft, ChevronRight, Wrench, FileSignature, Users } from 'lucide-react';
import './CalendarView.css';

const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

const events = {
  '3': [{ type: 'maintenance', title: 'Проверка печи в Сауне 2', icon: Wrench }],
  '12': [{ type: 'shift', title: 'Смена администраторов', icon: Users }],
  '18': [{ type: 'maintenance', title: 'Полная очистка бассейна', icon: Wrench }],
  '22': [{ type: 'admin', title: 'Продление договора поставки', icon: FileSignature }],
  '25': [{ type: 'maintenance', title: 'Замена фильтров в бане', icon: Wrench }],
};

export default function CalendarView() {
  
  const generateDays = () => {
    const days = [];
    for (let i = 0; i < 6; i++) {
        days.push({ day: '', isCurrentMonth: false });
    }
    for (let i = 1; i <= 31; i++) {
        days.push({ day: i, isCurrentMonth: true });
    }
    const remaining = (7 - (days.length % 7)) % 7;
    for (let i = 1; i <= remaining; i++) {
        days.push({ day: '', isCurrentMonth: false });
    }
    return days;
  };

  const calendarDays = generateDays();

  return (
    <div className="calendar-container glass-panel">
      <div className="calendar-header">
        <h2 className="section-title">График и Обслуживание</h2>
        
        <div className="calendar-controls">
          <button className="icon-btn"><ChevronLeft size={20} /></button>
          <span className="current-month">Март 2026</span>
          <button className="icon-btn"><ChevronRight size={20} /></button>
        </div>
        
        <div className="calendar-filters">
          <span className="filter-label">Фильтр:</span>
          <select className="dept-select">
            <option>Все отделы</option>
            <option>Бани</option>
            <option>Отель</option>
            <option>Ресторан</option>
          </select>
        </div>
      </div>
      
      <div className="calendar-wrapper">
        <div className="calendar-grid">
          {daysOfWeek.map(day => (
            <div key={day} className="calendar-day-header">{day}</div>
          ))}
        
        {calendarDays.map((dateObj, idx) => {
          const dateStr = dateObj.day.toString();
          const dayEvents = dateObj.isCurrentMonth && events[dateStr] ? events[dateStr] : [];
          
          return (
            <div key={idx} className={`calendar-cell ${!dateObj.isCurrentMonth ? 'empty' : ''} ${dateStr === '20' ? 'today' : ''}`}>
              <span className="date-num">{dateObj.day}</span>
              <div className="events-container">
                {dayEvents.map((evt, eIdx) => (
                  <div key={eIdx} className={`event-marker ${evt.type}`}>
                    <evt.icon size={12} className="event-icon" />
                    <span className="event-text">{evt.title}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        </div>
      </div>
      
      <div className="calendar-legend">
        <div className="legend-item"><span className="legend-dot maintenance"></span> Обслуживание</div>
        <div className="legend-item"><span className="legend-dot shift"></span> Смены / Персонал</div>
        <div className="legend-item"><span className="legend-dot admin"></span> Администрация</div>
      </div>
    </div>
  );
}
