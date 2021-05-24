import React, { useState, createContext } from "react";
import PropTypes from "prop-types";

export const GrammarContext = createContext();

const GrammarContextProvider = (props) => {
  const [jsonValue, setJsonValue] = useState("");
  const [usfmValue, setUsfmValue] = useState(
    `\\id hab 45HABGNT92.usfm, Good News Translation, June 2003
\\c 3
\\s1 A Prayer of Habakkuk
\\p
\\v 1 This is a prayer of the prophet Habakkuk:
\\b
\\q1
\\v 2 O \\nd Lord\\nd*, I have heard of what you have done,
\\q2 and I am filled with awe.
\\q1 Now do again in our times
\\q2 the great deeds you used to do.
\\q1 Be merciful, even when you are angry.`
  );
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
