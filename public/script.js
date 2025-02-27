
const appName = document.getElementById('appName');
const searchBtn = document.getElementById('searchBtn');
const cityName = document.getElementById('cityName');
const dayList = document.getElementById('dayList');

// const dataAPI = {
//     "latitude": 52.52,
//     "longitude": 13.419998,
//     "generationtime_ms": 0.03826618194580078,
//     "utc_offset_seconds": 0,
//     "timezone": "GMT",
//     "timezone_abbreviation": "GMT",
//     "elevation": 38,
//     "daily_units": {
//         "time": "iso8601",
//         "temperature_2m_max": "°C",
//         "temperature_2m_min": "°C"
//     },
//     "daily": {
//         "time": [
//             "2025-02-27",
//             "2025-02-28",
//             "2025-03-01",
//             "2025-03-02",
//             "2025-03-03",
//             "2025-03-04",
//             "2025-03-05"
//         ],
//         "temperature_2m_max": [
//             9,
//             7.4,
//             6.3,
//             4.3,
//             7.2,
//             9.4,
//             11
//         ],
//         "temperature_2m_min": [
//             5.5,
//             3.1,
//             0.4,
//             -1.4,
//             1.1,
//             -0.4,
//             -0.5
//         ]
//     }
// }

const dataAPI = getForecast();

class UI {
    static async displayAppName() {
        appName.innerText = await API_Service.getAppName();
    }

    static activateSearchButton() {
        const isCityValid = cityName.value.trim().length > 0;
        searchBtn.disabled = !isCityValid;
    }

    static displayDays() {
        const days = Utils.convertDataFormat(dataAPI["daily"]);

        days.forEach(day => {
            console.log(day);
            UI.addDayToList(day);
        });
    }

    static addDayToList(day) {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${day.day}</td>
            <td>${day.date}</td>
            <td>${day.min_temp}</td>
            <td>${day.max_temp}</td>
        `
        dayList.appendChild(row)
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

class Utils {
    static convertDataFormat(data) {
        let formattedData = [];
        for (let i = 0; i < data.time.length; i++) {

            let weekDay = new Date(data.time[i]).toLocaleDateString('en-US',{weekday: 'long'});
            let todayString = new Date().toISOString().split('T')[0];

            formattedData.push({
                date: data.time[i],
                day: data.time[i] === todayString ? "Today" : weekDay,
                min_temp: data.temperature_2m_min[i],
                max_temp: data.temperature_2m_max[i],
            });
        }
        return formattedData;
    }
}

document.addEventListener('DOMContentLoaded', UI.displayAppName);
cityName.addEventListener('input', UI.activateSearchButton);
document.addEventListener('DOMContentLoaded', UI.displayDays);


