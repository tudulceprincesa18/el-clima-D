const API_KEY = '6c5ecc4e10da35760fb1d738e75cda33';

const fetchData = position => {

    const {latitude, longitude} = position.coords; 
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`)
       .then(response => response.json())
       .then(data => setWeatherData(data)); 
}

const setWeatherData = data => {
      const weatherData = {
          location: data.name,
          description: data.weather[0].main,
          humidity: data.main.humidity,
          pressure: data.main.pressure,
          temperature: Math.floor(data.main.temp),
          date: getDate(),
       }
   
      Object.keys(weatherData).forEach( key => {
           setTextContent(key, weatherData[key]);
      });

      cleanUp();
   }

    const cleanUp = () => {
         let contenedor = document.getElementById('contenedor');
         let loader = document.getElementById('loader');

         loader.style.display = 'none';
         contenedor.style.display = 'flex';
    }

    const getDate = () =>{
        let date = new Date();
        return `${date.getDate()} - ${ date.getMonth()} - ${date.getFullYear()}`; 
    } 

    const setTextContent = (element, text) => {
        document.getElementById(element).textContent = text;
    }

   const onLoad = () => {
         navigator.geolocation.getCurrentPosition(fetchData)
   }