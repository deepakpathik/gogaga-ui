import axios from 'axios';

const aviationClient = axios.create({
    baseURL: import.meta.env.VITE_AVIATION_API_URL,
    params: {
        access_key: import.meta.env.VITE_AVIATION_STACK_KEY
    }
});

const MOCK_CITIES = [
    // India
    "Hyderabad, India", "Delhi, India", "Mumbai, India", "Bangalore, India", "Chennai, India", "Kolkata, India",
    "Pune, India", "Jaipur, India", "Goa, India", "Kochi, India", "Ahmedabad, India", "Varanasi, India",
    // International
    "Dubai, UAE", "London, UK", "New York, USA", "Singapore, Singapore", "Bangkok, Thailand", "Paris, France",
    "Tokyo, Japan", "Sydney, Australia", "Bali, Indonesia", "Rome, Italy", "Istanbul, Turkey", "Hong Kong",
    "Kuala Lumpur, Malaysia", "Barcelona, Spain", "Amsterdam, Netherlands"
];

export const searchCities = async (query) => {
    if (!query) return [];
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    return MOCK_CITIES.filter(city =>
        city.toLowerCase().includes(query.toLowerCase())
    );
};

export const getRealTimeFlights = async (params = {}) => {
    try {
        const response = await aviationClient.get('/flights', { params });
        return response.data;
    } catch (error) {
        console.error("Error fetching flights:", error);
        return null;
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
