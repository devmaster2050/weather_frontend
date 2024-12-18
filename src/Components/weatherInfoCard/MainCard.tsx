//import React from 'react';
import { motion } from 'framer-motion';

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

const MainCard = ({ weatherData }: { weatherData: WeatherData }) => {
    const getWeatherIcon = (description: string): string => {
        switch (description.toLowerCase()) {
            case 'clear sky':
                return "/img/weather-symbol/sun.png";
            case 'rain':
                return "/img/weather-symbol/rain.png";
            case 'overcast clouds':
                return "/img/weather-symbol/cloud.png";
            case 'moderate rain':
                return "/img/weather-symbol/rain.png";
            default:
                return "";
        }
    };

    // Animation variants
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    };

    const infoVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
    };

    return (
        <motion.div
            className='gap-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 rounded-lg'
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          
        >
            <motion.div 
                className="py-20 px-14 bg-[#000000ca] md:w-full row-span-2 text-white rounded-3xl"
            >
                <div className="flex gap-9 justify-around mb-4">
                    <div className="text-[35px]">{weatherData.cityName}</div>
                    <img className="w-20" src={getWeatherIcon(weatherData.description)} alt={weatherData.description} />
                </div>
                <div className="text-center text-[28px] mb-10">Today, 13 Oct</div>
                <p className="text-[24px] text-white ml-5">Temperature : {weatherData.lowTemp}° / {weatherData.highTemp}°</p>
                <p className="text-[24px] text-white ml-5">Pressure : {weatherData.pressure} hPa</p>
                <p className="text-[24px] text-white ml-5">Precipitation Chance : {weatherData.precipitationChance} %</p>
                <p className="text-[24px] text-white ml-5">Wind : {weatherData.windSpeed} m/s</p>
            </motion.div>

            <div className='grid row-span-2 gap-6 md:w-full'>
                <motion.div
                    className="flex flex-col px-9 py-16 gap-6 bg-[#000000ca] item-center text-center rounded-xl"
                    variants={infoVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <img className="w-16 mx-auto" src="/img/weather-symbol/coldTem.png" alt="" />
                    <p className="text-[28px] text-white">Temperature : {weatherData.lowTemp}° / {weatherData.highTemp}°</p>
                </motion.div>

                <motion.div
                    className="flex flex-col px-9 py-16 gap-6 bg-[#000000ca] item-center text-center rounded-xl"
                    variants={infoVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <img className="w-16 mx-auto" src="/img/weather-symbol/preesure.png" alt="" />
                    <p className="text-[28px] text-white">Pressure : {weatherData.pressure} hPa</p>
                </motion.div>
            </div>

            <motion.div
                className="flex flex-col md:w-full px-9 py-16 gap-6 bg-[#000000ca] item-center text-center rounded-xl"
                variants={infoVariants}
                initial="hidden"
                animate="visible"
            >
                <img className="w-16 mx-auto" src="/img/weather-symbol/coldTem.png" alt="" />
                <p className="text-[28px] text-white">Precipitation Chance : {weatherData.precipitationChance} %</p>
            </motion.div>

            <motion.div
                className="flex flex-col md:w-full px-9 py-16 gap-6 bg-[#000000ca] item-center text-center rounded-xl"
                variants={infoVariants}
                initial="hidden"
                animate="visible"
            >
                <img className="w-16 mx-auto" src="/img/weather-symbol/wind.png" alt="" />
                <p className="text-[28px] text-white">Wind : {weatherData.windSpeed} m/s</p>
            </motion.div>
        </motion.div>
    );
};

export default MainCard;