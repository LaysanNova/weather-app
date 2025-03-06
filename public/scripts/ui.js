import { WEATHER_CODE } from "./weather.code.js";
import { API_Service } from "./api_service.js";
import {cities} from "./cities.data.js";

const appName = document.getElementById('appName');
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('searchBtn');
const card = document.querySelector(".card");
const table = document.querySelector(".table tbody");
const tabs = document.querySelectorAll('.tab');

class UI {
    static async displayAppName() {
        appName.innerText = await API_Service.getAppName();
    }

    static showTab(tabNumber) {
        const tabs = document.querySelectorAll('.tab');
        const inputs = document.querySelectorAll('.inputs');

        tabs.forEach(tab => tab.classList.remove('active'));
        inputs.forEach(input => input.classList.remove('active'));

        tabs[tabNumber - 1].classList.add('active');
        inputs[tabNumber - 1].classList.add('active');
    }

    static activateSearchButton() {
        const isCityValid = cityInput.value.trim().length > 0;
        searchBtn.disabled = !isCityValid;
    }

    static displayError(message) {
        const errorDisplay = document.createElement("p");
        errorDisplay.textContent = message;
        errorDisplay.classList.add('errorDisplay');

        card.textContent = "";
        card.style.display = "flex";
        card.appendChild(errorDisplay);
    }

    static findCity(cityName) {
        const city = cities[cityName.toLowerCase()];
        let lat = NaN;
        let lon = NaN;

        if (city) {
            lat = city["latitude"];
            lon = city["longitude"];

            return {"latitude": lat, "longitude": lon};
        }

        return false;
    }

    static async handleSubmit(event) {
        event.preventDefault();
        const city = UI.findCity(cityInput.value);
        if (city) {
            try {
                const weatherData = await API_Service.getWeatherData(city);
                UI.displayWeatherInfo(weatherData);
            } catch (error) {
                console.error(error);
                UI.displayError(error);
            }
        } else if (!city) {
            UI.displayError("City is not found. Try enter location.");
        } else {
            UI.displayError("Please enter city");
        }
    }

    static displayWeatherInfo(data) {
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

        while (table.firstChild) {
            table.removeChild(table.firstChild);
        }

        for (let i = 0; i < dates.length; i++) {
            const row = document.createElement('tr');

            [dates[i], weatherCode[i], minTemps[i], maxTemps[i]].forEach((cellData, index) => {
                const cell = document.createElement('td');
                if (index === 1) {
                    const weatherImg = document.createElement('img');
                    weatherImg.src = WEATHER_CODE[cellData].day.image;
                    weatherImg.alt = WEATHER_CODE[cellData].day.description;
                    weatherImg.classList.add('image');
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

    static displayTab() {
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabNumber = tab.getAttribute('data-tab');
                UI.showTab(tabNumber);
            });
        });
    }
}

export { UI };