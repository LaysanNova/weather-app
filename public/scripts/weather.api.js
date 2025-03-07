async function getWeatherData(data) {

    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${data.latitude}&longitude=${data.latitude}&daily=temperature_2m_max,temperature_2m_min,weather_code`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error('Could not fetch weather data!');
    }

    return await response.json();
}

export default getWeatherData;
