import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import SplashLoader from './components/SplashLoader';
import Dashboard from './components/Dashboard';
import Employees from './components/Employees';
import CalendarView from './components/CalendarView';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SplashLoader />;
  }

  return (
    <div className="app-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="main-content">
        <Header />
        
        <div className="content-area">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'employees' && <Employees />}
          {activeTab === 'calendar' && <CalendarView />}
          {activeTab === 'regulations' && <div className="placeholder">Внутренние Документы</div>}
        </div>
      </main>
    </div>
  );
}

export default App;
