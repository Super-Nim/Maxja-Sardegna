import { Grid } from "@material-ui/core";
import '../scss/Home.scss';
import FiatOnRamp from "./FiatOnRamp";
const Home = () => {

    return (
        <Grid
            className="container"
            container
            justifyContent="center"
            alignItems="center"
        >
            <FiatOnRamp/>

        </Grid>
    )

}

export default Home;