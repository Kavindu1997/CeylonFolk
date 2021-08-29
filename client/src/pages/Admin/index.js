import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline, Drawer, Box, AppBar, Toolbar, List, Typography, Divider, IconButton, Badge, Container, Grid, Paper, Link, } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondListItems } from './ListItems';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Lottie from 'react-lottie';
import Stat from '../../images/stat.json';
import UserTable from './UserTable';
import CollectionTable from './CollectionTable';
import CouponTable from './CouponTable';
import DesignTable from './DesignTable';
import InventoryTable from './InventoryTable';
import ViewDesignTable from './ViewDesignTable';
import SizeTable from './SizeTable';
import useStyles from './style';


export default function AdminPanel() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Stat,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title} style={{ fontFamily: 'Nunito', fontSize: '2rem' }}>
            Ceylon<span className={classes.colorText}>Folk</span>
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List style={{ backgroundColor: '#2C2D2D' }}>{secondListItems}</List>
        <Divider />
      </Drawer>

      <main className={classes.content}>
        <Router>
          <Route path="/admin" exact render={() => <Lottie options={defaultOptions} height={700} width={700} style={{ marginTop: '20px' }} />} />
          <Route path="/users" exact render={() => <UserTable />} />
          <Route path="/collections" exact render={() => <CollectionTable />} />
          <Route path="/designs" exact render={() => <DesignTable />} />
          <Route path="/viewDesigns" exact render={() => <ViewDesignTable />} />
          <Route path="/inventory" exact render={() => <InventoryTable />} />
          <Route path="/coupon" exact render={() => <CouponTable />} />
          <Route path="/availableSizes" exact render={() => <SizeTable />} />
        </Router>


      </main>

    </div>
  );
}