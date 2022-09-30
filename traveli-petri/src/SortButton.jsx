import React from "react";
import {Button} from "@mui/material";
import {Menu} from "@mui/material";
import {MenuItem} from "@mui/material";
import Divider from '@mui/material/Divider'

const SortButton = (props) => {
   const set = props.setData;
    
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSortByEpisode = () => { //sort by episode
    const sortedData = props.data.sort((a, b) => a.episode_id - b.episode_id)
    set({ ...props.data, results: sortedData })
    setAnchorEl(null);
  }

  const handleSortByYear = () => { //sort by date
    const sortedData = props.data.sort((a, b) => new Date(...a.release_date.split('-')) - new Date(...b.release_date.split('-')))
    set({ ...props.data, results: sortedData })
    setAnchorEl(null);
  }


  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        variant="contained"
      >
        Sort by...
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        label="Sort by"
      >
        <MenuItem onClick={handleSortByEpisode}>Episode</MenuItem>
        <Divider sx={{width: '90%'}}/>
        <MenuItem onClick={handleSortByYear}>Year</MenuItem>
      </Menu>
    </div>
  );
};

export default SortButton;