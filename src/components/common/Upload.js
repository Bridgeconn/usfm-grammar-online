import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core/";
import Button from "@material-ui/core/Button";
import PublishIcon from "@material-ui/icons/Publish";

const useStyles = makeStyles((theme) => ({
  fileUploadContainer: {
    "& input[type='file']": {
      display: "none",
    },
    "& button": {
      margin: 5,
    },
  },
}));

function Upload(props) {
  const { setValue } = props;
  const classes = useStyles();
  const fileInput = useRef();
  const allow = props.type === "usfm" ? ".usfm,.sfm" : ".json";
  const loadText = (e) => {
    var file = e.target.files[0];
    if (!file) {
      return;
    }
    let reader = new FileReader();
    reader.onload = function (e) {
      setValue(e.target.result);
      console.log(setValue);
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
        endIcon={<PublishIcon />}
      >
        Upload
      </Button>
    </div>
  );
}

export default Upload;
