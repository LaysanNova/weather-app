import { UI } from "./scripts/ui.js";









document.addEventListener('DOMContentLoaded', UI.displayAppName);
UI.displayTab();

const formInput = document.querySelector('.form-input');
formInput.addEventListener('input', UI.activateSearchButton);
formInput.addEventListener('submit', UI.handleSubmit);