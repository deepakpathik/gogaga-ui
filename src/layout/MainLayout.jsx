import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';
import Topbar from '../components/Topbar/Topbar';

const MainLayout = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(window.innerWidth < 768);

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    return (
        <div className="app-container">
            <Topbar isSidebarCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />

            <div className={`main-body ${isSidebarCollapsed ? 'collapsed' : ''}`}>
                <div className="sidebar-area">
                    <Sidebar isCollapsed={isSidebarCollapsed} />
                </div>
                
                {!isSidebarCollapsed && (
                    <div className="sidebar-overlay" onClick={() => setIsSidebarCollapsed(true)}></div>
                )}
                <main className="main-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
