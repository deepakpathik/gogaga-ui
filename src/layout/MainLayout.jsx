import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const MainLayout = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    return (
        <div className={`layout-container ${isSidebarCollapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-area">
                <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
            </div>
            <main className="main-content">
                <Outlet />
            </main>
            <style>{`
        .layout-container {
          display: grid;
          grid-template-columns: ${isSidebarCollapsed ? '80px' : 'var(--sidebar-width)'} 1fr;
          min-height: 100vh;
          transition: grid-template-columns 0.3s ease;
        }
        .main-content {
          padding: 2rem;
          background-color: var(--background);
          overflow-y: auto;
        }
        .sidebar-area {
            border-right: 1px solid var(--border);
            background: var(--surface);
            overflow: hidden;
        }
      `}</style>
        </div>
    );
};

export default MainLayout;
