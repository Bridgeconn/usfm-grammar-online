import { Button } from "@material-ui/core";
import React, { useContext } from "react";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import Tooltip from '@material-ui/core/Tooltip';
import { GrammarContext } from "../context/GrammarContext";
import { makeStyles } from "@material-ui/core/styles";

const grammar = require("usfm-grammar");

const useStyles = makeStyles((theme) => ({
  button: {
    margin: 5,
    [theme.breakpoints.down("xs")]: {
      height: 36,
    },
  },
  buttonText: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
}));

function ParseJson() {
  const classes = useStyles();
  const { jsonValue, setUsfmValue, alert, tabValue, setOpen } =
    useContext(GrammarContext);
  const disabled = tabValue === 0 ? false : true;
  const parseText = () => {
    if (jsonValue === "") {
      return alert("warning", "No Data to Convert");
    }
    setUsfmValue("");
    setOpen(true);
    setTimeout(() => {
      jsonParser();
    }, 300);
  };
  const jsonParser = () => {
    try {
      const myJsonParser = new grammar.JSONParser(jsonValue);
      var usfmOutput = myJsonParser.toUSFM();
      setUsfmValue(usfmOutput);
    } catch (e) {
      setUsfmValue(e.toString());
      alert("error", "Error parsing JSON data");
    }
    setOpen(false);
  };
  return (
    <div>
      <Tooltip title="Convert">
        <Button
          variant="contained"
          color="primary"
          onClick={parseText}
          startIcon={<KeyboardArrowLeftIcon />}
          disabled={disabled}
          className={classes.button}
        >
          <span className={classes.buttonText}>Convert</span>
        </Button>
      </Tooltip>
    </div>
  );
}

export default ParseJson;
