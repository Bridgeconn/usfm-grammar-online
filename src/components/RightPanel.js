import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Download from "./common/Download";
import Upload from "./common/Upload";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import { Toolbar } from "@material-ui/core";

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <Typography>{children}</Typography>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

function RightPanel() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs">
            <Tab label="JSON" />
            <Tab label="CSV" />
            <Tab label="TSV" />
            <Upload />
            <Download />
          </Tabs>
        </Toolbar>
      </AppBar>
      <TabPanel value={value} index={0}></TabPanel>
      <TabPanel value={value} index={1}></TabPanel>
      <TabPanel value={value} index={2}></TabPanel>
      <TextField
        fullWidth="true"
        id="outlined-multiline-static"
        multiline
        rows={34}
        defaultValue=""
        variant="outlined"
      />
    </div>
  );
}

export default RightPanel;
