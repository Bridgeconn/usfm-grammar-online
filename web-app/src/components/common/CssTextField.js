import React from "react";
import { TextField } from "@material-ui/core";

export default function CssTextField(props) {
  return (
    <TextField
      InputLabelProps={{
        style: {
          height: "calc(100vh - 195px)",
        },
      }}
      inputProps={{
        style: {
          height: "calc(100vh - 195px)",
          overflow: "auto",
        },
      }}
      style={{
        height: "calc(100vh - 195px)",
        width: "100%",
      }}
      multiline
      variant="outlined"
      {...props}
    />
  );
}
