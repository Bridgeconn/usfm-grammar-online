import React from "react";
import { Box, Button } from "@material-ui/core";
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
  version: {
    padding: theme.spacing(1),
    textAlign: "right",
    display: "inline-block",
    float: "right",
    [theme.breakpoints.down("sm")]: {
      float: "unset",
    },
  },
  button: {
    marginTop: 3,
    textTransform: "unset",
    padding: "2px 10px",
    fontSize: 16,
    "&:hover": {
      color: "inherit",
    },
  },
}));
const BottomNav = (props) => {
  const classes = useStyles();

  return (
    <>
      <Grid container className={classes.landingFooter}>
        <Grid item xs={12} sm={4}></Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Box mx="auto">
            <Button
              variant="outlined"
              size="small"
              color="inherit"
              className={classes.button}
              startIcon={<GitHubIcon />}
              href="https://github.com/Bridgeconn/usfm-grammar"
              target="_blank"
              rel="noopener"
            >
              USFM Grammar
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Typography className={classes.version}>v2.0.0</Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default BottomNav;
