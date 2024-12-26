const apiKey = "f19e7f03e34f1f3d1000b970d71e6c23";
//let city = "Nagpur";


async function fetchweatherData(city) {
    const response = await fetch(
         `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

    );
    console.log(response);
    let data = await response.json();
    console.log(data);
    console.log(data.name);
    console.log(data.main);
    console.log(data.main.temp);
    console.log(data.wind.speed);
    console.log(data.main.humidity);
    console.log(data.visibility);
    updateweatherUI(data)
}
fetchweatherData();

let cityElement = document
.querySelector(".city");
let temperature = document
.querySelector(".temp");
let windspeed = document
.querySelector(".wind-speed");
let humidity = document.querySelector(".humidity");
let visibility = document
.querySelector(".visibility-distance");
let descriptionText = document.querySelector(".description-text");
let dateElement = document.querySelector(".date");
console.log(cityElement);

function updateweatherUI(Value) {
    console.log(Value);
    cityElement.textContent = Value.name;
    temperature.textContent = `${Math.round(Value.main.temp)}°`;
    windspeed.textContent = `${Value.wind.speed}Km/h`;
    humidity.textContent = `${Value.main.humidity}%`;
    visibility.textContent = `${Value.visibility/1000}Km/h`;
    descriptionText.textContent = Value.weather[0].description;

    const currentDate = new Date();
    dateElement.textContent = currentDate.toDateString();

    setTimeout(() => {
        AOS.refreshHard();
    }, 500); 
}

const formelement = document.querySelector(".search-form");
const inputelement = document.querySelector(".city-input");
formelement.addEventListener("submit", (event) => {
    event.preventDefault();
    let city = inputelement.value;
    if(city != "") {
        fetchweatherData(city);
        inputelement.value = "";
    }
});