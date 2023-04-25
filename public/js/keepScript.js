function recordKeepStation() {
    const origin = document.getElementById('stationSelect');
    const output = origin.options[origin.selectedIndex].innerText;
    const duplicate = document.getElementById('stationNameHolder')
    duplicate.value = output
}

