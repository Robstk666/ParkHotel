import { Search, Bell, RefreshCw, FileSpreadsheet } from 'lucide-react';
import './Header.css';

export default function Header() {
  return (
    <header className="top-header glass-panel">
      <div className="header-left">
        <h1 className="page-title">ПУЛЬТ ВЛАДЕЛЬЦА</h1>
        <div className="status-indicator">
          <div className="static-dot"></div>
          <span className="status-text">Операции: Стабильно</span>
        </div>
      </div>
      
      <div className="header-right">
        <div className="header-actions">
          <a
            href="https://docs.google.com/spreadsheets/d/1ENd88QxTlSEyp2GTILBd_U7j1MCnFeMJI7lvo_i-L_0/edit"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
            title="Открыть таблицу с данными"
          >
            <FileSpreadsheet size={18} />
            <span className="hide-on-mobile">ТАБЛИЦА ДАННЫХ</span>
          </a>

          <button 
            className="btn btn-update" 
            title="Обновить" 
            onClick={() => window.dispatchEvent(new Event('refresh-dashboard'))}
          >
            <RefreshCw size={18} className="icon-spin-hover" />
            <span className="hide-on-mobile">ОБНОВИТЬ СТАТИСТИКУ</span>
          </button>
          
          <button className="notification-btn">
            <Bell size={20} />
            <span className="notification-badge">3</span>
          </button>
        </div>
      </div>
    </header>
  );
}
