import FlightCard from '../FlightCard/FlightCard';
import './FlightSection.css';

const FlightSection = ({ title, flights, selectedFlightId, selectedFareIndex, onSelectFlight }) => {
    return (
        <div className="flight-section">
            <div className="section-header">
                <span className="route-title">{title}</span>
                <div className="header-cols">
                    <span>Departure</span>
                    <span>Duration</span>
                    <span>Arrival</span>
                </div>
            </div>

            <div className="flight-list scrollable">
                {flights.map(flight => (
                    <FlightCard
                        key={flight.id}
                        {...flight}
                        selected={selectedFlightId === flight.id}
                        selectedFareIndex={selectedFlightId === flight.id ? selectedFareIndex : 0}
                        onSelect={(fareIndex) => onSelectFlight(flight, fareIndex)}
                    />
                ))}
            </div>
        </div>
    );
};

export default FlightSection;
