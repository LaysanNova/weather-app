import {cities} from "../data/cities.data.js";


const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('city-input');
const latitude = document.getElementById('lat-input');
const longitude = document.getElementById('long-input');

const handleInputChange = {
    submitAvailability: function () {
            const isCityValid = getCityName().length > 0;
            searchBtn.disabled = !isCityValid;
    },

    checkSubmitButton: function (tabNumber) {
        if (tabNumber === "1") {
            activateGetWeatherButton();
        } else if (tabNumber === "2") {
            searchBtn.disabled = !(longitude.value && longitude.value);
        }
    },

    getCoordinates : function () {
        const city = cities[getCityName().toLowerCase()];
        if (city) {
            return {"latitude": city["latitude"], "longitude": city["longitude"]};
        }

        return false;
    },

    getCityName : function () {
        return cityInput.value.trim().toLowerCase()
    },


}

export const activateGetWeatherButton = handleInputChange.submitAvailability;
export const getCoordinates = handleInputChange.getCoordinates;
export const getCityName = handleInputChange.getCityName;
export const checkSubmitButton = handleInputChange.checkSubmitButton;
