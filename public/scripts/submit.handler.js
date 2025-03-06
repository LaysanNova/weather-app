import {getCityName, getCoordinates} from "./input.handler.js";
import {WEATHER_CODE} from "../data/weather.code.js";
import getWeatherData from "./weather.api.js";


const card = document.querySelector(".card");

export async function handleSubmit(event) {
    event.preventDefault();

    const coordinates = getCoordinates(getCityName());
    if (coordinates) {
        try {
            const weatherData = await getWeatherData(coordinates);
            displayWeatherInfo(weatherData);
        } catch (error) {
            console.error(error);
            displayError(error);
        }
    } else if (!coordinates) {
        displayError("City is not found. Try enter coordinates.");
    } else {
        displayError("Please enter city");
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
    cityDisplay.textContent = getCityName();
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

    card.textContent = "";
    card.style.display = "flex";
    addTableToCard();
    const table = document.querySelector(".table tbody");

    for (let i = 0; i < dates.length; i++) {
        const row = document.createElement('tr');

        [dates[i], weatherCode[i], minTemps[i], maxTemps[i]].forEach((cellData, index) => {
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