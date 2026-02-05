import { useState } from 'react';
import Tabs from '../components/Tabs/Tabs';
import Filters from '../components/Filters/Filters';
import FlightSection from '../components/FlightSection/FlightSection';

import SearchSummary from '../components/SearchSummary/SearchSummary';



const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('indian');
    const [destination, setDestination] = useState('');
    const [origin, setOrigin] = useState('Hyderabad, India (HYD)'); // Default origin
    const [travelDate, setTravelDate] = useState(new Date());
    const [returnDate, setReturnDate] = useState(new Date(new Date().setDate(new Date().getDate() + 5))); // Default return +5 days
    const [passengers, setPassengers] = useState('');
    const [hotelStandard, setHotelStandard] = useState(5);
    const [addLunch, setAddLunch] = useState(true);
    const [addDinner, setAddDinner] = useState(false);

    const [outboundData, setOutboundData] = useState(null);
    const [returnData, setReturnData] = useState(null);
    const [loading, setLoading] = useState(false);

    const [selectedOutbound, setSelectedOutbound] = useState(null);
    const [selectedReturn, setSelectedReturn] = useState(null);
    const [selectedOutboundFareIndex, setSelectedOutboundFareIndex] = useState(0);
    const [selectedReturnFareIndex, setSelectedReturnFareIndex] = useState(0);

    const handleSearch = async () => {
        if (!destination) {
            alert("Please select a destination");
            return;
        }
        setLoading(true);
        // Reset selections
        setSelectedOutbound(null);
        setSelectedReturn(null);

        try {
            const { getRealTimeFlights } = await import('../services/api');
            const data = await getRealTimeFlights({ origin, destination });

            if (data) {
                setOutboundData(data.outbound);
                setReturnData(data.return);
            }
        } catch (error) {
            console.error("Search failed", error);
        } finally {
            setLoading(false);
        }
    };

    const calculateTotal = () => {
        if (!selectedOutbound || !selectedReturn) return "0.00";
        const p1 = parseFloat(selectedOutbound.fares[selectedOutboundFareIndex].price.replace(/,/g, ''));
        const p2 = parseFloat(selectedReturn.fares[selectedReturnFareIndex].price.replace(/,/g, ''));
        return (p1 + p2).toLocaleString('en-IN', { minimumFractionDigits: 2 });
    };

    const handleOutboundSelect = (flight, fareIndex = 0) => {
        setSelectedOutbound(flight);
        setSelectedOutboundFareIndex(fareIndex);
    }

    const handleReturnSelect = (flight, fareIndex = 0) => {
        setSelectedReturn(flight);
        setSelectedReturnFareIndex(fareIndex);
    }

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
                <Filters
                    region={activeTab}
                    origin={origin}
                    setOrigin={setOrigin}
                    destination={destination}
                    setDestination={setDestination}
                    travelDate={travelDate}
                    setTravelDate={setTravelDate}
                    returnDate={returnDate}
                    setReturnDate={setReturnDate}
                    passengers={passengers}
                    setPassengers={setPassengers}
                    hotelStandard={hotelStandard}
                    setHotelStandard={setHotelStandard}
                    addLunch={addLunch}
                    setAddLunch={setAddLunch}
                    addDinner={addDinner}
                    setAddDinner={setAddDinner}
                    onSearch={handleSearch}
                />


                <div className="flight-results-area">
                    <SearchSummary
                        origin={origin || "Select Origin"}
                        destination={destination || "Select Destination"}
                        departDate={travelDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                        returnDate={returnDate ? returnDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }) : '-'}
                    />

                    {selectedOutbound && selectedReturn ? (
                        <div className="blue-banner">
                            <div className="banner-col">
                                <span className="banner-label">Departure • {selectedOutbound.airline}</span>
                                <span className="banner-value">{selectedOutbound.depTime} &rarr; {selectedOutbound.arrTime}</span>
                            </div>
                            <div className="banner-divider">
                                <div className="price-tag">₹{selectedOutbound.fares[selectedOutboundFareIndex].price}</div>
                            </div>
                            <div className="banner-col">
                                <span className="banner-label">Return • {selectedReturn.airline}</span>
                                <span className="banner-value">{selectedReturn.depTime} &rarr; {selectedReturn.arrTime}</span>
                            </div>
                            <div className="banner-divider">
                                <div className="price-tag">₹{selectedReturn.fares[selectedReturnFareIndex].price}</div>
                            </div>
                            <div className="banner-col price">
                                <div className="total-label">for {passengers || 'passengers'}</div>
                                <span className="total-fare">Total Round fare <strong>₹{calculateTotal()}</strong></span>
                            </div>
                        </div>
                    ) : (
                        <div className="blue-banner" style={{ justifyContent: 'center', height: 'auto', padding: '1rem' }}>
                            <span className="banner-value" style={{ fontSize: '1rem' }}>Select an outbound and return flight to view summary</span>
                        </div>
                    )}

                    <div className="flights-grid">
                        {loading && <div style={{ textAlign: 'center', gridColumn: '1/-1', padding: '2rem' }}>Loading flights...</div>}

                        {!loading && outboundData && outboundData.length === 0 && (
                            <div style={{ textAlign: 'center', gridColumn: '1/-1', padding: '2rem', color: 'var(--text-secondary)' }}>
                                No flights found for this route. Try a different date or destination.
                            </div>
                        )}

                        {!loading && outboundData && outboundData.length > 0 && (
                            <FlightSection
                                title={`Outbound: Hyderabad(HYD) -> ${destination.split(',')[0]}`}
                                flights={outboundData}
                                selectedFlightId={selectedOutbound?.id}
                                selectedFareIndex={selectedOutboundFareIndex}
                                onSelectFlight={handleOutboundSelect}
                            />
                        )}

                        {!loading && returnData && returnData.length > 0 && (
                            <FlightSection
                                title={`Return: ${destination.split(',')[0]} -> Hyderabad(HYD)`}
                                flights={returnData}
                                selectedFlightId={selectedReturn?.id}
                                selectedFareIndex={selectedReturnFareIndex}
                                onSelectFlight={handleReturnSelect}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
