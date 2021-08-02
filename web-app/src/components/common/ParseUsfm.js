import { Button } from "@material-ui/core";
import React, { useContext, useEffect, useCallback } from "react";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import Tooltip from "@material-ui/core/Tooltip";
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
  const {
    usfmValue,
    setJsonValue,
    setTabValue,
    alert,
    mode,
    type,
    setType,
    setOpen,
  } = useContext(GrammarContext);
  const parseText = useCallback(() => {
    if (usfmValue === "") {
      return alert("warning", "No USFM Data to Convert");
    }
    setJsonValue("");
    setOpen(true);
    setTabValue(0);
    setTimeout(() => {
      usfmParser();
    }, 500);
    const usfmParser = () => {
      const typeMode = type === "all" ? null : grammar.FILTER.SCRIPTURE;
      try {
        const myUsfmParser =
          mode === "relaxed"
            ? new grammar.USFMParser(usfmValue, grammar.LEVEL.RELAXED)
            : new grammar.USFMParser(usfmValue);
        setJsonValue(
          JSON.stringify(myUsfmParser.toJSON(typeMode), undefined, 2)
        );
      } catch (e) {
        setJsonValue(e.toString());
        alert("error", "Error parsing USFM data");
      }
      setOpen(false);
    };
  }, [alert, mode, setJsonValue, setOpen, setTabValue, type, usfmValue]);

  useEffect(() => {
    if (type === "scripture") {
      parseText();
      setType("all");
    }
  }, [type, setType, parseText]);
  return (
    <div>
      <Tooltip title="Convert">
        <Button
          variant="contained"
          color="primary"
          onClick={parseText}
          endIcon={<KeyboardArrowRightIcon />}
          className={classes.button}
        >
          <span className={classes.buttonText}>Convert</span>
        </Button>
      </Tooltip>
    </div>
  );
}

export default ParseUsfm;
