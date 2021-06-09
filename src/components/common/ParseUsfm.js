import { Button } from "@material-ui/core";
import React, { useContext } from "react";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { GrammarContext } from "../context/GrammarContext";
import { makeStyles } from "@material-ui/core/styles";

const grammar = require("usfm-grammar");

const useStyles = makeStyles((theme) => ({
  button: {
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

function ParseUsfm() {
  const classes = useStyles();
  const { usfmValue, setJsonValue, setTabValue, alert, mode, setOpen } =
    useContext(GrammarContext);
  const parseText = () => {
    if (usfmValue === "") {
      return alert("warning", "No USFM Data to Convert");
    }
    setJsonValue("");
    setOpen(true);
    setTabValue(0);
    setTimeout(() => {
      usfmParser();
    }, 500);
  };
  const usfmParser = () => {
    try {
      const myUsfmParser =
        mode === "relaxed"
          ? new grammar.USFMParser(usfmValue, grammar.LEVEL.RELAXED)
          : new grammar.USFMParser(usfmValue);
      setJsonValue(JSON.stringify(myUsfmParser.toJSON(), undefined, 2));
    } catch (e) {
      setJsonValue(e.toString());
      alert("error", "Error parsing USFM data");
    }
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={parseText}
        endIcon={<KeyboardArrowRightIcon />}
        className={classes.button}
      >
        <span className={classes.buttonText}>Convert</span>
      </Button>
    </div>
  );
}

export default ParseUsfm;
