
// Laking a map and tiles
const map = L.map('iss-map').setView([0, 0], 3);
const attribution = '&copy; <a href="https://www.openstreetmap.org/coopyright">OpenStreetMap</a> contributors';

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(map);
const api_url = 'https://api.wheretheiss.at/v1/satellites/25544';

// Making a marker with a custom icon
const myIcon = L.icon({
    iconUrl: 'Images/International_Space_Station.svg.png',
    iconSize: [100, 50],
    iconAnchor: [25, 16],
    popupAnchor: [-3, -76],
});
const marker = L.marker([0, 0], {icon: myIcon}).addTo(map);

// get the data from the API
async function getISS() {
    const response = await fetch(api_url);
    const data = await response.json();
    const { latitude, longitude, altitude, velocity, timestamp } = data; // destructuring: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
    
    
    marker.setLatLng([latitude, longitude]);
    map.setView([latitude, longitude], 4);
    document.querySelector('#lat').textContent = `${latitude}°`;
    document.querySelector('#lon').textContent = `${longitude}°`;
    document.querySelector('#altitude').textContent = `${altitude.toFixed(1)} Km`; // toFixed()-method eliminates the number of decimals. 
    document.querySelector('#velo').textContent = `${velocity.toFixed(2)} Km/h`;
    document.querySelector('#date').textContent = timestamp;
    console.log(latitude);
    console.log(longitude);
}
getISS();

// Automatically refreshes the page every second
setInterval(getISS, 1000);
