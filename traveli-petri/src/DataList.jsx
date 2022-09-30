import React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

const DataList = (props) => {
    const set = props.setRightPanel;

    const handleClick = (event, index) => {
        set({...props.rightPanel, index});
    };


        return (
        <List>
            {!props.search ?
        props.data.results && props.data.results.map((item) => 
            <div key={item.episode_id} >
            <ListItemButton divider  onClick={(event)=>handleClick(event, item.episode_id)}>
                <ListItemText className="leftText">
                EPISODE {item.episode_id}
                </ListItemText>
                <ListItemText className="middleText">
                Episode {renderRomanNumber(item.episode_id)} - {item.title}
                </ListItemText>
                <ListItemText className="rightText">
                {item.release_date}
                </ListItemText>
            </ListItemButton>
            </div>
        ):
        props.data.results && props.data.results.filter((item) => item.title.toLowerCase().includes(props.search.toLowerCase())).map((item) => 
            <div key={item.episode_id} >
            <ListItemButton divider  onClick={(event)=>handleClick(event, item.episode_id)}>
                <ListItemText className="leftText">
                EPISODE {item.episode_id}
                </ListItemText>
                <ListItemText className="middleText">
                Episode {renderRomanNumber(item.episode_id)} - {item.title}
                </ListItemText>
                <ListItemText className="rightText">
                {item.release_date}
                </ListItemText>
            </ListItemButton>
            </div>
        )}
        </List>
    );
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

    export default DataList;