// Your code here
document.addEventListener('DOMContentLoaded', () => {
    const weatherApp = document.getElementById('weather-app');
    const weatherSection = document.getElementById('weather');
    const weatherForm = weatherApp.querySelector('form');
    const weatherSearchInput = document.getElementById('weather-search');

    const API_KEY = '3bf2d8719d95c3ffdd507ee90305830f';

    weatherForm.addEventListener('submit', async (event) => {
        event.preventDefault(); 

        weatherSection.innerHTML = ''; // Clear previous weather data
        const userQuery = weatherSearchInput.value.trim();
        weatherSearchInput.value = ''; // Reset input field

        if (!userQuery) {
            return; // no action for blank call
        }

        const weatherURL = "https://api.openweathermap.org/data/2.5/weather";
        const queryString = `?units=imperial&appid=${API_KEY}&q=${encodeURIComponent(userQuery)}`;
        const fetchURL = weatherURL + queryString;

        try {
            const response = await fetch(fetchURL);
            const data = await response.json();

            if (response.ok) {
                const {
                    name,
                    sys,
                    main,
                    weather,
                    dt,
                    coord
                } = data;

                const cityCountry = `${name}, ${sys.country}`;

                const mapLink = `https://maps.google.com/?q=${coord.lat},${coord.lon}`;


                const iconCode = weather[0].icon;
                const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
                const description = weather[0].description;

                weatherSection.innerHTML = `
                    <h2>${cityCountry}</h2>
                    <a href="${mapLink}" target="_blank">Click to view map</a>
                    <img src="${iconUrl}" alt="${description}">
                    <p style="text-transform: capitalize;">${description}</p><br>
                    <p>Current: ${currentTemp}° F</p>
                    <p>Feels like: ${feelsLikeTemp}° F</p><br>
                    <p>Last updated: ${timeString}</p>
                `;
            } else {
                
                weatherSection.innerHTML = '<h2>Location not found</h2>';
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
            weatherSection.innerHTML = '<h2>Error fetching weather data. Please try again later.</h2>';
        }
    });
});