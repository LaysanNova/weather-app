import fetch from 'node-fetch';

export const getForecast = async (req, res) => {
    console.info(`GET request endpoint '/users' received.`);

    try {
        // const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41');
        const response = await fetch( 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=temperature_2m_max,temperature_2m_min')

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        res.send(data);
        console.log(data)

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        res.status(500).send('Error fetching users data');
    }
}
