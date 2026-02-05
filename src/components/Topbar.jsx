import gogagaLogo from '../assets/gogaga_logo.png';

const Topbar = ({ isSidebarCollapsed, toggleSidebar }) => {
    return (
        <header className="topbar">
            <div className="topbar-left">
                <div className="logo-container">
                    <img src={gogagaLogo} alt="Gogaga" className="brand-logo" />
                </div>
                <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
                    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                </button>
            </div>

            <div className="topbar-right">
                <button className="icon-btn">
                    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
                </button>
                <div className="notification-group">
                    <button className="icon-btn">
                        <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                        <span className="badge-dot cyan">520</span>
                    </button>
                    <button className="icon-btn">
                        <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                        <span className="badge-dot blue">1</span>
                    </button>
                    <button className="icon-btn">
                        <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                        <span className="badge-dot red">15</span>
                    </button>
                </div>

                <div className="user-profile">
                    <div className="avatar-placeholder">
                        <img src="https://ui-avatars.com/api/?name=Girish+Kumar&background=0D8ABC&color=fff&rounded=true" alt="GK" />
                    </div>
                    <span className="username">Girish Kumar</span>
                    <svg className="icon chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
            </div>
        </header>
    );
};

export default Topbar;
