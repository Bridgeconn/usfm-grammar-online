import React, { useContext } from "react";
import TextField from "@material-ui/core/TextField";
import Download from "./common/Download";
import Upload from "./common/Upload";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Toolbar } from "@material-ui/core";
import { GrammarContext } from "./context/GrammarContext";
import ParseJson from "./common/ParseJson";

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && children}
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
  tab: {
    minWidth: 72,
  },
}));

function RightPanel() {
  const classes = useStyles();
  const { jsonValue, setJsonValue } = useContext(GrammarContext);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs"
            style={{ width: "100%" }}
          >
            <Tab label="JSON" style={{ minWidth: 70 }} />
            <Tab label="CSV" style={{ minWidth: 70 }} />
            <Tab label="TSV" style={{ minWidth: 70 }} />
            <ParseJson />
          </Tabs>
          <Upload
            setValue={setJsonValue}
            type="json"
            // style={{ float: "right" }}
          />
          <Download
            value={jsonValue}
            extension="json"
            // style={{ float: "right" }}
          />
        </Toolbar>
      </AppBar>
      <TabPanel value={value} index={0}>
        <TextField
          fullWidth={true}
          id="outlined-multiline-static"
          multiline
          rows={34}
          value={jsonValue}
          variant="outlined"
        />
      </TabPanel>
      <TabPanel value={value} index={1}></TabPanel>
      <TabPanel value={value} index={2}></TabPanel>
    </div>
  );
}

export default RightPanel;
