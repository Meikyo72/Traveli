import './App.css'
import React, { useState, useEffect, Fragment } from 'react'
import TextField from '@mui/material/TextField'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import SearchIcon from '@mui/icons-material/Search'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import SortButton from './SortButton'
import DataList from './DataList'




function App() {
  //fetch data from api
  const [data, setData] = useState([])
  const [rightPanel, setRightPanel] = useState('')
  const [clickCheck, setClickCheck] = useState(false)
  const [rightPanelContent, setRightPanelContent] = useState()
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('https://swapi.dev/api/films/?format=json')
      .then(response => response.json())
      .then(data => setData(data))
  }, [])

   useEffect(() => {
     if (clickCheck) {
       setRightPanelContent(data.results.find(({ episode_id }) => episode_id === rightPanel.index))
       setClickCheck(!clickCheck)
     }
   }, [clickCheck])
  
  
  return (
    <div className="App">
      <Grid container spacing={2} m={1} sx={{width: 'auto'}} className="searchField">
        <Grid pb={2} item xs={1}><SortButton data={data.results} setData={setData}/></Grid>
        <Grid pb={2} pr={2} item xs={11}><TextField className='searchText' variant="outlined" fullWidth size='small' label={<Fragment><SearchIcon fontSize='small'/> Type to search...</Fragment>} onChange={event=>setSearch(event.target.value)} /></Grid>
      </Grid>
      <Grid container>
      <Grid container item xs={6} className="list" onClick={()=>setClickCheck(!clickCheck)} >
        {data.results ? <DataList data={data} setRightPanel={setRightPanel} rightPanel={rightPanel} search={search} /> : <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><Typography variant='caption' gutterBottom>Loading Star Wars movies...</Typography><CircularProgress /></Box>}
        
      </Grid>
      <Divider orientation='vertical' sx={{height: 'auto'}} flexItem/>
      <Grid container item xs={5.9} className="details">
        {rightPanelContent ? 
        <Box sx={{width: '100%', height: '100%', justifyContent: 'left'}}>
        <Typography variant='h5' gutterBottom>Episode {renderRomanNumber(rightPanelContent.episode_id)} - {rightPanelContent.title}</Typography>
        <Typography sx={{justifyContent: 'left'}} variant='body1' gutterBottom>{rightPanelContent.opening_crawl}</Typography>
        <Typography variant='body2' gutterBottom>Directed by: {rightPanelContent.director}</Typography>
        </Box>
        :
        <Box sx={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <Typography>No movie selected</Typography>
        </Box>
        }        
        </Grid>
        </Grid>
    </div>
  )
}

 //convert integer to roman number
 const renderRomanNumber = (num) => {
  const roman = {
      M: 1000,
      CM: 900,
      D: 500,
      CD: 400,
      C: 100,
      XC: 90,
      L: 50,
      XL: 40,
      X: 10,
      IX: 9,
      V: 5,
      IV: 4,
      I: 1,
  };
  let result = "";
  for (let i of Object.keys(roman)) {
      let q = Math.floor(num / roman[i]);
      num -= q * roman[i];
      result += i.repeat(q);
  }
  return result;
  };

export default App
