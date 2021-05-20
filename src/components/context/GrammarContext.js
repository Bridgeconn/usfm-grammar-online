import React, { createContext } from "react";
import PropTypes from "prop-types";

export const GrammarContext = createContext();

const GrammarContextProvider = (props) => {
  const [jsonValue, setJsonValue] = React.useState("");
  const [usfmValue, setUsfmValue] = React.useState("Enter USFM Text");

  return (
    <GrammarContext.Provider
      value={{
        usfmValue: usfmValue,
        setUsfmValue: setUsfmValue,
        jsonValue: jsonValue,
        setJsonValue: setJsonValue,
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
