import { Button } from "@material-ui/core";
import React, { useContext } from "react";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { GrammarContext } from "../context/GrammarContext";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
}));

const grammar = require("usfm-grammar");

function ParseUsfm(props) {
  const classes = useStyles();

  const { usfmValue, setJsonValue, setTabValue, alert, mode } =
    useContext(GrammarContext);
  const [open, setOpen] = React.useState(false);
  const parseText = () => {
    setOpen(true);

    setTabValue(0);

    if (usfmValue === "") {
      return alert("warning", "No Data to Convert");
    }
  };

  React.useEffect(() => {
    const getOutput = async () => {
      const myUsfmParser =
        mode === "relaxed"
          ? new grammar.USFMParser(usfmValue, grammar.LEVEL.RELAXED)
          : new grammar.USFMParser(usfmValue);
      console.log("await start");
      let jsonOutput = await myUsfmParser.toJSON();
      console.log("await mid", open);
      setJsonValue(JSON.stringify(jsonOutput, undefined, 2));
      setOpen(false);
      console.log("await end", open);
    };
    try {
      if (open === true) {
        getOutput();
      }
    } catch (e) {
      setJsonValue(e);
      alert("error", "Error parsing USFM data");
    }
  }, [alert, mode, open, setJsonValue, setOpen, usfmValue]);

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={parseText}
        endIcon={<KeyboardArrowRightIcon />}
      >
        Convert
      </Button>
      <Modal
        open={open}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.container}>
          {console.log(open)}

          <CircularProgress style={{ verticalAlign: "middle" }} />
        </div>
      </Modal>
    </div>
  );
}

export default ParseUsfm;
