import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SearchInput from './SearchInput';
import CityCard2 from './CityCard';

interface City {
  geoname_id: string;
  name: string;
  cou_name_en: string;
  country_code: string;
  timezone: string;
}

const API = "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=99&refine=cou_name_en%3A%22Brazil%22";

const CityTablePage = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch(API);
        const data = await response.json();
        const citiesData: City[] = data.results.map((city: any) => ({
          geoname_id: city.geoname_id,
          name: city.name,
          cou_name_en: city.cou_name_en,
          country_code: city.country_code,
          timezone: city.timezone
        }));
        setCities(citiesData);
      } catch (error) {
        console.error('Error fetching city data:', error);
      }
    };

    fetchCities();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleCityClick = (geoname_id: string) => {
    navigate(`/weather/${geoname_id}`);
  };

  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='flex relative flex-col gap-9 w-[100vw]'>
      <img className='fixed left-0 top-0 w-[100vw] h-[100vh] -z-10' src="/img/1.jpg" alt="" />
      <motion.div className='relative h-[150px] w-[100vw] sticky top-0 z-10' initial={{ scale: 1 }}>
          <motion.div
            className='w-full h-full absolute top-0 pl-10 flex items-center'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1
              className='text-[50px] xl:text-[42px] 2xl:text-5xl text-white'
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Brazil Cities
            </motion.h1>

          </motion.div>
          <div className='absolute bottom-5 right-5 flex items-center'>
            <SearchInput value={searchQuery} onChange={handleSearchChange} />
          </div>
        </motion.div>
      <motion.div
              className="customScrollbar fixed pt-[20px] pb-[20px] scroll overflow-auto focus:overscroll-contain left-0 top-[20vh] w-[100vw] h-[80vh] grid pt-0 pl-5 pr-5 gap-6 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 rounded-lg "
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {filteredCities.map((city, index) => (
                <motion.div
                  key={city.geoname_id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }} // Staggered animation
                >
                  <CityCard2 city={city} handleCityClick={handleCityClick} />
                </motion.div>
              ))}
            </motion.div>
    </div>
  );
};

export default CityTablePage;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import TextField from '@mui/material/TextField';
// import SearchInput from './SearchInput';
// import CityCard from './CityCard';
// import CityCard2 from './CityCard2';

// interface City {
//   geoname_id: string;
//   name: string;
//   cou_name_en: string;
//   country_code: string;
//   timezone: string;
// }

// const API = "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=99&refine=cou_name_en%3A%22Brazil%22";

// const CityTablePage = () => {
//   const [cities, setCities] = useState<City[]>([]);
//   const [searchQuery, setSearchQuery] = useState<string>('');
//   const navigate = useNavigate();
//   // const history = useHistory();

//   useEffect(() => {
//     const fetchCities = async () => {
//       try {
//         const response = await fetch(API);
//         const data = await response.json();
//         const citiesData: City[] = data.results.map((city: any) => ({
//           geoname_id: city.geoname_id,
//           name: city.name,
//           cou_name_en: city.cou_name_en,
//           country_code: city.country_code,
//           timezone: city.timezone
//         }));
//         setCities(citiesData);
//       } catch (error) {
//         console.error('Error fetching city data:', error);
//       }
//     };

//     fetchCities();
//   }, []);

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(event.target.value);
//   };

//   const handleCityClick = (geoname_id: string) => {
//     // Redirect to the weather page with city ID
//     navigate(`/weather/${geoname_id}`);
//   };

//   const filteredCities = cities.filter(city =>
//     city.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className='flex flex-col gap-9'>
//       {/* <TextField
//       fullWidth
//         label="Search City"
//         variant="outlined"
//         value={searchQuery}
//         onChange={handleSearchChange}
//         style={{ margin: '50px 0px 20px 0px' }}
//       /> */}
//       <div className='p-5 bg-white rounded-b-3xl  sticky top-0 z-10'>
//         <div className='flex justify-between'>

//           <div className='flex gap-2 items-center'>
//             <img className='' src="location-marker.svg" alt="" />
//             <p className='text-[25px]'>Brazil</p>
//           </div>

//           <SearchInput value={searchQuery} onChange={handleSearchChange} />
//           <div></div>

//         </div>
//       </div>

//       <div className='relative h-[200px]'>
//         <img className=' object-cover w-full rounded-xl h-[200px]' src="/page-title-bg.jpg" alt="page-title-bg" />
//         <div className='w-full h-full absolute top-0 left-0 flex items-center justify-center'>
//           <h1 className='text-[38px] xl:text-[42px] 2xl:text-5xl text-white'>Brazil Cities</h1>
//         </div>
//       </div>

//       {/* <div className='p-4 rounded-md bg-white'>
//         <TableContainer>
//           <Table sx={{ minWidth: 650 }} aria-label="city table" stickyHeader>
//             <TableHead>
//               <TableRow className='!bg-black' >
//                 <TableCell style={{ fontWeight: 700 }}>Geo-ID</TableCell>
//                 <TableCell style={{ fontWeight: 700 }}>Name</TableCell>
//                 <TableCell style={{ fontWeight: 700 }}>Country</TableCell>
//                 <TableCell style={{ fontWeight: 700 }}>Country Code</TableCell>
//                 <TableCell style={{ fontWeight: 700 }}>Timezone</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody className='!bg-[#EFF3F9]'>
//               {filteredCities.map(city => (
//                 <TableRow key={city.geoname_id} onClick={() => handleCityClick(city.geoname_id)} style={{ cursor: 'pointer' }}>
//                   <TableCell>{city.geoname_id}</TableCell>
//                   <TableCell>{city.name}</TableCell>
//                   <TableCell>{city.cou_name_en}</TableCell>
//                   <TableCell>{city.country_code}</TableCell>
//                   <TableCell>{city.timezone}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </div> */}
//       {/* <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
//         {filteredCities.map(city => (
//           <CityCard city={city} handleCityClick={handleCityClick} />
//         ))}
//       </div> */}
//       <div className="pt-0 gap-6 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 rounded-lg">
//         {filteredCities.map(city => (
//           <CityCard2 city={city} handleCityClick={handleCityClick} />
//         ))}
//       </div> 
//     </div>
//   );
// };

// export default CityTablePage;
