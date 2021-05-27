import { Button } from "@material-ui/core";
import React, { useContext } from "react";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import { GrammarContext } from "../context/GrammarContext";

const grammar = require("usfm-grammar");

function ParseJson(props) {
  const { jsonValue, setUsfmValue, alert, tabValue } =
    useContext(GrammarContext);
  const disabled = tabValue === 0 ? false : true;
  const parseText = () => {
    if (jsonValue === "") {
      return alert("warning", "No Data to Convert");
    }
    const myJsonParser = new grammar.JSONParser(jsonValue);
    try {
      var usfmOutput = myJsonParser.toUSFM();
      setUsfmValue(usfmOutput);
    } catch (e) {
      setUsfmValue(e);
      alert("error", "Error parsing JSON data");
    }
  };

  return (
    <div>
      <Button
        style={{ margin: 5 }}
        variant="contained"
        color="primary"
        onClick={parseText}
        startIcon={<KeyboardArrowLeftIcon />}
        disabled={disabled}
      >
        Convert
      </Button>
    </div>
  );
}

export default ParseJson;
