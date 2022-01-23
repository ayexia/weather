window.addEventListener('load', ()=> {
    let lon;
    let lat;
    let weatherDescription = document.querySelector(".weather-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationName = document.querySelector(".location-name");
    let locationIcon = document.querySelector(".weather-icon");
    let temperatureSection = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector('.temperature span');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition
        (position =>{
            lon = position.coords.longitude;
            lat = position.coords.latitude;

            const api = "52b803a171405473718fcf83572c9729"

            const base = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=52b803a171405473718fcf83572c9729`;
            
        fetch(base)
        .then((response) => {
            return response.json();
        })
        .then((data) =>{
            const { temp } = data.main;
            const { description } = data.weather[0];
            const { country } = data.sys;
            const { icon } = data.weather[0];
            //Set DOM elements from the API
            //Formula for Fahrenheit
            temperatureDegree.textContent = ((temp - 273.15) * 9/5 + 32).toFixed(2);
            weatherDescription.textContent = description;
            locationName.textContent = data.name +", "+country;
            locationIcon.innerHTML = `<img src="icons/${icon}.png"></img>`;

            //Formula for Celsius
            let celsius = (temp - 273.15).toFixed(2);

            //Change temperature to Celsius/Fahrenheit
            temperatureSection.addEventListener('click', () =>{
                if(temperatureSpan.textContent === "F"){
                    temperatureSpan.textContent = "C";
                    temperatureDegree.textContent = celsius
                }else{
                    temperatureSpan.textContent = "F";
                    temperatureDegree.textContent = ((temp - 273.15) * 9/5 + 32).toFixed(2);
                }
            })
        })
    });
}else{
    h1.textContent = "Please enable your location!"

    }
   
});