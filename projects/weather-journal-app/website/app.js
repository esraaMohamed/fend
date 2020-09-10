/* Global Variables */
const baseUrl = "http://api.openweathermap.org/data/2.5/weather?zip=";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();
console.log(newDate);
// Personal API Key for OpenWeatherMap API
const apiKey = "d8582cc7bc65df71cb22ff2463f41122";

// Event listener on the zip code field to not submit with empty zip code
document.getElementById("zip").addEventListener("input", (event) => {
  if (event.target.value === "") {
    document.getElementById("zipError").style.display = "block";
    document.getElementById("generate").setAttribute("disabled", "");
  } else {
    document.getElementById("zipError").style.display = "none";
    document.getElementById("generate").removeAttribute("disabled");
  }
});

/* Function called by event listener */
const fetchWeatherData = () => {
  const zipCode = document.getElementById("zip").value;
  const userResponse = document.getElementById("feelings").value;
  const fetchUrl = `${baseUrl}${zipCode},us&appid=${apiKey}&units=imperial`;
  getWeatherData(fetchUrl)
    .then((data) => {
      addEntry({
        temperature: data.main.temp,
        date: newDate,
        city: data.name,
        weather:data.weather[0].description,
        userResponse,
      }).then(updateUI())
    })
    .catch((error) => console.log("Error", error));
};

// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click", fetchWeatherData);

/* Function to GET Web API Data*/
const getWeatherData = async (url = "") => {
  const response = await fetch(url);
  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};
/* Function to POST data */

const addEntry = async (data) => {
  const response = await fetch("/addEntry", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    return await response.json();
  } catch (error) {
    console.log("error", error);
  }
};

/* Function to GET Project Data */

const updateUI = async () => {
  const response = await fetch("/getEntries", {
    method: "GET",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
  });
  try {
    const projectData = await response.json();
    projectData.map(data => {
        document.getElementById(
            "date"
          ).innerHTML = `Date was: ${data.date}`;
          document.getElementById(
            "temp"
          ).innerHTML = `Temperature was: ${data.temperature}`;
          document.getElementById(
              "weather"
            ).innerHTML = `The weather description was: ${data.weather}`;
          document.getElementById('city').innerHTML = `In ${data.city}`
          document.getElementById(
            "content"
          ).innerHTML = `You were feeling: ${data.userResponse}`;
    })
  } catch (error) {
    console.log("error", error);
  }
};
