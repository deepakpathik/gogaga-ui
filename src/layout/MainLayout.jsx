import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div className="layout-container">
            <div className="sidebar-area">
                {}
            </div>
            <main className="main-content">
                <Outlet />
            </main>
            <style>{`
        .layout-container {
          display: grid;
          grid-template-columns: var(--sidebar-width) 1fr;
          min-height: 100vh;
        }
        .main-content {
          padding: 2rem;
          background-color: var(--background);
          overflow-y: auto;
        }
        .sidebar-area {
            border-right: 1px solid var(--border);
            background: var(--surface);
        }
      `}</style>
        </div>
    );
};

export default MainLayout;
