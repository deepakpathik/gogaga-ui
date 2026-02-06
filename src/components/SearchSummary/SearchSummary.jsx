import { useState, useRef, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { searchAirports } from '../../services/api';
import './SearchSummary.css';

const SearchSummary = ({
    origin, setOrigin,
    destination, setDestination,
    departDate, setDepartDate,
    returnDate, setReturnDate
}) => {
    const [showFromDropdown, setShowFromDropdown] = useState(false);
    const [fromSuggestions, setFromSuggestions] = useState([]);
    const [isFromLoading, setIsFromLoading] = useState(false);
    const fromRef = useRef(null);
    const fromTimeout = useRef(null);

    const [showToDropdown, setShowToDropdown] = useState(false);
    const [toSuggestions, setToSuggestions] = useState([]);
    const [isToLoading, setIsToLoading] = useState(false);
    const toRef = useRef(null);
    const toTimeout = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (fromRef.current && !fromRef.current.contains(event.target)) {
                setShowFromDropdown(false);
            }
            if (toRef.current && !toRef.current.contains(event.target)) {
                setShowToDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleFromChange = (e) => {
        const val = e.target.value;
        setOrigin(val);
        setShowFromDropdown(true);
        if (fromTimeout.current) clearTimeout(fromTimeout.current);

        if (val.length >= 1) {
            setIsFromLoading(true);
            fromTimeout.current = setTimeout(async () => {
                const results = await searchAirports(val);
                setFromSuggestions(results);
                setIsFromLoading(false);
            }, 300);
        } else {
            setFromSuggestions([]);
            setIsFromLoading(false);
        }
    };

    const handleToChange = (e) => {
        const val = e.target.value;
        setDestination(val);
        setShowToDropdown(true);
        if (toTimeout.current) clearTimeout(toTimeout.current);

        if (val.length >= 1) {
            setIsToLoading(true);
            toTimeout.current = setTimeout(async () => {
                const results = await searchAirports(val);
                setToSuggestions(results);
                setIsToLoading(false);
            }, 300);
        } else {
            setToSuggestions([]);
            setIsToLoading(false);
        }
    };

    return (
        <div className="search-summary-container">
            <div className="summary-group from" ref={fromRef} style={{ position: 'relative' }}>
                <span className="label">From</span>
                <input
                    type="text"
                    className="summary-input airport"
                    value={origin}
                    onChange={handleFromChange}
                    onFocus={() => { setShowFromDropdown(true); if (origin) handleFromChange({ target: { value: origin } }); }}
                    placeholder="Origin City/Airport"
                />
                {showFromDropdown && (
                    <ul className="city-dropdown" style={{ top: '100%', left: 0, width: '100%', minWidth: '300px', zIndex: 100 }}>
                        {isFromLoading ? (
                            <li className="message" style={{ cursor: 'default', color: '#666', fontStyle: 'italic', padding: '0.75rem 1rem' }}>Loading airports...</li>
                        ) : fromSuggestions.length > 0 ? (
                            fromSuggestions.map((item, index) => (
                                <li key={index} onClick={() => { setOrigin(item.label); setShowFromDropdown(false); }}>
                                    <div style={{ fontWeight: 'bold' }}>{item.label}</div>
                                    <div style={{ fontSize: '0.8em', color: '#666' }}>{item.city}, {item.country}</div>
                                </li>
                            ))
                        ) : origin.length >= 1 ? (
                            <li className="message" style={{ cursor: 'default', color: '#666', fontStyle: 'italic', padding: '0.75rem 1rem' }}>No airports found</li>
                        ) : null}
                    </ul>
                )}
            </div>

            <div className="summary-group date">
                <span className="label">Departure Date</span>
                <DatePicker
                    selected={departDate}
                    onChange={(date) => setDepartDate(date)}
                    minDate={new Date()}
                    dateFormat="EEE, MMM d"
                    className="summary-input date-val"
                    wrapperClassName="summary-date-wrapper"
                />
            </div>

            <div className="exchange-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>
            </div>

            <div className="summary-group to" ref={toRef} style={{ position: 'relative' }}>
                <span className="label">To</span>
                <input
                    type="text"
                    className="summary-input airport"
                    value={destination}
                    onChange={handleToChange}
                    onFocus={() => { setShowToDropdown(true); if (destination) handleToChange({ target: { value: destination } }); }}
                    placeholder="Destination City/Airport"
                />
                {showToDropdown && (
                    <ul className="city-dropdown" style={{ top: '100%', left: 0, width: '100%', minWidth: '300px', zIndex: 100 }}>
                        {isToLoading ? (
                            <li className="message" style={{ cursor: 'default', color: '#666', fontStyle: 'italic', padding: '0.75rem 1rem' }}>Loading airports...</li>
                        ) : toSuggestions.length > 0 ? (
                            toSuggestions.map((item, index) => (
                                <li key={index} onClick={() => { setDestination(item.label); setShowToDropdown(false); }}>
                                    <div style={{ fontWeight: 'bold' }}>{item.label}</div>
                                    <div style={{ fontSize: '0.8em', color: '#666' }}>{item.city}, {item.country}</div>
                                </li>
                            ))
                        ) : destination.length >= 1 ? (
                            <li className="message" style={{ cursor: 'default', color: '#666', fontStyle: 'italic', padding: '0.75rem 1rem' }}>No airports found</li>
                        ) : null}
                    </ul>
                )}
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
                    placeholderText="Select Date"
                />
            </div>
        </div>
    );
};

export default SearchSummary;

