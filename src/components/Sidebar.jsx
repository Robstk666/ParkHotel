import { useState, useEffect } from 'react';
import { Home, Users, Calendar, FileText, Settings, LogOut, Search, Bell, Activity } from 'lucide-react';
import './Sidebar.css';

const navItems = [
  { id: 'dashboard', label: 'Главная', icon: Home },
  { id: 'employees', label: 'Сотрудники', icon: Users },
  { id: 'calendar', label: 'Календарь', icon: Calendar },
  { id: 'regulations', label: 'Внутренние Документы', icon: FileText },
];

export default function Sidebar({ activeTab, setActiveTab }) {
  return (
    <aside className="sidebar glass-panel">
      <div className="sidebar-header">
        <div className="logo-container">
          <img src="/logo.png" alt="Таежный Logo" className="logo" />
        </div>
      </div>
      
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            <item.icon className="nav-icon" size={20} />
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="nav-item text-danger">
          <LogOut className="nav-icon" size={20} />
          <span className="nav-label">Выйти</span>
        </button>
      </div>
    </aside>
  );
}
