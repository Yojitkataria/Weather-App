document.addEventListener("DOMContentLoaded",()=>{
    const cityInput = document.getElementById("city-input");
    const weatherInfo = document.getElementById("weather-info");
    const temp = document.getElementById("temperature");
    const descp = document.getElementById("description");
    const errorMsg = document.getElementById("error-message");
    const weatherButn = document.getElementById("get-weather-btn");
    const cityName = document.getElementById("city-name");
   const API_KEY = "a70de820397ca76906b135f95a12e982";


    weatherButn.addEventListener("click",async (e)=>{
        const city = cityInput.value.trim();
        if(!city) return;

        //it may throw error 
        //server/db i always in another continent 

        try{
          const weatherData =  await fetchWeatherData(city)
          displayWeatherData(weatherData);
        }
        catch (error){
            showError();
            console.log(error);
        }

    });

 async function fetchWeatherData(city){
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
         const resp = await fetch(url)

        
         if(!resp.ok){
            throw new Error("City not Found or API error");
         }

        const data = await resp.json();
        return  data;
    }

    function displayWeatherData(data){
        const{name,main,weather} = data;
        cityName.textContent = name;

       
        temp.textContent = `Temperature: ${main.temp}°C`;
        descp.textContent = `Weather: ${weather[0].description}`

          weatherInfo.classList.remove("hidden");  // show weather info 
        errorMsg.classList.add("hidden");     // hide error mesg 
//.add means to hide 
//.remove means to show 


    }

    function showError(){

        weatherInfo.classList.remove("hidden");
        errorMsg.classList.remove("hidden");

    }
    


})
