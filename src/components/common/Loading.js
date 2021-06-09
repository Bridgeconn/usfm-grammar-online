import React, { useContext } from "react";
import Modal from "@material-ui/core/Modal";
import { Box } from "@material-ui/core";
import { GrammarContext } from "../context/GrammarContext";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
}));

export default function Loading() {
  const classes = useStyles();
  const { open } = useContext(GrammarContext);
  return (
    <Modal
      open={open}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className={classes.container}>
        <Box
          fontSize="h5.fontSize"
          bgcolor="white"
          p={1}
          px={3}
          borderRadius="5px"
          color="grey"
          border={2}
          borderColor="text.primary"
        >
          Loading ...
        </Box>
      </div>
    </Modal>
  );
}
