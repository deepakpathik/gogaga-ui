
import { searchAirports, searchAirportsByCity, getRealTimeFlights, getAirportByCity } from './src/services/api.js';

async function testApi() {
    try {
        console.log("Testing API after cleanup...");
        const airports = await searchAirports('Del', 'indian');
        console.log("Airports count:", airports.length);

        const cities = await searchAirportsByCity('Hyd', 'indian');
        console.log("Cities count (mock/teleport):", cities.length);

        const flights = await getRealTimeFlights({ origin: 'HYD', destination: 'DEL' });
        console.log("Flights outbound count:", flights.outbound.length);

        const airportName = getAirportByCity('Hyderabad');
        console.log("Airport lookup:", airportName);

        console.log("Cleanup verification passed.");
    } catch (e) {
        console.error("Cleanup verification failed:", e);
        process.exit(1);
    }
}

testApi();
