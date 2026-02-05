import React from 'react';

const SearchSummary = () => {
    return (
        <div className="search-summary-container">
            <div className="summary-group from">
                <span className="label">From</span>
                <span className="airport">Rajiv Gandhi International Airport (HYD), Hyderabad, India</span>
            </div>

            <div className="summary-group date">
                <span className="label">Departure Date</span>
                <span className="date-val">Tue, Mar 12, 2025</span>
            </div>

            <div className="exchange-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>
            </div>

            <div className="summary-group to">
                <span className="label">To</span>
                <span className="airport">Mopa Airport India (GOX), Goa, India</span>
            </div>

            <div className="summary-group date">
                <span className="label">Return Date</span>
                <span className="date-val">Sun, Mar 17, 2025</span>
            </div>
        </div>
    );
};

export default SearchSummary;
