import "../scss/LandingPage.scss";
import maxja from "../assets/maxja-desktop.png";
import { Button, Grid } from "@material-ui/core";
import FormInputText from "../FormInputText";
import { useForm } from "react-hook-form";

/// @notice ignore this for now, I was trying to get this centered with the image backgronud, but found a better solution with SignUp.tsx
const LandingPage = () => {
  const methods = useForm({});
  const { handleSubmit, control } = methods;

  return (
    <Grid
      className="container"
      container
      justifyContent="center"
      alignItems="center"
      //   sm={12} md={6} lg={12}
    >
      <Grid
        container
        className="sign-up"
        direction="column"
        justifyContent="center"
        spacing={2}
      >
        <Grid item spacing={2}>
          <FormInputText name="name" control={control} label="Name" />
          <FormInputText name="email" control={control} label="Email" />
          <Button variant="contained">login</Button>
          <h3 className="center-text">Or Sign up</h3>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LandingPage;
