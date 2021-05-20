import Topbar from "./components/Topbar";
import RightPanel from "./components/RightPanel";
import LeftPanel from "./components/LeftPanel";
import { Grid } from "@material-ui/core";

function App() {
  return (
    <>
      <Topbar />

      <Grid container style={{ marginTop: 75 }} spacing={2}>
        <Grid item md={6}>
          <LeftPanel />
        </Grid>
        <Grid item md={6}>
          <RightPanel />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
