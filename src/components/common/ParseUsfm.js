import { Button } from "@material-ui/core";
import React, { useContext } from "react";
// import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { GrammarContext } from "../context/GrammarContext";

const grammar = require("usfm-grammar");

function ParseUsfm(props) {
  const { usfmValue, setJsonValue } = useContext(GrammarContext);
  const parseText = () => {
    const myUsfmParser = new grammar.USFMParser(usfmValue);
    var jsonOutput = myUsfmParser.toJSON();
    setJsonValue(JSON.stringify(jsonOutput, undefined, 2));
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
