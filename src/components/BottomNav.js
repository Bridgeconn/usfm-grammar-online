import React from "react";
import { Button } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  landingFooter: {
    marginLeft: -8,
    bottom: 0,
    position: "fixed",
    background: "#3f51b5",
    color: "#fff",
    padding: "5px 15px",
    textAlign: "center",
    zIndex: 1000,
    "&div": {
      display: "inline-block",
      paddingTop: theme.spacing(3),
    },
  },
  text: {
    padding: theme.spacing(1),
    textAlign: "right",
    display: "inline-block",
    float: "right",
    [theme.breakpoints.only("xs")]: {
      float: "unset",
    },
  },
  link: {
    color: "inherit",
    textDecoration: "none",
    borderRight: "1px solid #fff",
    display: "inline-block",
    padding: "0px 10px",
    fontSize: 16,
    marginTop: 8,
    "&:hover": {
      color: "inherit",
    },
    "&:last-child": {
      borderRight: 0,
    },
  },
  companyLink: {
    color: "inherit",
    "&:hover": {
      color: "inherit",
      textDecoration: "none",
    },
  },
  button: {
    marginTop: 3,
    textTransform: "unset",
    padding: "2px 10px",
    fontSize: 16,
  },
  feedback: {
    marginTop: 3,
    textTransform: "unset",
    padding: "2px 10px",
    fontSize: 16,
    "&:hover": {
      color: "inherit",
    },
  },
  rightLinks: {
    textAlign: "left",
    [theme.breakpoints.only("xs")]: {
      textAlign: "center",
    },
  },
}));
const BottomNav = (props) => {
  const classes = useStyles();

  return (
    <>
      <Grid container className={classes.landingFooter}>
        <Grid item xs={6} sm={5} className={classes.rightLinks}></Grid>
        <Grid item xs={6} sm={2}>
          <Button
            variant="outlined"
            size="small"
            color="inherit"
            className={classes.feedback}
            startIcon={<GitHubIcon />}
            href="https://github.com/Bridgeconn/usfm-grammar"
            target="_blank"
            rel="noopener"
          >
            USFM Grammar
          </Button>
        </Grid>
        <Grid item xs={12} sm={5}>
          <Typography className={classes.text}>v2.0.0</Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default BottomNav;
