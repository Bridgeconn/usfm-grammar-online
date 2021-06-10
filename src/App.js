import Topbar from "./components/Topbar";
import RightPanel from "./components/RightPanel";
import LeftPanel from "./components/LeftPanel";
import { Grid } from "@material-ui/core";
import GrammarContextProvider from "./components/context/GrammarContext";
import Alert from "./components/common/Alert";
import Loading from "./components/common/Loading";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 75,
  },
  panel1: {
    [theme.breakpoints.down("sm")]: {
      marginBottom: 40,
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: 55,
    },
  },
  panel2: {
    [theme.breakpoints.down("sm")]: {
      marginBottom: 40,
    },
  },
}));

function App() {
  const classes = useStyles();
  return (
    <GrammarContextProvider>
      <Topbar />
      <Grid container className={classes.container} spacing={2}>
        <Grid item xs={12} sm={12} md={6} className={classes.panel1}>
          <LeftPanel />
        </Grid>
        <Grid item xs={12} sm={12} md={6} className={classes.panel2}>
          <RightPanel />
        </Grid>
      </Grid>
      <Alert />
      <Loading />
    </GrammarContextProvider>
  );
}

export default App;
