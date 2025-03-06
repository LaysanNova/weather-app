import {cities} from "../data/cities.data.js";


const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('city-input');
const latitude = document.getElementById('lat-input');
const longitude = document.getElementById('long-input');

const handleInputChange = {
    handleCityInput : function () {

        function activateSearchButton() {
            const isCityValid = getCityName().length > 0;
            searchBtn.disabled = !isCityValid;
        }
        cityInput.addEventListener('input', activateSearchButton);
    },

    handleLatLongInput : function () {

        function activateSearchButton() {
            searchBtn.disabled = !(longitude.value && longitude.value);
        }
        latitude.addEventListener('input', activateSearchButton);
        longitude.addEventListener('input', activateSearchButton);
    },

    checkSubmitButton: function (tabNumber) {
        if (tabNumber === "1") {
            const isCityValid = getCityName().length > 0;
            searchBtn.disabled = !isCityValid;

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

export const handleCityInput = handleInputChange.handleCityInput;
export const handleLatLongInput = handleInputChange.handleLatLongInput;
export const getCoordinates = handleInputChange.getCoordinates;
export const getCityName = handleInputChange.getCityName;
export const checkSubmitButton = handleInputChange.checkSubmitButton;
