import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';

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
  // const history = useHistory();

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
    // Redirect to the weather page with city ID
   navigate(`/weather/${geoname_id}`);
  };

  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <TextField
      fullWidth
        label="Search City"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
        style={{ margin: '50px 0px 20px 0px' }}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="city table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight:700}}>Geo-ID</TableCell>
              <TableCell style={{ fontWeight:700}}>Name</TableCell>
              <TableCell style={{ fontWeight:700}}>Country</TableCell>
              <TableCell style={{ fontWeight:700}}>Country Code</TableCell>
              <TableCell style={{ fontWeight:700}}>Timezone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCities.map(city => (
              <TableRow key={city.geoname_id} onClick={() => handleCityClick(city.geoname_id)} style={{ cursor: 'pointer' }}>
                <TableCell>{city.geoname_id}</TableCell>
                <TableCell>{city.name}</TableCell>
                <TableCell>{city.cou_name_en}</TableCell>
                <TableCell>{city.country_code}</TableCell>
                <TableCell>{city.timezone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CityTablePage;
