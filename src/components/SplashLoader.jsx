import './SplashLoader.css';
import { Activity } from 'lucide-react';

export default function SplashLoader() {
  return (
    <div className="splash-container">
      <div className="splash-content">
        <div className="logo-assembly">
          <img src="/logo.png" alt="Таежный Logo" className="splash-logo" />
        </div>
        
        <div className="loading-indicator">
          <Activity size={24} className="pulse-icon" />
          <div className="loading-text">Загрузка данных...</div>
        </div>
        
        <div className="data-particles">
          <div className="particle p1"></div>
          <div className="particle p2"></div>
          <div className="particle p3"></div>
          <div className="particle p4"></div>
          <div className="particle p5"></div>
        </div>
      </div>
    </div>
  );
}
