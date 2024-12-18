import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSun, faCloudRain, faCloud, faSnowflake } from '@fortawesome/free-solid-svg-icons';
import MainCard from './weatherInfoCard/MainCard';


interface WeatherData {
  temperature: number;
  description: string;
  cityName: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  highTemp: number;
  lowTemp: number;
  precipitationChance: number;
}

const WeatherPage: React.FC = () => {
  const params = useParams<{ geoname_id: string }>();
  const { geoname_id } = params;
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const apiKey = '61074d6c44ede0cd7855f7c1cf5292b6';
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?id=${geoname_id}&appid=${apiKey}&units=metric`
        );
        const data = await response.json();
        const temperature = data.main.temp;
        const description = data.weather[0].description;
        const cityName = data.name;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        const pressure = data.main.pressure;
        const highTemp = data.main.temp_max;
        const lowTemp = data.main.temp_min;
        const precipitationChance = data.clouds.all;
        setWeatherData({ temperature, description, cityName, humidity, windSpeed, pressure, highTemp, lowTemp, precipitationChance });
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, [geoname_id]);



  // const getWeatherIcon = (description: string) => {
  //   switch (description.toLowerCase()) {
  //     case 'clear sky':
  //       return <FontAwesomeIcon icon={faSun} />;
  //     case 'rain':
  //       return <FontAwesomeIcon icon={faCloudRain} />;
  //     case 'clouds':
  //       return <FontAwesomeIcon icon={faCloud} />;
  //     case 'snow':
  //       return <FontAwesomeIcon icon={faSnowflake} />;
  //     default:
  //       return null;
  //   }
  // };

  return (
    // <WeatherContainer>
    //   <WeatherCard weather={weatherData?.description || ''}>
    //     {weatherData && (
    //       <>
    //         {getWeatherIcon(weatherData.description)}
    //         <CityName>{weatherData.cityName}</CityName>
    //         <Temperature>{weatherData.temperature}°C</Temperature>
    //         <Description>{weatherData.description}</Description>
    //         <WeatherDetailsContainer>
    //       <WeatherDetailsList>
    //         <WeatherDetailItem>Humidity: {weatherData.humidity}%</WeatherDetailItem>
    //         <WeatherDetailItem>Wind Speed: {weatherData.windSpeed} m/s</WeatherDetailItem>
    //         <WeatherDetailItem>Pressure: {weatherData.pressure} hPa</WeatherDetailItem>
    //       </WeatherDetailsList>
    //       <WeatherDetailsList>
    //         <WeatherDetailItem>High Temp: {weatherData.highTemp}°C</WeatherDetailItem>
    //         <WeatherDetailItem>Low Temp: {weatherData.lowTemp}°C</WeatherDetailItem>
    //         <WeatherDetailItem>Precipitation Chance: {weatherData.precipitationChance}%</WeatherDetailItem>
    //       </WeatherDetailsList>
    //     </WeatherDetailsContainer>
    //       </>
    //     )}
    //   </WeatherCard>
    //   {!weatherData && <img className='rounded-full  pt-1 pb-32' src='/P2D.gif'></img>}
    // </WeatherContainer>
    
    <div className='flex gap-6 justify-center items-center md:h-[100vh] '
    style={{
      backgroundImage: "url('/img/back.jpg')",
      backgroundSize: "cover", // Adjust as needed (contain, auto)
      backgroundPosition: "center", // Adjust as needed
      backgroundRepeat: "no-repeat" // Prevent repetition of the image
  }}
    >
      
      {weatherData && (
        <>
          
          <MainCard weatherData={weatherData} />
        </>
      )}
      {!weatherData && <img className='rounded-full pt-1 pb-32' alt="" src='/P2D.gif'></img>}
    </div>
  );
};

export default WeatherPage;
