import {API_Service} from "./scripts/api_service.js";
import {handleSubmit} from "./scripts/submit.handler.js";
import {checkSubmitButton, handleCityInput, handleLatLongInput} from "./scripts/input.handler.js";


const appName = document.getElementById('appName');
const formInput = document.querySelector('.form-input');

async function displayAppName() {
    appName.innerText = await API_Service.getAppName();
}

function showTab(tabNumber) {
    const tabs = document.querySelectorAll('.tab');
    const inputs = document.querySelectorAll('.inputs');

    tabs.forEach(tab => tab.classList.remove('active'));
    inputs.forEach(input => input.classList.remove('active'));

    tabs[tabNumber - 1].classList.add('active');
    inputs[tabNumber - 1].classList.add('active');
    checkSubmitButton(tabNumber);
}

document.addEventListener('DOMContentLoaded', () => {
    displayAppName().then(r => checkSubmitButton("1"));
    handleCityInput()
    handleLatLongInput();
});

document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        const tabNumber = tab.getAttribute('data-tab');
        showTab(tabNumber);
    });
});

formInput.addEventListener('submit', handleSubmit);
