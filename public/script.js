const appName = document.getElementById('appName');
const formInput = document.querySelector('.form-input');

const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('city-input');
const card = document.querySelector(".card");

let firstCol = document.querySelectorAll('tr th:first-child, tr td:first-child')
for (let i = 0; i < firstCol.length; i++) {
    firstCol[i].style.textAlign = 'left'
}


async function getWeatherData(city) {
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=temperature_2m_max,temperature_2m_min,weather_code`
    const response = await fetch(apiUrl);

    if(!response.ok) {
        throw new Error('Could not fetch weather data!');
    }

    return await response.json();
}


function displayWeatherInfo(data){

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
    card.style.display = 'flex';

    dates.forEach((day, index) => {
        const minDisplay = `${minTemps[index]}℃`;
        const maxDisplay= `${maxTemps[index]}℃`;
        const weatherEmoji = getWeatherEmoji(weatherCode[index])


        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${day}</td>
            <td>${minDisplay}</td>
            <td>${maxDisplay}</td>  
            <td>${weatherEmoji}</td>          
        `
        card.appendChild(row)
    });
}

function getWeatherEmoji(weatherId){

    switch (true){
        case weatherId >= 200 && weatherId < 300:
            return "⛈️";
        case weatherId >= 300 && weatherId < 400:
            return "🌦️";
        case weatherId >= 500 && weatherId < 600:
            return "🌧️";
        case weatherId >= 600 && weatherId < 700:
            return "🌨️";
        case weatherId >= 700 && weatherId < 800:
            return "🌫️";
        case weatherId === 800:
            return "🌞";
        default:
        return "";
    }
}

function displayError(massage) {
    const errorDisplay = document.createElement("p")
    errorDisplay.textContent = massage;
    errorDisplay.classList.add('errorDisplay');

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}

class UI {
    static async displayAppName() {
        appName.innerText = await API_Service.getAppName();
    }

    static activateSearchButton() {
        const isCityValid = cityInput.value.trim().length > 0;
        searchBtn.disabled = !isCityValid;
    }

    static displayDays() {
        // const days = Utils.convertDataFormat(dataAPI["daily"]);
        //
        // days.forEach(day => {
        //     console.log(day);
        //     UI.addDayToList(day);
        // });
    }

    static addDayToList(day) {
        // const row = document.createElement('tr');
        //
        // row.innerHTML = `
        //     <td>${day.day}</td>
        //     <td>${day.date}</td>
        //     <td>${day.min_temp}</td>
        //     <td>${day.max_temp}</td>
        // `
        // dayList.appendChild(row)
    }
}

class API_Service {
    static getAppName() {
        return fetch("http://localhost:5000/api/")
            .then(response => {
                if (response.status !== 200) {
                    console.error("[ERROR] Response status: ", response.status);
                    throw new Error('[ERROR] Failed to fetch app name. Unexpected response status.')
                }

                return response.text();
            })
            .catch(error => {
                console.error('[ERROR] Fetch error:', error);
                throw error;
            })
    }

}

document.addEventListener('DOMContentLoaded', UI.displayAppName);
formInput.addEventListener('input', UI.activateSearchButton);
formInput.addEventListener('submit', async event => {
    event.preventDefault();
    const city = cityInput.value;
    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        } catch (error) {
            console.error(error);
            displayError(error);
        }
    } else {
        displayError("Please enter city");
    }
});