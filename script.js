function getWeatherData(location) {
  const apiKey = "79d5db80a6eb86c277c56aaf926b4671";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
  
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found or invalid request");
      }
      return response.json();
    })
    .then(data => {
      const weatherData = {
        temperature: data.main.temp,
        condition: data.weather[0].main,
        location: data.name,
      };
      return weatherData;
    });
}

function updateUI(weatherData) {
  const temperature = document.querySelector("#temperature");
  const condition = document.querySelector("#condition");
  const location = document.querySelector("#location");

  temperature.textContent = `${weatherData.temperature}°C`;
  condition.textContent = weatherData.condition;
  location.textContent = weatherData.location;
}

const searchBtn = document.querySelector("#search-btn");
const searchBar = document.querySelector("#search-bar");

searchBtn.addEventListener("click", () => {
  const location = searchBar.value;
  getWeatherData(location)
    .then(weatherData => {
      updateUI(weatherData);
    })
    .catch(error => {
      // Handle the error and display a message to the user
      const temperature = document.querySelector("#temperature");
      const condition = document.querySelector("#condition");
      const location = document.querySelector("#location");

      temperature.textContent = "N/A";
      condition.textContent = "City not found or invalid request";
      location.textContent = "";
      
      console.log(error);
    });
});
