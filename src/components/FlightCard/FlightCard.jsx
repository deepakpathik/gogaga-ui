import './FlightCard.css';
import airIndiaLogo from '../../assets/ai_logo.webp';
import airIndiaExpressLogo from '../../assets/aix.png';
import indigoLogo from '../../assets/indigo_logo.webp';
import starAirLogo from '../../assets/sa_logo.jpeg';

const getAirlineLogo = (airlineName) => {
    if (airlineName.includes('Express')) return airIndiaExpressLogo;
    if (airlineName.includes('Air India')) return airIndiaLogo;
    if (airlineName.includes('Indigo')) return indigoLogo;
    if (airlineName.includes('Star')) return starAirLogo;
    return null;
};

const FlightCard = ({ airline, flightNo, depTime, arrTime, duration, stops, fares, selected, selectedFareIndex, onSelect }) => {
    const logo = getAirlineLogo(airline);

    return (
        <div
            className={`flight-card ${selected ? 'selected' : ''}`}
            onClick={() => onSelect(0)}
        >
            <div className="flight-main-row">
                <div className="airline-info">
                    <img src={logo} alt={airline} className="airline-logo-img" />
                    <div className="airline-details">
                        <span className="airline-name">{airline}</span>
                        <span className="flight-no">{flightNo}</span>
                    </div>
                </div>

                <div className="flight-time-group">
                    <span className="time">{depTime}</span>
                    <span className="city">HYD</span>
                </div>

                <div className="flight-duration-group">
                    <span className="duration">{duration}</span>
                    <div className="duration-line">
                        <div className={`stops-dot ${stops === 'Non stop' ? 'green' : 'red'}`}></div>
                    </div>
                    <span className="stops">{stops}</span>
                </div>

                <div className="flight-time-group">
                    <span className="time">{arrTime}</span>
                    <span className="city">{airline.includes('Star') || airline.includes('Indigo') ? 'GOI' : 'GOX'}</span>
                </div>
            </div>

            <div className="flight-badges-row">
                {fares.map((fare, index) => (
                    <div
                        className={`badge-group ${selected && index === selectedFareIndex ? 'active' : ''}`}
                        key={index}
                        onClick={(e) => {
                            e.stopPropagation();
                            onSelect(index);
                        }}
                    >
                        <div className="checkbox-wrapper">
                            <input
                                type="checkbox"
                                checked={selected && index === selectedFareIndex}
                                readOnly
                            />
                        </div>
                        <span className="price">₹ {fare.price}</span>
                        <span className={`tag ${fare.type.toLowerCase().replace(/\s/g, '-')}`}>{fare.type}</span>
                    </div>
                ))}
            </div>

            <div className="flight-footer-row">
                <div className="footer-item">
                    <svg className="icon sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18.6 14.1l-2.2-2.2c-.8-.8-2.1-.8-2.8 0L9.1 16.4l-4.2-4.2c-.8-.8-2.1-.8-2.8 0L.7 13.6c-.4.4-.4 1 0 1.4l5.6 5.6c3.9 3.9 10.2 3.9 14.1 0l3.8-3.8c.4-.4.4-1 0-1.4l-5.6-5.3z"></path></svg>
                    <span>Hand Baggage - 7 Kg</span>
                </div>
                <div className="footer-item">
                    <svg className="icon sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                    <span>Check-in Baggage</span>
                </div>
                <div className="footer-item">
                    <svg className="icon sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    <span>Refundable</span>
                </div>
                <div className="footer-item">
                    <svg className="icon sm" stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                    <span>Rules</span>
                </div>
            </div>
        </div>
    );
};

export default FlightCard;
