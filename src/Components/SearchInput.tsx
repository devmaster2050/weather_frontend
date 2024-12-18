// import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
// import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
// import DirectionsIcon from '@mui/icons-material/Directions';

export default function SearchInput({value, onChange}: {value: any, onChange: any}) {
  return (
    <Paper
      component="form"
      className='!bg-[#0000005c] !shadow-none w-[200px] sm:w-[300px] md:w-[400px] lg:w-[600px]'
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1, color : 'white'}}
        placeholder="Search City..."
        value={value}
        onChange={onChange}
        inputProps={{ 'aria-label': 'Search City' }}
      />
      <IconButton type="button" sx={{ p: '10px', color : 'white'}} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}