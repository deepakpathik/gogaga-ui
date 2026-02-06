import axios from 'axios';

const CSC_API_KEY = import.meta.env.VITE_CSC_API_KEY;

const cityClient = axios.create({
    baseURL: import.meta.env.VITE_CSC_API_URL,
    headers: {
        'X-CSCAPI-KEY': CSC_API_KEY
    }
});

const teleportClient = axios.create({
    baseURL: import.meta.env.VITE_TELEPORT_API_URL
});

const AIRPORTS = [
    { name: "Indira Gandhi International Airport", iata: "DEL", city: "New Delhi", country: "India", lat: 28.5562, lon: 77.1000 },
    { name: "Chhatrapati Shivaji Maharaj International Airport", iata: "BOM", city: "Mumbai", country: "India", lat: 19.0896, lon: 72.8656 },
    { name: "Kempegowda International Airport", iata: "BLR", city: "Bengaluru", country: "India", lat: 13.1986, lon: 77.7066 },
    { name: "Chennai International Airport", iata: "MAA", city: "Chennai", country: "India", lat: 12.9941, lon: 80.1709 },
    { name: "Netaji Subhash Chandra Bose International Airport", iata: "CCU", city: "Kolkata", country: "India", lat: 22.6546, lon: 88.4467 },
    { name: "Rajiv Gandhi International Airport", iata: "HYD", city: "Hyderabad", country: "India", lat: 17.2403, lon: 78.4294 },
    { name: "Cochin International Airport", iata: "COK", city: "Kochi", country: "India", lat: 10.1518, lon: 76.3930 },
    { name: "Sardar Vallabhbhai Patel International Airport", iata: "AMD", city: "Ahmedabad", country: "India", lat: 23.0732, lon: 72.6347 },
    { name: "Pune Airport", iata: "PNQ", city: "Pune", country: "India", lat: 18.5823, lon: 73.9197 },
    { name: "Dabolim Airport", iata: "GOI", city: "Goa", country: "India", lat: 15.3800, lon: 73.8314 },
    { name: "Trivandrum International Airport", iata: "TRV", city: "Thiruvananthapuram", country: "India", lat: 8.4821, lon: 76.9182 },
    { name: "Dubais International Airport", iata: "DXB", city: "Dubai", country: "UAE", lat: 25.2532, lon: 55.3657 },
    { name: "Singapore Changi Airport", iata: "SIN", city: "Singapore", country: "Singapore", lat: 1.3644, lon: 103.9915 },
    { name: "Heathrow Airport", iata: "LHR", city: "London", country: "UK", lat: 51.4700, lon: -0.4543 },
    { name: "John F. Kennedy International Airport", iata: "JFK", city: "New York", country: "USA", lat: 40.6413, lon: -73.7781 },
    { name: "Suvarnabhumi Airport", iata: "BKK", city: "Bangkok", country: "Thailand", lat: 13.6900, lon: 100.7501 },
    { name: "Narita International Airport", iata: "NRT", city: "Tokyo", country: "Japan", lat: 35.7720, lon: 140.3929 },
    { name: "Charles de Gaulle Airport", iata: "CDG", city: "Paris", country: "France", lat: 49.0097, lon: 2.5479 },
    { name: "Frankfurt Airport", iata: "FRA", city: "Frankfurt", country: "Germany", lat: 50.0379, lon: 8.5622 },
    { name: "Hong Kong International Airport", iata: "HKG", city: "Hong Kong", country: "Hong Kong", lat: 22.3080, lon: 113.9185 }
];

const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
};

export const searchCities = async (query) => {
    if (!query) return [];

    try {
        const response = await cityClient.get(`/countries/IN/cities`);

        const cities = response.data;
        const filtered = cities.filter(city =>
            city.name.toLowerCase().startsWith(query.toLowerCase()) ||
            city.name.toLowerCase().includes(query.toLowerCase())
        );

        return filtered.slice(0, 10).map(city => ({
            label: `${city.name}, India`,
            value: city.name,
            type: 'city'
        }));
    } catch (error) {
        console.error("City search failed:", error);
        return [];
    }
};

export const searchAirports = async (query, region) => {
    if (!query) return [];

    return new Promise((resolve) => {
        const lowerQuery = query.toLowerCase();
        let filtered = AIRPORTS;

        if (region === 'indian') {
            filtered = filtered.filter(a => a.country === 'India');
        } else if (region === 'international') {
            filtered = filtered.filter(a => a.country !== 'India');
        }

        filtered = filtered.filter(airport =>
            airport.name.toLowerCase().includes(lowerQuery) ||
            airport.city.toLowerCase().includes(lowerQuery) ||
            airport.iata.toLowerCase().includes(lowerQuery)
        );

        const results = filtered.map(airport => ({
            label: `${airport.city} (${airport.iata})`,
            value: airport.iata,
            name: airport.name,
            city: airport.city,
            country: airport.country,
            type: 'airport'
        }));

        resolve(results);
    });
};



