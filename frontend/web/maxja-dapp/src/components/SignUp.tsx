import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { FormControlLabel, TextField } from "@mui/material";
import "../scss/Home.scss";
import backgroundMaxja from "../assets/backgroundMaxja.png";
import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";


const signupCard = {
  title: "Register for the Maxja NFT Airdrop!",
  description: [
    "20 users included",
    "10 GB of storage",
    "Help center access",
    "Priority email support",
  ],
  buttonText: "Get started",
  buttonVariant: "contained",
};

const SignUp = () => {
  const { signup, user, setUserData, refetchUserData } = useMoralis();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const usernameOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };
  const emailOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const passwordOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUserData({
      username: username,
      email: email,
    });
    console.log(
      "user updated: ",
      user?.getUsername(),
      user?.getEmail(),
      user?._isLinked("metamask")
    );
  };

  useEffect(() => {
    console.log(
      "User updated: ",
      user?.getUsername(),
      user?.getEmail(),
      user?._isLinked("metamask")
    );
  }, [user]);

  return (
    <>
      {/* Hero unit */}
      {/* End hero unit */}
      <Grid
        container
        component="form"
        onSubmit={handleSubmit}
        justifyContent="center"
        sx={{ height: "70vh" }}
      >
        {/* <Grid container spacing={5} alignItems="flex-end" justifyContent="center">         */}
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          sx={{
            display: "grid",
            justifyContent: "center",
            alignSelf: "center",
            height: "50vh",
          }}
        >
          <Card
            sx={{
              display: "grid",
              justifyItems: "center",
              width: "385px",
              borderRadius: "2em",
            }}
          >
            <CardHeader
              title={signupCard.title}
              titleTypographyProps={{ align: "center" }}
              subheaderTypographyProps={{
                align: "center",
              }}
              sx={{}}
            />
            <CardContent>
              <Box
                component="form"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "baseline",
                  mb: 2,
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={12}>
                    <TextField
                      autoComplete="given-name"
                      name="Name"
                      required
                      fullWidth
                      id="Name"
                      label="Name"
                      autoFocus
                      onChange={usernameOnChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      onChange={emailOnChange}
                    />
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
            <CardActions>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  background: "#F69043",
                  "&:hover": {
                    background: "#f7984f",
                  },
                  height: "60px",
                  width: "160px",
                  borderRadius: "5em",
                }}
              >
                Register
              </Button>
            </CardActions>
          </Card>
        </Grid>
        {/* </Grid> */}
      </Grid>
    </>
  );
};

export default SignUp;
