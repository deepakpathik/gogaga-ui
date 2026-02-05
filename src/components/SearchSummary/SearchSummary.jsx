import { useState, useRef, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { searchCities } from '../../services/api';
import './SearchSummary.css';

const SearchSummary = ({ origin, setOrigin, destination, departDate, returnDate, setReturnDate }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [filteredOrigins, setFilteredOrigins] = useState([]);
    const dropdownRef = useRef(null);
    const debounceTimeout = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleOriginChange = (e) => {
        const value = e.target.value;
        setOrigin(value);
        setShowDropdown(true);

        if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

        if (value.length > 0) {
            debounceTimeout.current = setTimeout(async () => {
                const results = await searchCities(value);
                setFilteredOrigins(results);
            }, 300);
        } else {
            setFilteredOrigins([]);
        }
    };

    const selectOrigin = (city) => {
        setOrigin(city);
        setShowDropdown(false);
    };

    return (
        <div className="search-summary-container">
            <div className="summary-group from" ref={dropdownRef} style={{ position: 'relative' }}>
                <span className="label">From</span>
                <input
                    type="text"
                    className="summary-input airport"
                    value={origin}
                    onChange={handleOriginChange}
                    onFocus={() => origin && setShowDropdown(true)}
                    placeholder="Select Origin"
                />
                {showDropdown && filteredOrigins.length > 0 && (
                    <ul className="city-dropdown" style={{ top: '100%', left: 0, width: '100%', zIndex: 10 }}>
                        {filteredOrigins.map((city, index) => (
                            <li key={index} onClick={() => selectOrigin(city)}>
                                {city}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="summary-group date">
                <span className="label">Departure Date</span>
                <span className="date-val">{departDate instanceof Date ? departDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) : departDate}</span>
            </div>

            <div className="exchange-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>
            </div>

            <div className="summary-group to">
                <span className="label">To</span>
                {/* To is read-only based on destination filter */}
                <input type="text" className="summary-input airport" value={destination} readOnly style={{ cursor: 'default' }} />
            </div>

            <div className="summary-group date">
                <span className="label">Return Date</span>
                <DatePicker
                    selected={returnDate}
                    onChange={(date) => setReturnDate(date)}
                    minDate={departDate instanceof Date ? departDate : new Date()}
                    dateFormat="EEE, MMM d"
                    className="summary-input date-val"
                    wrapperClassName="summary-date-wrapper"
                />
            </div>
        </div>
    );
};

export default SearchSummary;
