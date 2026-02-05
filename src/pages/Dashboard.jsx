import { useState } from 'react';
import Tabs from '../components/Tabs';
import Filters from '../components/Filters';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('indian');

    return (
        <div className="dashboard-container">
            <div className="dashboard-header-row">
                <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
            </div>

            <div className="sub-tabs">
                <button className="sub-tab active">Package with Flights</button>
                <button className="sub-tab">Package without Flights</button>
            </div>

            <div className="dashboard-content">
                <Filters />

                {/* Visual Separator if needed, or Flight Cards next */}
                <div style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    Displaying {activeTab === 'indian' ? 'Indian' : 'International'} Holidays
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
