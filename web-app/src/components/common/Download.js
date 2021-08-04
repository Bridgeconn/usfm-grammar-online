import React, { useState, useContext } from "react";
import GetAppIcon from "@material-ui/icons/GetApp";
import { Button, Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { GrammarContext } from "../context/GrammarContext";
import Tooltip from '@material-ui/core/Tooltip';

export default function Download(props) {
  const { csvValue, jsonValue, usfmValue, tsvValue, alert } =
    useContext(GrammarContext);

  const { extension } = props;
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const downloadText = () => {
    let value = "";
    if (extension === "usfm") {
      value = usfmValue;
    } else if (extension === "json") {
      value = jsonValue;
    } else if (extension === "csv") {
      value = csvValue;
    } else if (extension === "tsv") {
      value = tsvValue;
    }
    if (value === "") {
      setOpen(true);
      return;
    }

    const element = document.createElement("a");
    const file = new Blob([value], { type: "text/plain" });
    let bookName = "bible";
    if (extension === "usfm") {
      try {
        bookName = value.split("\n")[0].split("\\id")[1].trim().split(" ")[0];
      } catch {
        alert("warning", "Error parsing bookname in file");
      }
    } else if (extension === "json") {
      try {
        bookName = JSON.parse(value).book.bookCode;
      } catch {
        alert("warning", "Error parsing bookname in file");
      }
    } else if (extension === "csv") {
      try {
        bookName = value.split("\n")[1].split(",")[0].replace(/"/g, "");
      } catch {
        alert("warning", "Error parsing bookname in file");
      }
    } else if (extension === "tsv") {
      try {
        bookName = value.split("\n")[1].split("\t")[0].replace(/"/g, "");
      } catch {
        alert("warning", "Error parsing bookname in file");
      }
    }

    element.href = URL.createObjectURL(file);
    element.download = bookName.toLowerCase() + "." + extension;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  return (
    <>
      <Tooltip title="Download file">
        <Button
          style={{ margin: 5, minWidth: 40, width: 40 }}
          variant="contained"
          color="primary"
          onClick={downloadText}
        >
          <GetAppIcon />
        </Button>
      </Tooltip>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning">
          No Data Available to Download!
        </Alert>
      </Snackbar>
    </>
  );
}
