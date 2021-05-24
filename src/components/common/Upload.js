import React, { useRef, useContext } from "react";
import { makeStyles } from "@material-ui/core/";
import Button from "@material-ui/core/Button";
import PublishIcon from "@material-ui/icons/Publish";
import { GrammarContext } from "../context/GrammarContext";

const useStyles = makeStyles((theme) => ({
  fileUploadContainer: {
    "& input[type='file']": {
      display: "none",
    },
    "& button": {
      minWidth: 40,
      width: 40,
      margin: 5,
    },
  },
}));

function Upload(props) {
  const { tabValue } = useContext(GrammarContext);
  const { setValue, type } = props;

  const disabled = tabValue === 0 || type === "usfm" ? false : true;

  const classes = useStyles();
  const fileInput = useRef();
  const allow = type === "usfm" ? ".usfm,.sfm" : ".json";
  const loadText = (e) => {
    var file = e.target.files[0];
    if (!file) {
      return;
    }
    let reader = new FileReader();
    reader.onload = function (e) {
      setValue(e.target.result);
    };
    reader.readAsText(file);
  };
  const openFileDialog = () => {
    fileInput.current.click();
  };

  return (
    <div className={classes.fileUploadContainer}>
      <input ref={fileInput} accept={allow} type="file" onChange={loadText} />
      <Button
        variant="contained"
        color="primary"
        onClick={openFileDialog}
        disabled={disabled}
      >
        <PublishIcon />
      </Button>
    </div>
  );
}

export default Upload;
