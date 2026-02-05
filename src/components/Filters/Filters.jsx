import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './Filters.css';

const Filters = ({
    destination, setDestination,
    travelDate, setTravelDate,
    passengers, setPassengers,
    hotelStandard, setHotelStandard,
    addLunch, setAddLunch,
    addDinner, setAddDinner
}) => {
    return (
        <div className="filters-section">
            <div className="search-row">
                <div className="input-group">
                    <label>Destination</label>
                    <input
                        type="text"
                        placeholder="City"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="text-input"
                    />
                </div>

                <div className="input-group">
                    <label>Trip start date</label>
                    <div className="date-input-wrapper">
                        <DatePicker
                            selected={travelDate}
                            onChange={(date) => setTravelDate(date)}
                            minDate={new Date()}
                            dateFormat="EEE, MMM d"
                            className="text-input date-input"
                            wrapperClassName="date-picker-wrapper"
                        />
                        <svg className="icon calendar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    </div>
                </div>

                <div className="input-group">
                    <label>No.of Passengers</label>
                    <div className="passenger-input-wrapper">
                        <input
                            type="text"
                            value={passengers}
                            onChange={(e) => setPassengers(e.target.value)}
                            className="text-input passenger-input"
                        />
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
                        {[3, 4, 5].map((star) => (
                            <button
                                key={star}
                                className={`star-btn ${hotelStandard === star ? 'active' : ''}`}
                                onClick={() => setHotelStandard(star)}
                            >
                                {star} <svg className="icon star" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="option-group checkbox-group">
                    <label className="checkbox-label">
                        Add Lunch
                        <input
                            type="checkbox"
                            checked={addLunch}
                            onChange={(e) => setAddLunch(e.target.checked)}
                        />
                        <span className="checkmark"></span>
                    </label>
                    <label className="checkbox-label">
                        Add Dinner
                        <input
                            type="checkbox"
                            checked={addDinner}
                            onChange={(e) => setAddDinner(e.target.checked)}
                        />
                        <span className="checkmark"></span>
                    </label>
                    <svg className="icon info" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                </div>
            </div>
        </div>
    );
};

export default Filters;
