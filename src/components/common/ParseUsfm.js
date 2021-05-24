import { Button } from "@material-ui/core";
import React, { useContext } from "react";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { GrammarContext } from "../context/GrammarContext";

const grammar = require("usfm-grammar");

function ParseUsfm(props) {
  const { usfmValue, setJsonValue, setTsvValue, setCsvValue, alert, mode } =
    useContext(GrammarContext);

  const parseText = () => {
    if (usfmValue === "") {
      return alert("warning", "No Data to Convert");
    }
    const myUsfmParser =
      mode === "relaxed"
        ? new grammar.USFMParser(usfmValue, grammar.LEVEL.RELAXED)
        : new grammar.USFMParser(usfmValue);
    try {
      var jsonOutput = myUsfmParser.toJSON();
      setJsonValue(JSON.stringify(jsonOutput, undefined, 2));
    } catch (e) {
      setJsonValue(e);
      alert("error", "Error parsing USFM data");
    }
    try {
      var csvOutput = myUsfmParser.toCSV();
      setCsvValue(csvOutput);
    } catch (e) {
      setCsvValue(e);
      alert("error", "Error parsing USFM data");
    }
    try {
      var tsvOutput = myUsfmParser.toTSV();
      setTsvValue(tsvOutput);
    } catch (e) {
      setTsvValue(e);
      alert("error", "Error parsing USFM data");
    }
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
