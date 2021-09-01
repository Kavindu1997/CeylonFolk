import React from "react";
import { Grid, Box, Typography } from "@material-ui/core";
import useStyles from '../style';
import upload from '../../../images/upload.svg'
import addTshirt from '../../../images/tshirt.svg'
import addTextBar from '../../../images/text.svg'
import image from '../../../images/image.svg'
import addColor from '../../../images/drop.svg'

const DesignBox = (props) => {

    const classes = useStyles();
  
    return (
        <Box className={props.toggleState === 0 ? classes.activeContent : classes.content}>
              <Grid md={8} Container className={classes.bar5} >
                <Grid item md={2.4} style={{ width: '100%' }}>
                  <a href="#">
                    <button className={classes.barBtn2}><img height={50} src={addTextBar} onClick={() => props.toggleTab(1)} />
                      <Typography textDecoration='none' className={classes.barFont}>ADD TEXT</Typography>
                    </button>
                  </a>
                </Grid>
                <Grid item xs={12} sm={6} md={2.4} >
                  <a href="#">
                    <button className={classes.barBtn2}><img height={50} src={image} onClick={() => props.toggleTab(2)}/>
                      <Typography textDecoration='none' className={classes.barFont}>ADD IMAGE</Typography>
                    </button>
                  </a>
                </Grid>
              </Grid>
              <Grid Container className={classes.bar5} >
                <Grid item md={2.4} style={{ width: '100%' }}>
                  <a href="#">
                    <button className={classes.barBtn2}>
                      <img height={50} src={upload} />
                      <Typography textDecoration='none' className={classes.barFont} onClick={() => props.toggleTab(3)}>UPLOAD</Typography>
                    </button>
                  </a>
                </Grid>
                <Grid item xs={12} sm={6} md={2.4} >
                  <a href="#">
                    <button className={classes.barBtn2}>
                      <img height={50} src={addTshirt} />
                      <Typography textDecoration='none' className={classes.barFont} onClick={() => props.toggleTab(4)}>SELECT TYPE</Typography>
                    </button>
                  </a>
                </Grid>
              </Grid>
            </Box>
    );
  
}

export default DesignBox;
