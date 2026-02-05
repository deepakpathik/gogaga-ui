import './Tabs.css';

const Tabs = ({ activeTab, onTabChange }) => {
    return (
        <div className="tabs-container">
            <div className="tabs-wrapper">
                <button
                    className={`tab-btn primary ${activeTab === 'indian' ? 'active' : ''}`}
                    onClick={() => onTabChange('indian')}
                >
                    Indian Holidays
                </button>
                <button
                    className={`tab-btn primary ${activeTab === 'international' ? 'active' : ''}`}
                    onClick={() => onTabChange('international')}
                >
                    International Holidays
                </button>
            </div>
        </div>
    );
};

export default Tabs;
