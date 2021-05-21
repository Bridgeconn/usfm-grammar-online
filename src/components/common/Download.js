import React from "react";
import GetAppIcon from "@material-ui/icons/GetApp";
import { Button, Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

export default function Download(props) {
  const { value, extension } = props;
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const downloadText = () => {
    if (value === "") {
      setOpen(true);
      return;
    }

    const element = document.createElement("a");
    const file = new Blob([value], { type: "text/plain" });
    let bookName = "bible";
    if (extension === "usfm") {
      try {
        bookName = value.split("\n")[0].split("\\id")[1].trim();
      } catch {
        console.log("error parsing bookname in file");
      }
    } else if (extension === "json") {
      try {
        bookName = JSON.parse(value).book.bookCode;
      } catch {
        console.log("error parsing bookname in file");
      }
    }

    element.href = URL.createObjectURL(file);
    element.download = bookName.toLowerCase() + "." + extension;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  return (
    <>
      <Button
        style={{ margin: 5 }}
        variant="contained"
        color="primary"
        onClick={downloadText}
      >
        <GetAppIcon />
      </Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning">
          No Data Available to Download!
        </Alert>
      </Snackbar>
    </>
  );
}
