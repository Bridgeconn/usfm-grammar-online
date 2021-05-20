import { Button } from "@material-ui/core";
import React, { useContext } from "react";
// import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import { GrammarContext } from "../context/GrammarContext";

const grammar = require("usfm-grammar");

function ParseJson(props) {
  const { jsonValue, setUsfmValue } = useContext(GrammarContext);
  const parseText = () => {
    const myJsonParser = new grammar.JSONParser(jsonValue);
    var usfmOutput = myJsonParser.toUSFM();
    setUsfmValue(usfmOutput);
  };

  return (
    <div>
      <Button
        style={{ margin: 5 }}
        variant="contained"
        color="primary"
        onClick={parseText}
        startIcon={<KeyboardArrowLeftIcon />}
      >
        To USFM
      </Button>
    </div>
  );
}

export default ParseJson;
