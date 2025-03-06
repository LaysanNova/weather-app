import {cities} from "../data/cities.data.js";


const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('city-input');
const latitudeInput = document.getElementById('lat-input');
const longitudeInput = document.getElementById('long-input');
const tab1 = document.getElementById('tab1')

const handleInputChange = {

    handleCityInput: function () {
        cityInput.addEventListener('input', () => activateButton([cityInput]));
    },

    handleLatLongInput: function () {
        latitudeInput.addEventListener('input', () => activateButton([latitudeInput, longitudeInput]));
        longitudeInput.addEventListener('input', () => activateButton([latitudeInput, longitudeInput]));
    },

    activateButton : function (inputs) {
        const isValid = inputs.every(input => input.value.trim().length > 0);
        searchBtn.disabled = !isValid;
    },

    checkSubmitButton: function (tabNumber) {
        if (tabNumber === "1") {
            activateButton([cityInput]);
        } else if (tabNumber === "2") {
            activateButton([latitudeInput, longitudeInput]);
        }
    },

    isValidLatLongInput : function () {
        const latitudeValue = parseFloat(latitudeInput.value.trim());
        const longitudeValue = parseFloat(longitudeInput.value.trim());

        return ((!isNaN(latitudeValue) && latitudeValue >= -90 && latitudeValue <= 90) &&
            (!isNaN(longitudeValue) && longitudeValue >= -180 && longitudeValue <= 180))
    },

    isCityTab: function () {
        return tab1.classList.contains('active');
    },

    getCoordinates : function () {
        if (isCityTab()) {
            const city = cities[getCityName().toLowerCase()];
            if (city) {
                return {"latitude": city["latitude"], "longitude": city["longitude"]};
            }
        } else {
            if (isValidLatLongInput()) {
                return {"latitude": latitudeInput.value.trim(), "longitude": longitudeInput.value.trim()};
            }
        }

        return false;
    },

    getCityName : function () {
        return cityInput.value.trim().toLowerCase()
    },

    getPositionDesc : function () {
        const latitudeValue = parseFloat(latitudeInput.value.trim());
        const longitudeValue = parseFloat(longitudeInput.value.trim());

        return `(${latitudeValue}, ${longitudeValue})`;
    },

}

export const handleCityInput = handleInputChange.handleCityInput;
export const handleLatLongInput = handleInputChange.handleLatLongInput;
export const getCoordinates = handleInputChange.getCoordinates;
export const getCityName = handleInputChange.getCityName;
export const getPositionDesc = handleInputChange.getPositionDesc;
export const activateButton = handleInputChange.activateButton;
export const checkSubmitButton = handleInputChange.checkSubmitButton;
export const isValidLatLongInput = handleInputChange.isValidLatLongInput;
export const isCityTab = handleInputChange.isCityTab;