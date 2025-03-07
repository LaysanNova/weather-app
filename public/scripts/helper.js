function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function capitalizeWords(string) {
    return string.split(' ').map(word => capitalizeFirstLetter(word)).join(' ');
}

export default capitalizeWords;
