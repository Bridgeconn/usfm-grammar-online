import React, { useContext } from "react";
import TextField from "@material-ui/core/TextField";
import Download from "./common/Download";
import Upload from "./common/Upload";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import ParseUsfm from "./common/ParseUsfm";
import { GrammarContext } from "./context/GrammarContext";

const LeftPanel = (props) => {
  const { usfmValue, setUsfmValue } = useContext(GrammarContext);
  const handleTextChange = (event) => {
    setUsfmValue(event.target.value);
  };
  const [mode, setMode] = React.useState("strict");

  const handleChange = (event) => {
    setMode(event.target.value);
  };

  return (
    <>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6">USFM</Typography>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={mode}
            onChange={handleChange}
            label="Mode"
          >
            <MenuItem value="strict">Strict</MenuItem>
            <MenuItem value="relaxed">Relaxed</MenuItem>
          </Select>
          <Upload setValue={setUsfmValue} type="usfm" />
          <Download value={usfmValue} extension="usfm" />
          <ParseUsfm />
        </Toolbar>
      </AppBar>
      <TextField
        fullWidth={true}
        id="outlined-multiline-static"
        multiline
        rows={34}
        onChange={handleTextChange}
        value={usfmValue}
        variant="outlined"
      />
    </>
  );
};

export default LeftPanel;
