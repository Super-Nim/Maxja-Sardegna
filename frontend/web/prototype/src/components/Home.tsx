import { Grid } from "@material-ui/core";
import "../scss/Home.scss";
import FiatOnRamp from "./Account/FiatOnRamp";
import NativeTransactions from "./NativeTransactions";
const Home = () => {
  return (
    <Grid
      className="container"
      container
      justifyContent="center"
      alignItems="center"
    >
      <FiatOnRamp />

    </Grid>
  );
};

export default Home;
