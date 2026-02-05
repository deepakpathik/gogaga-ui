import axios from 'axios';

const aviationClient = axios.create({
    baseURL: import.meta.env.VITE_AVIATION_API_URL,
    params: {
        access_key: import.meta.env.VITE_AVIATION_STACK_KEY,
        limit: 20 // Reasonable limit
    }
});

export const searchCities = async (query) => {
    if (!query || query.length < 1) return [];

    try {
        // Search airports by city name or airport name
        // Note: Free tier might have limitations on fuzzy search, so we try 'search' param or generic query
        const response = await aviationClient.get('/airports', {
            params: {
                search: query
            }
        });

        if (!response.data || !response.data.data) return [];

        // Map to unique "City, Country (IATA)" strings
        const airports = response.data.data;
        const suggestions = airports
            .filter(airport => airport.iata_code) // Only those with IATA codes
            .map(airport => `${airport.city_name || airport.airport_name}, ${airport.country_name} (${airport.iata_code})`);

        // Deduplicate
        return [...new Set(suggestions)].slice(0, 10);
    } catch (error) {
        console.error("City search failed:", error);
        return [];
    }
};

const mapFlightData = (flightData, idPrefix) => {
    if (!flightData || flightData.length === 0) return [];

    return flightData.map((flight, index) => {
        const depTime = flight.departure.scheduled ? new Date(flight.departure.scheduled).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) : '--:--';
        const arrTime = flight.arrival.scheduled ? new Date(flight.arrival.scheduled).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) : '--:--';

        // Calculate approximate duration
        let duration = '--h --m';
        if (flight.departure.scheduled && flight.arrival.scheduled) {
            const diff = new Date(flight.arrival.scheduled) - new Date(flight.departure.scheduled);
            const hours = Math.floor(diff / 3600000);
            const minutes = Math.floor((diff % 3600000) / 60000);
            duration = `${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m`;
        }

        // Randomize price since API doesn't provide it
        const basePrice = 12000 + Math.floor(Math.random() * 5000);

        return {
            id: `${idPrefix}_${index}`,
            airline: flight.airline.name || 'Unknown Airline',
            flightNo: `${flight.airline.iata || 'XX'} ${flight.flight.number || '000'}`,
            depTime,
            arrTime,
            duration,
            stops: 'Non stop', // Assuming direct from API query
            fares: [
                { price: basePrice.toLocaleString('en-IN', { minimumFractionDigits: 2 }), type: "Saver" },
                { price: (basePrice + 2500).toLocaleString('en-IN', { minimumFractionDigits: 2 }), type: "Flexi" },
                { price: (basePrice + 8000).toLocaleString('en-IN', { minimumFractionDigits: 2 }), type: "Business" }
            ]
        };
    });
};

export const getRealTimeFlights = async ({ origin, destination }) => {
    // Extract IATA code from "City, Country (IATA)" format
    const destMatch = destination.match(/\(([^)]+)\)/);
    const destinationIata = destMatch ? destMatch[1] : null;

    const originMatch = origin ? origin.match(/\(([^)]+)\)/) : null;
    const originIata = originMatch ? originMatch[1] : 'HYD'; // Fallback to HYD if no custom origin

    if (!destinationIata) {
        console.warn("Could not extract IATA code from destination:", destination);
        // Fallback or error? For now return empty
        return { outbound: [], return: [] };
    }

    try {
        const [outboundRes, returnRes] = await Promise.all([
            aviationClient.get('/flights', {
                params: {
                    dep_iata: originIata,
                    arr_iata: destinationIata
                }
            }),
            aviationClient.get('/flights', {
                params: {
                    dep_iata: destinationIata,
                    arr_iata: originIata
                }
            })
        ]);

        return {
            outbound: mapFlightData(outboundRes.data.data, 'out'),
            return: mapFlightData(returnRes.data.data, 'ret')
        };
    } catch (error) {
        console.error("Flight fetch failed:", error);
        return { outbound: [], return: [] };
    }
};

export const getAirports = async (params = {}) => {
    try {
        const response = await aviationClient.get('/airports', { params });
        return response.data;
    } catch (error) {
        console.error("Error fetching airports:", error);
        return null;
    }
};
