import { makeStyles } from "@material-ui/core";
import { colors } from "./theme";

export const useStyles = makeStyles((theme) => ({
  section: {
    margin: theme.spacing(2, 0),
  },
  pageLabel: {
    color: colors.baselight,
    marginBottom: theme.spacing(1),
    textTransform: "uppercase",
  },
  pageHeader: {
    color: colors.baseDark,
    marginBottom: theme.spacing(2),
    textTransform: "capitalize",
  },
  responsiveImg: {
    width: "100%",
    height: "auto",
  },
  cardImage: {
    maxHeight: "150px !important",
    overflowY: "hidden",
  },

  // dashboard
  cardLabel: {
    color: colors.baselight,
    margin: theme.spacing(2, 0),
    textTransform: "uppercase",
    textAlign: "center",
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.8rem",
      margin: theme.spacing(1, 0),
    },
  },
  cardHeader: {
    color: colors.baseDark,
    margin: theme.spacing(2, 0),
    textTransform: "capitalize",
    textAlign: "center",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.8rem",
      margin: theme.spacing(1, 0),
    },
  },
  displayCard: {
    position: "relative",
    padding: "0px !important",
    minHeight: "140px",
    height: "auto",
  },
  displayCardGraph: {
    width: "100%",
    height: "60px !important",
    position: "absolute",
    bottom: "0px",
    left: "0px",
    [theme.breakpoints.down("xs")]: {
      height: "45px !important",
    },
  },
  ratio: {
    position: "absolute",
    top: "0%",
    right: "5%",
    [theme.breakpoints.down("xs")]: {
      top: "45%",
      left: "25%",
    },
  },
  progressbarContainer: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "250px",
  },
  //Pie and  line section
  cardTitle: {
    color: colors.baseDark,
  },
  generalGraph: {
    width: "100%",
    height: "300px",
  },

  content: {
    flexGrow: 1,
    height: '200vh',
    overflow: 'hidden',
  },

  //footer
  footer: {
    padding: "8px 24px 16px 270px",
    [theme.breakpoints.down("sm")]: {
      padding: "8px 24px 16px 24px",
    },
  },
}));