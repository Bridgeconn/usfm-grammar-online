import React, { useContext } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import { GrammarContext } from "../context/GrammarContext";

export default function Alert() {
  const { message, severity, setMessage } = useContext(GrammarContext);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setMessage("");
  };
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={Boolean(message)}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <MuiAlert
        elevation={6}
        variant="filled"
        onClose={handleClose}
        severity={severity}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
}
