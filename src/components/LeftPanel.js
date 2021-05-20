import React from "react";
import TextField from "@material-ui/core/TextField";
import Download from "./common/Download";
import Upload from "./common/Upload";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

const LeftPanel = (props) => {
  const [value, setValue] = React.useState("Enter USFM Text");
  const handleTextChange = (event) => {
    setValue(event.target.value);
  };
  const [mode, setMode] = React.useState("strict");

  const handleChange = (event) => {
    setMode(event.target.value);
  };

  return (
    <div>
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
          <Upload setValue={setValue} />
          <Download value={value} extension="usfm" />
        </Toolbar>
      </AppBar>
      <TextField
        fullWidth="true"
        id="outlined-multiline-static"
        multiline
        rows={34}
        onChange={handleTextChange}
        value={value}
        defaultValue=""
        variant="outlined"
      />
    </div>
  );
};

export default LeftPanel;
