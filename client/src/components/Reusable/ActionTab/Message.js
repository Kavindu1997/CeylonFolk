// import React, { Fragment } from "react";
import React, { useState, useEffect } from "react";
import {Avatar,Badge,Button,IconButton,List,ListItem, ListItemAvatar, ListItemText,Menu,} from "@material-ui/core";
import ForumIcon from "@material-ui/icons/Forum";
import { useStyles } from "./styles";
import axios from 'axios';
import Controls from '../Controls';



export default function Messages() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log("handleClicked ", event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [listOfContactUs, setListOfContactUs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/notifications").then((response) => {
        console.log(response.data);
        // console.log("ssss");
        setListOfContactUs(response.data);
      
    })
}, []);

console.log(listOfContactUs);
console.log("jkjk");
  const dropDownData = [ { label: "kk" , description: "Hi CeylonFolk" },];


     
  return (
    <>
      <IconButton
        aria-controls='Messages'
        aria-haspopup='true'
        onClick={handleClick}
        color='inherit'>
        <Badge badgeContent={(listOfContactUs.length+listOfContactUs.length)} color='secondary'>
          <ForumIcon />
        </Badge>
      </IconButton>
      <Menu
        id='Messages'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        placement='bottom-start'>
        <List dense={true} className={classes.dropdownlist}>

          {listOfContactUs.map((item,i) => (
            <ListItem
              key={i}
              component={Button}
              onClick={handleClose}
              className={classes.listItem}>
              <ListItemAvatar>
                <Avatar className={classes.navImg}>{item.id[0]}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={item.id}
                secondary={item.name}></ListItemText>

                {/* <Controls.Button
                                type="submit"
                                text="Add New Design"
                            /> */}

            </ListItem>
          ))}


            {listOfContactUs.map((item,i) => (
            <ListItem
              key={i}
              component={Button}
              onClick={handleClose}
              className={classes.listItem}>
              <ListItemAvatar>
                <Avatar className={classes.navImg}>{item.id[0]}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={item.id}
                secondary={item.name}></ListItemText>
            </ListItem>
          ))}
        </List>
      </Menu>
    </>
  );
}