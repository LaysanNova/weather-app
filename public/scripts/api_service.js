import {cities} from "./cities.data.js";

class API_Service {
    static async getAppName() {
        return fetch("http://localhost:5000/api/")
            .then(response => {
                if (response.status !== 200) {
                    console.error("[ERROR] Response status: ", response.status);
                    throw new Error('[ERROR] Failed to fetch app name. Unexpected response status.');
                }

                return response.text();
            })
            .catch(error => {
                console.error('[ERROR] Fetch error:', error);
                throw error;
            });
    }

    static async getWeatherData(data) {

        const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${data.latitude}&longitude=${data.latitude}&daily=temperature_2m_max,temperature_2m_min,weather_code`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('Could not fetch weather data!');
        }

        return await response.json();
    }
}

export { API_Service };
