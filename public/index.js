import {API_Service} from "./scripts/api_service.js";
import {activateGetWeatherButton, checkSubmitButton} from "./scripts/input.handler.js";
import {handleSubmit} from "./scripts/submit.handler.js";


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
}

document.addEventListener('DOMContentLoaded', displayAppName);
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        const tabNumber = tab.getAttribute('data-tab');
        showTab(tabNumber);

        checkSubmitButton(tabNumber);
    });
});

formInput.addEventListener('input', activateGetWeatherButton, checkSubmitButton);
formInput.addEventListener('submit', handleSubmit);
