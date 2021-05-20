import React from "react";
import GetAppIcon from "@material-ui/icons/GetApp";
import { Button } from "@material-ui/core";

export default function Download(props) {
  const { value, extension } = props;
  const downloadText = () => {
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
    <Button
      style={{ margin: 5, height: 24, boxSizing: "content-box" }}
      variant="contained"
      color="primary"
      onClick={downloadText}
      endIcon={<GetAppIcon />}
    >
      Download
    </Button>
  );
}
