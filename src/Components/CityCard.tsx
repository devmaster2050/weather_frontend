
interface City {
    geoname_id: string;
    name: string;
    cou_name_en: string;
    country_code: string;
    timezone: string;
}

const CityCard2 = ({ city, handleCityClick }: { city: City, handleCityClick: any }) => {
    return (
        <div onClick={() => handleCityClick(city.geoname_id)} className="relative flex flex-col gap-3 p-4 w-full h-full rounded-xl text-white transition-all bg-[#00000050] bg-opacity-[85%] hover:bg-opacity-70 hover:scale-105 cursor-pointer">
            <div className="flex items-center gap-3">
                <h1 className="text-[30px] text-[#ffffff]">{city.name}, {city.cou_name_en}</h1>
            </div>
            <p>Geo_ID: {city.geoname_id}</p>
            <p>TimeZone: {city.timezone}</p>
            <p className=''>Country Code: {city.country_code}</p>
            <img className="absolute bottom-0 right-0 w-24" src="/weather.png" alt="" />
        </div>
    )
}

export default CityCard2;