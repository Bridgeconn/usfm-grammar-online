import React, { createContext, useState, useEffect } from "react";
import { API } from "../../store/api";
import PropTypes from "prop-types";

export const Context = createContext();

const ContextProvider = (props) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    API.get("https://www.api.vachanonline.net/v1/booknames")
      .then((response) => {
        setBooks(
          response.data[0].bookNames.sort((a, b) => a.book_id - b.book_id)
        );
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Context.Provider value={{ books }}>{props.children}</Context.Provider>
  );
};

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextProvider;
