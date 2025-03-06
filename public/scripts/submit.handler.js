import {getCityName, getCoordinates, getPositionDesc, isCityTab} from "./input.handler.js";
import {WEATHER_CODE} from "../data/weather.code.js";
import getWeatherData from "./weather.api.js";


const card = document.querySelector(".card");

export async function handleSubmit(event, activeTabNumber) {
    event.preventDefault();
    const coordinates = getCoordinates();
    if (coordinates) {
        try {
            const weatherData = await getWeatherData(coordinates);
            displayWeatherInfo(weatherData);
        } catch (error) {
            console.error(error);
            displayError(error);
        }
    } else if (isCityTab()) {
        displayError("City is not found. Try enter coordinates.");
    } else {
        displayError("Please enter valid coordinates.");
    }
}

function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add('errorDisplay');

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}

function addTableToCard() {
    const cityDisplay = document.createElement("p");

    if (isCityTab()) {
        cityDisplay.textContent = getCityName();
    } else {
        cityDisplay.textContent = getPositionDesc();
    }

    card.appendChild(cityDisplay);

    const table = document.createElement("table");
    table.className = "table";
    const tbody = document.createElement("tbody");
    table.appendChild(tbody);
    card.appendChild(table);
    card.style.display = "block";
}

function displayWeatherInfo(data) {
    const {
        latitude,
        longitude,
        timezone,
        daily: {
            time: dates,
            temperature_2m_max: maxTemps,
            temperature_2m_min: minTemps,
            weather_code: weatherCode,
        }
    } = data;

    const today = new Date().toISOString().split('T')[0]; // Get today's date in 'YYYY-MM-DD' format

    const weekdays = dates.map(dateString => {
        const date = new Date(dateString);
        const formattedDate = date.toISOString().split('T')[0];

        if (formattedDate === today) {
            return "TODAY";
        } else {
            return date.toLocaleDateString('en-US', {weekday: 'long', timeZone: 'UTC' });
        }
    });

    card.textContent = "";
    card.style.display = "flex";
    addTableToCard();
    const table = document.querySelector(".table tbody");

    for (let i = 0; i < dates.length; i++) {
        const row = document.createElement('tr');

        [weekdays[i], weatherCode[i], minTemps[i], maxTemps[i]].forEach((cellData, index) => {
            const cell = document.createElement('td');
            if (index === 1) {
                const weatherImg = document.createElement('img');

                try {
                    weatherImg.src = WEATHER_CODE[cellData].day.image;
                    weatherImg.alt = WEATHER_CODE[cellData].day.description;
                    weatherImg.classList.add('image');
                } catch (error) {
                    weatherImg.alt = 'weather image';
                    weatherImg.classList.add('image');
                    console.error(error.message);
                }
                cell.appendChild(weatherImg);

            } else if (index !== 0) {
                cell.textContent = `${cellData}℃` || '';
            } else {
                cell.textContent = cellData || '';
            }
            row.appendChild(cell);
        });

        table.appendChild(row);
    }

    card.classList.add('container');
    card.style.display = "flex";
}