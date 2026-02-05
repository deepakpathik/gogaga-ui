import { useState } from 'react';
import Tabs from '../components/Tabs/Tabs';
import Filters from '../components/Filters/Filters';
import FlightSection from '../components/FlightSection/FlightSection';

import SearchSummary from '../components/SearchSummary/SearchSummary';

const outboundFlights = [
    {
        id: 'out_1', airline: 'Air India Express', flightNo: 'IX 2879 TC', depTime: '12:05', arrTime: '13:30', duration: '01h 25m', stops: 'Non stop',
        fares: [{ price: "13,300.00", type: "Publish" }, { price: "13,300.00", type: "Flexi" }, { price: "29,144.00", type: "XpressBiz" }]
    },
    {
        id: 'out_2', airline: 'Air India', flightNo: 'AI 2879 TC', depTime: '11:30', arrTime: '18:55', duration: '04h 30m', stops: '1 Stop(s)',
        fares: [{ price: "13,300.00", type: "SME" }, { price: "105,300.00", type: "Publish" }]
    },
    {
        id: 'out_3', airline: 'Indigo', flightNo: '6E 426 SM', depTime: '20:50', arrTime: '06:20', duration: '09h 30m', stops: '1 Stop(s)',
        fares: [{ price: "13,300.00", type: "SME" }, { price: "13,300.00", type: "Publish" }]
    },
    {
        id: 'out_4', airline: 'Star Air', flightNo: 'S5 212 TQ2', depTime: '09:50', arrTime: '17:55', duration: '08h 05m', stops: '1 Stop(s)',
        fares: [{ price: "13,300.00", type: "Regular" }, { price: "13,300.00", type: "Flexi" }]
    },
    {
        id: 'out_5', airline: 'Star Air', flightNo: 'S5 212 TQ2', depTime: '09:50', arrTime: '17:55', duration: '08h 05m', stops: '1 Stop(s)',
        fares: [{ price: "13,300.00", type: "Regular" }, { price: "13,300.00", type: "Flexi" }]
    }
];

const returnFlights = [
    {
        id: 'ret_1', airline: 'Air India Express', flightNo: 'IX 2879 TC', depTime: '12:05', arrTime: '13:30', duration: '01h 25m', stops: 'Non stop',
        fares: [{ price: "13,300.00", type: "Publish" }, { price: "13,300.00", type: "Flexi" }]
    },
    {
        id: 'ret_2', airline: 'Air India', flightNo: 'AI 2879 TC', depTime: '13:15', arrTime: '06:15', duration: '04h 30m', stops: '2 Stop(s)',
        fares: [{ price: "13,300.00", type: "SME" }, { price: "105,300.00", type: "Publish" }]
    },
    {
        id: 'ret_3', airline: 'Indigo', flightNo: '6E 426 SM', depTime: '20:50', arrTime: '06:20', duration: '09h 30m', stops: '1 Stop(s)',
        fares: [{ price: "13,300.00", type: "SME" }, { price: "13,300.00", type: "Publish" }]
    },
    {
        id: 'ret_4', airline: 'Star Air', flightNo: 'S5 212 TQ2', depTime: '09:50', arrTime: '17:55', duration: '08h 25m', stops: '1 Stop(s)',
        fares: [{ price: "13,300.00", type: "Regular" }, { price: "13,300.00", type: "Flexi" }]
    },
    {
        id: 'ret_5', airline: 'Star Air', flightNo: 'S5 212 TQ2', depTime: '09:50', arrTime: '17:55', duration: '08h 25m', stops: '1 Stop(s)',
        fares: [{ price: "13,300.00", type: "Regular" }, { price: "13,300.00", type: "Flexi" }]
    }
];

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('indian');
    const [selectedOutbound, setSelectedOutbound] = useState(outboundFlights[1]);
    const [selectedReturn, setSelectedReturn] = useState(returnFlights[1]);
    const [selectedOutboundFareIndex, setSelectedOutboundFareIndex] = useState(1);
    const [selectedReturnFareIndex, setSelectedReturnFareIndex] = useState(1);

    const [destination, setDestination] = useState('City');
    const [travelDate, setTravelDate] = useState(new Date());
    const [passengers, setPassengers] = useState('2 Adults, 2 Children');
    const [hotelStandard, setHotelStandard] = useState(5);
    const [addLunch, setAddLunch] = useState(true);
    const [addDinner, setAddDinner] = useState(false);

    const calculateTotal = () => {
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
                    destination={destination}
                    setDestination={setDestination}
                    travelDate={travelDate}
                    setTravelDate={setTravelDate}
                    passengers={passengers}
                    setPassengers={setPassengers}
                    hotelStandard={hotelStandard}
                    setHotelStandard={setHotelStandard}
                    addLunch={addLunch}
                    setAddLunch={setAddLunch}
                    addDinner={addDinner}
                    setAddDinner={setAddDinner}
                />


                <div className="flight-results-area">
                    <SearchSummary />
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
                            <div className="total-label">for 2 adult, 2 children</div>
                            <span className="total-fare">Total Round fare <strong>₹{calculateTotal()}</strong></span>
                        </div>
                    </div>

                    <div className="flights-grid">
                        <FlightSection
                            title="Outbound: Hyderabad(HYD)"
                            flights={outboundFlights}
                            selectedFlightId={selectedOutbound.id}
                            selectedFareIndex={selectedOutboundFareIndex}
                            onSelectFlight={handleOutboundSelect}
                        />
                        <FlightSection
                            title="Outbound: Hyderabad(HYD)"
                            flights={returnFlights}
                            selectedFlightId={selectedReturn.id}
                            selectedFareIndex={selectedReturnFareIndex}
                            onSelectFlight={handleReturnSelect}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
