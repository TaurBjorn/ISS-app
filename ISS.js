const api_url = 'https://api.wheretheiss.at/v1/satellites/25544';

async function getISS() {
    const response = await fetch(api_url);
    const data = await response.json();
    const { latitude, longitude } = data; // destructuring: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
    document.querySelector('#lat').textContent = latitude;
    document.querySelector('#lon').textContent = longitude;
    console.log(latitude);
    console.log(longitude);
}

getISS();