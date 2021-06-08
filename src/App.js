import Topbar from "./components/Topbar";
import RightPanel from "./components/RightPanel";
import LeftPanel from "./components/LeftPanel";
import { Grid } from "@material-ui/core";
import GrammarContextProvider from "./components/context/GrammarContext";
import BottomNav from "./components/BottomNav";
import Alert from "./components/common/Alert";
import Loading from "./components/common/Loading";

function App() {
  return (
    <GrammarContextProvider>
      <Topbar />
      <Grid container style={{ marginTop: 75 }} spacing={2}>
        <Grid item md={6}>
          <LeftPanel />
        </Grid>
        <Grid item md={6}>
          <RightPanel />
        </Grid>
      </Grid>
      <BottomNav />
      <Alert />
      <Loading />
    </GrammarContextProvider>
  );
}

export default App;
