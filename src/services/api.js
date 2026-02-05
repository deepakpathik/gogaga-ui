import axios from 'axios';

const aviationClient = axios.create({
    baseURL: import.meta.env.VITE_AVIATION_API_URL,
    params: {
        access_key: import.meta.env.VITE_AVIATION_STACK_KEY
    }
});

const TELEPORT_API_URL = 'https://api.teleport.org/api/cities/';

export const searchCities = async (query) => {
    if (!query) return [];
    try {
        const response = await axios.get(TELEPORT_API_URL, {
            params: { search: query }
        });
        return response.data._embedded['city:search-results'].map(result => result.matching_full_name);
    } catch (error) {
        console.error("Error fetching cities:", error);
        return [];
    }
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
