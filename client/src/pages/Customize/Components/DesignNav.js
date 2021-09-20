import React from "react";
import { Grid, Box, Typography } from "@material-ui/core";
import useStyles from '../style';
import upload from '../../../images/upload.svg'
import addTshirt from '../../../images/tshirt.svg'
import addTextBar from '../../../images/text.svg'
import image from '../../../images/image.svg'
import addColor from '../../../images/drop.svg'
import note from '../../../images/sticky-notes.svg'

const DesignNav = (props) => {

    const classes = useStyles();
  
    return (
        <Grid item md={2.4} className={classes.bar}>
        <Box >
          <Grid item style={{ width: '100%' }}>
            <a href="#">
              <button className={props.toggleState === 1 ? classes.activeTabs : classes.tabs} onClick={() => props.toggleTab(1)}><img height={50} src={addTextBar} />
                <Typography textDecoration='none' className={classes.barFont}>ADD TEXT</Typography>
              </button>
            </a>
          </Grid>
        </Box>
        <Box >
          <Grid item xs={12} sm={6} md={2.4} >
            <a href="#">
              <button className={props.toggleState === 3 ? classes.activeTabs : classes.tabs} onClick={() => props.toggleTab(3)}>
                <img height={50} src={upload} />
                <Typography textDecoration='none' className={classes.barFont}>UPLOAD</Typography>
              </button>
            </a>
          </Grid>
        </Box>
        <Box >
          <Grid item xs={12} sm={6} md={2.4} >
            <a href="#">
              <button className={props.toggleState === 4 ? classes.activeTabs : classes.tabs} onClick={() => props.toggleTab(4)}>
                <img height={50} src={addTshirt} />
                <Typography textDecoration='none' className={classes.barFont}>SELECT TYPE</Typography>
              </button>
            </a>
          </Grid>
        </Box>
        <Box className={classes.tabs}>
          <Grid item xs={12} sm={6} md={2.4} >
            <a href="#">
              <button className={props.toggleState === 5 ? classes.activeTabs : classes.tabs} onClick={() => props.toggleTab(5)}>
                <img height={50} src={addColor} />
                <Typography textDecoration='none' className={classes.barFont}>COLOR</Typography>
              </button>
            </a>
          </Grid>
        </Box>
        <Box className={classes.tabs}>
          <Grid item xs={12} sm={6} md={2.4} >
            <a href="#">
              <button className={props.toggleState === 5 ? classes.activeTabs : classes.tabs} onClick={() => props.toggleTab(6)}>
                <img height={50} src={note} />
                <Typography textDecoration='none' className={classes.barFont}>ADD NOTE</Typography>
              </button>
            </a>
          </Grid>
        </Box>
      </Grid>
    );
  
}

export default DesignNav;
