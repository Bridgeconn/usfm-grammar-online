import React, { useContext } from "react";
import CssTextField from "./common/CssTextField";
import Download from "./common/Download";
import Upload from "./common/Upload";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import ParseUsfm from "./common/ParseUsfm";
import Link from "@material-ui/core/Link";

import { GrammarContext } from "./context/GrammarContext";
import { Box, FormControl, InputLabel } from "@material-ui/core";

const LeftPanel = (props) => {
  const { usfmValue, setUsfmValue, mode, setMode } = useContext(GrammarContext);
  const handleTextChange = (event) => {
    setUsfmValue(event.target.value);
  };

  const handleChange = (event) => {
    setMode(event.target.value);
  };

  return (
    <>
      <AppBar position="static" color="default">
        <Toolbar>
          <Box flexGrow={1} display="flex">
            <Link href="https://github.com/ubsicap/usfm" target="_blank">
              <Typography
                style={{
                  marginRight: 20,
                  color: "black",
                }}
                variant="h6"
              >
                USFM
              </Typography>
            </Link>
            <FormControl variant="outlined" style={{ width: 106 }}>
              <InputLabel id="demo-simple-select-outlined-label">
                Mode
              </InputLabel>

              <Select
                style={{ height: 37 }}
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={mode}
                onChange={handleChange}
                label="Mode"
              >
                <MenuItem value="regular">Regular</MenuItem>
                <MenuItem value="relaxed">Relaxed</MenuItem>
              </Select>
            </FormControl>
            <ParseUsfm />
          </Box>
          <Upload setValue={setUsfmValue} type="usfm" />
          <Download extension="usfm" />
        </Toolbar>
      </AppBar>
      <CssTextField
        id="usfmText"
        placeholder="Enter/Upload USFM Text"
        onChange={handleTextChange}
        value={usfmValue}
      />
    </>
  );
};

export default LeftPanel;
