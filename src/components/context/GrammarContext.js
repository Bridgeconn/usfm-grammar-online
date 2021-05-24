import React, { useState, createContext } from "react";
import PropTypes from "prop-types";

export const GrammarContext = createContext();

const GrammarContextProvider = (props) => {
  const [jsonValue, setJsonValue] = useState("");
  const [usfmValue, setUsfmValue] = useState("");
  const [csvValue, setCsvValue] = useState("");
  const [tsvValue, setTsvValue] = useState("");
  const [tabValue, setTabValue] = useState(0);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState(false);
  const [mode, setMode] = useState("strict");

  const alert = (severity, message) => {
    setMessage(message);
    setSeverity(severity);
  };

  return (
    <GrammarContext.Provider
      value={{
        tabValue: tabValue,
        setTabValue: setTabValue,
        usfmValue: usfmValue,
        setUsfmValue: setUsfmValue,
        jsonValue: jsonValue,
        setJsonValue: setJsonValue,
        csvValue: csvValue,
        setCsvValue: setCsvValue,
        tsvValue: tsvValue,
        setTsvValue: setTsvValue,
        message: message,
        setMessage: setMessage,
        severity: severity,
        alert: alert,
        mode: mode,
        setMode: setMode,
      }}
    >
      {props.children}
    </GrammarContext.Provider>
  );
};

GrammarContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GrammarContextProvider;
