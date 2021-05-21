import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import logo from "../img/logo.png";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  logo: {
    marginLeft: -24,
    height: 64,
    marginBottom: -4,
  },
  title: {
    "& h5": { lineHeight: "64px" },
    textAlign: "center",
  },
}));

export default function Topbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Grid container>
            <Grid item sm="2">
              <img src={logo} alt="logo" className={classes.logo} />
            </Grid>
            <Grid item sm="8" className={classes.title}>
              <Typography variant="h5">USFM Grammar Online</Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