export const searchAirportsByCity = async (query, region) => {
    if (!query || query.length < 2) return [];

    try {
        const searchResponse = await teleportClient.get('/cities/', {
            params: { search: query },
            timeout: 1000
        });

        const searchResults = searchResponse.data._embedded['city:search-results'];

        if (!searchResults || searchResults.length === 0) {
            return [];
        }

        const topMatchUrl = searchResults[0]._links['city:item'].href;

        const cityDetailsResponse = await axios.get(topMatchUrl);
        const location = cityDetailsResponse.data.location.latlon;
        const cityName = cityDetailsResponse.data.name;
        const country = cityDetailsResponse.data._links['city:country']?.name || 'Unknown Country';

        const nearbyAirports = AIRPORTS
            .filter(airport => {
                if (region === 'indian') return airport.country === 'India';
                if (region === 'international') return airport.country !== 'India';
                return true;
            })
            .map(airport => {
                return {
                    ...airport,
                    distance: getDistanceFromLatLonInKm(location.latitude, location.longitude, airport.lat, airport.lon)
                };
            })
            .filter(airport => airport.distance < 300)
            .sort((a, b) => a.distance - b.distance)
            .slice(0, 5);

        return nearbyAirports.map(airport => ({
            label: `${airport.name} (${airport.iata})`,
            subLabel: `${airport.city}, ${airport.country}`,
            value: airport.iata,
            iata: airport.iata,
            name: airport.name,
            city: airport.city,
            country: airport.country,
            type: 'airport_suggestion',
            distance: Math.round(airport.distance)
        }));

    } catch (error) {
        console.warn("Teleport API unreachable, using local data.");
        return searchAirports(query, region);
    }
};


export const getRealTimeFlights = async ({ origin, destination }) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const airlines = [
                { name: 'IndiGo', code: '6E' },
                { name: 'Air India', code: 'AI' },
                { name: 'Vistara', code: 'UK' },
                { name: 'SpiceJet', code: 'SG' },
                { name: 'Air India Express', code: 'IX' },
                { name: 'Star Air', code: 'S5' }
            ];

            const generateFlight = (id, airline, depHour, basePrice) => {
                const depMin = Math.floor(Math.random() * 60);
                const durationHours = 2 + Math.floor(Math.random() * 3);
                const durationMins = Math.floor(Math.random() * 60);

                const depTime = `${depHour.toString().padStart(2, '0')}:${depMin.toString().padStart(2, '0')}`;

                let arrHour = (depHour + durationHours) % 24;
                let arrMin = (depMin + durationMins) % 60;
                if (depMin + durationMins >= 60) arrHour = (arrHour + 1) % 24;

                const arrTime = `${arrHour.toString().padStart(2, '0')}:${arrMin.toString().padStart(2, '0')}`;

                return {
                    id: id,
                    airline: airline.name,
                    flightNo: `${airline.code} ${100 + Math.floor(Math.random() * 900)}`,
                    depTime,
                    arrTime,
                    duration: `${durationHours}h ${durationMins}m`,
                    stops: 'Non stop',
                    fares: [
                        { price: basePrice.toLocaleString('en-IN', { minimumFractionDigits: 2 }), type: "Saver" },
                        { price: (basePrice + 1500).toLocaleString('en-IN', { minimumFractionDigits: 2 }), type: "Flexi" },
                        { price: (basePrice + 4500).toLocaleString('en-IN', { minimumFractionDigits: 2 }), type: "Business" }
                    ]
                };
            };

            const generateFlights = (count, prefix) => {
                const flights = [];
                for (let i = 0; i < count; i++) {
                    const airline = airlines[Math.floor(Math.random() * airlines.length)];
                    const depHour = 5 + Math.floor(Math.random() * 16);
                    const basePrice = 3500 + Math.floor(Math.random() * 5000);
                    flights.push(generateFlight(`${prefix}_${i}`, airline, depHour, basePrice));
                }
                return flights.sort((a, b) => parseInt(a.depTime) - parseInt(b.depTime));
            };

            resolve({
                outbound: generateFlights(5 + Math.floor(Math.random() * 3), 'out'),
                return: generateFlights(5 + Math.floor(Math.random() * 3), 'ret')
            });
        }, 200);
    });
};

export const getAirportByCity = (cityName) => {
    if (!cityName) return null;
    let lowerCity = cityName.toLowerCase().trim();

    if (lowerCity.includes(',')) {
        lowerCity = lowerCity.split(',')[0].trim();
    }

    const aliases = {
        'bangalore': 'bengaluru',
        'bombay': 'mumbai',
        'calcutta': 'kolkata',
        'madras': 'chennai',
        'cochin': 'kochi',
        'trivandrum': 'thiruvananthapuram',
        'banaras': 'varanasi',
        'gurgaon': 'gurugram'
    };

    if (aliases[lowerCity]) {
        lowerCity = aliases[lowerCity];
    }

    const airport = AIRPORTS.find(a => a.city.toLowerCase() === lowerCity);

    if (airport) {
        return `${airport.city} (${airport.iata})`;
    }
    return null;
};
