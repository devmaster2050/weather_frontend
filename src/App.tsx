import React from 'react'
import CityTablePage from "./Components/CitysPage";
import WeatherPage from './Components/WeatherPage';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/"  element={<CityTablePage/>} />
        <Route path="/weather/:geoname_id" element={<WeatherPage/>} /> 
      </Routes>
    </Router>
      // https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=99&refine=cou_name_en%3A%22Brazil%22
  )
}

export default App