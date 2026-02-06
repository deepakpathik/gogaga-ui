import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isCollapsed }) => {
    const location = useLocation();

    // Helper to determine if a path is active
    const isActive = (path) => location.pathname === path;
    const isLeadsActive = location.pathname.startsWith('/leads');
    return (
        <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-content">
                <div className="sidebar-section">
                    {!isCollapsed && <div className="sidebar-section-title">Menu</div>}
                    <nav>
                        <Link to="/" className={`nav-item dashboard-item ${isActive('/') ? 'active' : ''}`}>
                            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                            {!isCollapsed && <span>Dashboard</span>}
                        </Link>

                        <div className="nav-group">
                            <Link to="/leads" className={`nav-item parent-item ${isLeadsActive ? 'active' : ''}`}>
                                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                                {!isCollapsed && <span>Leads</span>}
                                {!isCollapsed && <svg className="icon chevron-down" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>}
                            </Link>

                            {!isCollapsed && (
                                <div className="sub-menu">
                                    <Link to="/leads/all" className={`nav-item sub-item ${location.pathname === '/leads/all' ? 'active' : ''}`}>
                                        <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                                        <span>Leads</span>
                                        <span className="badge">30434</span>
                                    </Link>
                                </div>
                            )}
                        </div>
                        <Link to="/itineraries" className={`nav-item ${isActive('/itineraries') ? 'active' : ''}`}>
                            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                            {!isCollapsed && <span>Itineraries</span>}
                        </Link>
                        <Link to="/reviews" className={`nav-item ${isActive('/reviews') ? 'active' : ''}`}>
                            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                            {!isCollapsed && <span>Google Reviews</span>}
                        </Link>
                        <Link to="/vouchers" className={`nav-item ${isActive('/vouchers') ? 'active' : ''}`}>
                            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                            {!isCollapsed && <span>Vouchers</span>}
                        </Link>
                        <Link to="/accounts" className={`nav-item ${isActive('/accounts') ? 'active' : ''}`}>
                            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                            {!isCollapsed && <span>Accounts</span>}
                        </Link>
                        <Link to="/reports" className={`nav-item ${isActive('/reports') ? 'active' : ''}`}>
                            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>
                            {!isCollapsed && <span>Reports</span>}
                        </Link>
                        <Link to="/support" className={`nav-item ${isActive('/support') ? 'active' : ''}`}>
                            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                            {!isCollapsed && <span>Customer Support</span>}
                        </Link>
                    </nav>
                </div>

                <div className="sidebar-section">
                    {!isCollapsed && <div className="sidebar-section-title">User Control</div>}
                    <nav>
                        <Link to="/coming-soon" className="nav-item">
                            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                            {!isCollapsed && <span>User Settings</span>}
                        </Link>
                        <Link to="/coming-soon" className="nav-item">
                            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 15h-2v-6h2zm0-8h-2V7h2z"></path></svg>
                            {!isCollapsed && <span>Masters Settings</span>}
                        </Link>
                        <Link to="/coming-soon" className="nav-item">
                            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                            {!isCollapsed && <span>HRM</span>}
                        </Link>
                        <Link to="/coming-soon" className="nav-item">
                            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3h18v18H3zM21 9H3M21 15H3M12 3v18"></path></svg>
                            {!isCollapsed && <span>Assets Management</span>}
                        </Link>
                    </nav>
                </div>

                <div className="sidebar-section">
                    {!isCollapsed && <div className="sidebar-section-title">Participants</div>}
                    <nav>
                        <Link to="/customers" className={`nav-item ${isActive('/customers') ? 'active' : ''}`}>
                            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                            {!isCollapsed && <span>Itinerary Customers</span>}
                        </Link>
                        <Link to="/partners" className={`nav-item ${isActive('/partners') ? 'active' : ''}`}>
                            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                            {!isCollapsed && <span>Partners</span>}
                        </Link>
                        <Link to="/suppliers" className={`nav-item ${isActive('/suppliers') ? 'active' : ''}`}>
                            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                            {!isCollapsed && <span>Suppliers</span>}
                        </Link>
                    </nav>
                </div>

                <div className="sidebar-section">
                    {!isCollapsed && <div className="sidebar-section-title">Miscellaneous</div>}
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
