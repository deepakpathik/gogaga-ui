import { useState } from 'react';
import Tabs from '../components/Tabs';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('indian');

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
            </div>

            <div className="dashboard-content">
                {/* Content will go here (Filters, Flight Cards) */}
                <div style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    Displaying {activeTab === 'indian' ? 'Indian' : 'International'} Holidays
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
