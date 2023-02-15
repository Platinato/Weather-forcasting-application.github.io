// get the form and result elements
const form = document.querySelector("form");
const result = document.querySelector("#result");

// Hide the result element by default
result.style.display = "none";

form.addEventListener("submit", (event) => {
 /**
  * `event.preventDefault()` is a method used to prevent the default behavior of an event from occurring.

    For example, when you submit a form, the default behavior is to reload the page. If you want to stop this behavior and 
    handle the form submission using JavaScript, you can use event.preventDefault() in the event listener for the form's 
    submit event.
  * 
  */ 
  event.preventDefault();

  // get the input element
  const city = document.querySelector("#city").value;
  result.innerHTML = `Loading weather for ${city}...`;

  const apiKey = `c2cfaaef7bf18477996f21b7fd42eac1`;

  // Check if there is an input
  if(city) {

    // Show the result element
    result.style.display = "block";

    // create the url to fetch the results
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then((response) => response.json())  // if there is a result returne dby the url then parse the result into json format
      .then((data) => {
          let output = `<h2>5-Day Forecast for ${city}:</h2><br>`;
          for (let i = 0, j = 1; i < data.list.length; i += 8, j++) {
            
            // it is current weather, display the humidity, wind speed, 
            if(i==0) {
              output += `<p><hr>Current Weather<br><hr>Date & Time: ${data.list[i].dt_txt}<br>`;
              output += `Temperature: ${data.list[i].main.temp} °C<br>`;
              output += `Sky: ${data.list[i].weather[0].description}<br>`;
              output += `Wind Speed: ${data.list[i].wind.speed} km/h<br>`;
              output += `Humidity: ${data.list[i].main.humidity} %</p>`;
            } else {
              output += `<p><hr>Day ${j}<br><hr>Date & Time: ${data.list[i].dt_txt}<br>`;
              output += `Temperature: ${data.list[i].main.temp} °C</p>`;
            }

          }
          result.innerHTML = output;
      })
      .catch((error) => {
          result.innerHTML = `${error}\n`;
        result.innerHTML = "Error getting weather data.";
      });
    
    }
    else {
      // Hide the result element
      result.style.display = "none";
    }
});
