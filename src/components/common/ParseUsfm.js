import { Button } from "@material-ui/core";
import React, { useContext } from "react";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { GrammarContext } from "../context/GrammarContext";

const grammar = require("usfm-grammar");

function ParseUsfm() {
  const { usfmValue, setJsonValue, setTabValue, alert, mode, setOpen } =
    useContext(GrammarContext);
  const parseText = () => {
    if (usfmValue === "") {
      return alert("warning", "No Data to Convert");
    }
    setJsonValue("");
    setOpen(true);
    setTabValue(0);
    setTimeout(() => {
      usfmParser();
    }, 500);
  };
  const usfmParser = () => {
    const myUsfmParser =
      mode === "relaxed"
        ? new grammar.USFMParser(usfmValue, grammar.LEVEL.RELAXED)
        : new grammar.USFMParser(usfmValue);
    try {
      setJsonValue(JSON.stringify(myUsfmParser.toJSON(), undefined, 2));
    } catch (e) {
      setJsonValue(e);
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
      >
        Convert
      </Button>
    </div>
  );
}

export default ParseUsfm;
