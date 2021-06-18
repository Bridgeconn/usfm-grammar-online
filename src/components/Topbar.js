import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import logo from "../img/logo.png";
import GitHubIcon from "@material-ui/icons/GitHub";
import { Box, Grid, IconButton } from "@material-ui/core";

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
    order: 0,
    "& h5": { lineHeight: "64px" },
    textAlign: "center",
    [theme.breakpoints.down("xs")]: {
      order: 2,
    },
  },
  version: {
    marginRight: theme.spacing(2),
    lineHeight: "24px",
  },
  button: {
    padding: 0,
  },
}));

export default function Topbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Grid container>
            <Grid item xs={6} sm={4} md={2}>
              <img src={logo} alt="logo" className={classes.logo} />
            </Grid>
            <Grid item xs={12} sm={6} md={8} className={classes.title}>
              <Typography variant="h5">USFM Grammar Online</Typography>
            </Grid>
            <Grid item xs={6} sm={2} md={2}>
              <Box
                display="flex"
                flexDirection="row-reverse"
                p={1}
                m={1.5}
                mr={0}
              >
                <IconButton
                  variant="outlined"
                  className={classes.button}
                  color="inherit"
                  href="https://github.com/Bridgeconn/usfm-grammar"
                  target="_blank"
                  rel="noopener"
                >
                  <GitHubIcon />
                </IconButton>
                <Typography className={classes.version}>v2.0.0</Typography>
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
