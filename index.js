// Your code here
document.addEventListener('DOMContentLoaded', () => {
    const weatherApp = document.getElementById('weather-app');
    const weatherSection = document.getElementById('weather');
    const weatherForm = weatherApp.querySelector('form');
    const weatherSearchInput = document.getElementById('weather-search');

    const API_KEY = '3bf2d8719d95c3ffdd507ee90305830f';

    weatherForm.addEventListener('submit', async (event) => {
        event.preventDefault(); 

        weatherSection.innerHTML = ''; 
        const userQuery = weatherSearchInput.value.trim();
        weatherSearchInput.value = ''; 

        if (!userQuery) {
            return; 
        }

        const weatherURL = "https://api.openweathermap.org/data/2.5/weather";
        const queryString = `?units=imperial&appid=${API_KEY}&q=${(userQuery)}`;
        const fetchURL = weatherURL + queryString;

        try {
            const response = await fetch(fetchURL);
            const data = await response.json();
      
            if (response.ok) {
              displayWeatherData(data);
            } else {
              displayLocationNotFound();
            }
          } catch (error) {
            console.error('Error fetching weather data:', error);
            displayLocationNotFound();
          }
        });
      
        function displayWeatherData(data) {
          const { name, sys, weather, main, dt, coord } = data;
      
          const cityCountry = `${name}, ${sys.country}`;
          const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${coord.lat},${coord.lon}`;
          const weatherIconCode = weather[0].icon;
          const weatherIconURL = `https://openweathermap.org/img/wn/${weatherIconCode}@2x.png`;
          const weatherDescription = weather[0].description;
          const currentTemp = main.temp.toFixed(2);
          const feelsLikeTemp = main.feels_like.toFixed(2);
          const lastUpdatedTimestamp = dt * 1000; 
          const date = new Date(lastUpdatedTimestamp);
          const lastUpdatedTime = date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
          });
      
          weatherSection.innerHTML = `
            <h2>${cityCountry}</h2>
            <a href="${googleMapsLink}" target="_blank">Click to view map</a>
            <img src="${weatherIconURL}" alt="${weatherDescription}">
            <p style="text-transform: capitalize;">${weatherDescription}</p><br>
            <p>Current: ${currentTemp}° F</p>
            <p>Feels like: ${feelsLikeTemp}° F</p><br>
            <p>Last updated: ${lastUpdatedTime}</p>
          `;
        }
      
        function displayLocationNotFound() {
          weatherSection.innerHTML = '<h2>Location not found</h2>';
        }
      });       



      //escape() vs. encodeURIComponent()