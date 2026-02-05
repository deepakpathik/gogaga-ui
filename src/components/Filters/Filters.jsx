import { useState } from 'react';
import './Filters.css';

const Filters = () => {
    return (
        <div className="filters-section">
            <div className="search-row">
                <div className="input-group">
                    <label>Destination</label>
                    <input type="text" placeholder="City" defaultValue="City" className="text-input" />
                </div>

                <div className="input-group">
                    <label>Trip start date</label>
                    <div className="date-input">Tue, Mar 12</div>
                </div>

                <div className="input-group">
                    <label>No.of Passengers</label>
                    <div className="passenger-input">
                        2 Adults, 2 Children
                        <svg className="icon chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </div>
                </div>

                <button className="search-btn-black">
                    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </button>
            </div>

            <div className="hotel-options-row">
                <div className="option-group">
                    <span className="label">Hotel Standard</span>
                    <div className="star-rating">
                        <button className="star-btn">3 <svg className="icon star" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></button>
                        <button className="star-btn">4 <svg className="icon star" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></button>
                        <button className="star-btn active">5 <svg className="icon star" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></button>
                    </div>
                </div>

                <div className="option-group checkbox-group">
                    <label className="checkbox-label">
                        Add Lunch
                        <input type="checkbox" defaultChecked />
                        <span className="checkmark"></span>
                    </label>
                    <label className="checkbox-label">
                        Add Dinner
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                    </label>
                    <svg className="icon info" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                </div>
            </div>
        </div>
    );
};

export default Filters;
