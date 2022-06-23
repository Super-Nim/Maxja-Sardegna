import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import {
  Dialog as MuiDialog,
  DialogTitle,
  FormControlLabel,
  TextField,
} from "@mui/material";
import "../scss/Home.scss";
import backgroundMaxja from "../assets/backgroundMaxja.png";
import { useMoralis } from "react-moralis";
import { useEffect, useRef, useState } from "react";
import Home from "./Home";
import MetaMask from "../assets/metamaskWallet.png";
import MetaMaskOnboarding from "@metamask/onboarding";
import Onboarding from "@metamask/onboarding";
import { ToastContainer, toast } from 'react-toastify';

const installMetaMaskCard = {
  title: "Please Install MetaMask to use this Dapp"
}

const signupCard = {
  title: "Register for the Mandala NFT Airdrop!",
};

const metamaskStyle = {
  cursor: "pointer",
};

const SignUp = () => {
  const {
    account,
    user,
    setUserData,
    authenticate,
    isAuthenticated,
  } = useMoralis();
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);
  const onboarding = useRef<MetaMaskOnboarding>();

  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const usernameOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };
  const emailOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // try !account if isAuthenticated doesnt work
    if (!isAuthenticated) {
      setIsDialogVisible(true);
    } else {
      setUserData({
        username: username,
        email: email,
      });
      toast.success("Successfully registered!")
      console.log(
        "user updated: ",
        user?.getUsername(),
        user?.getEmail(),
        user?._isLinked("metamask")
      );
    }
  };

  useEffect(() => {
    console.log(
      "User updated: ",
      user?.getUsername(),
      user?.getEmail(),
      user?._isLinked("metamask")
    );
  }, [user]);

  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
    
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      setIsMetaMaskInstalled(true);
    } else {
      setIsMetaMaskInstalled(false);
    }
  }, []);

  if (!isMetaMaskInstalled) {
    return (
      <Grid container justifyContent="center" alignContent="center" sx={{ height: "70vh" }}>
      <Card
        sx={{
          display: "grid",
          justifyItems: "center",
          height: "50vh",
          width: "385px",
          borderRadius: "60px !important",
        }}
      >
        <CardHeader
                title={installMetaMaskCard.title}
                titleTypographyProps={{ align: "center" }}
                subheaderTypographyProps={{
                  align: "center",
                }}
                sx={{}}
        />
        <img src={MetaMask} alt="MetaMask" style={metamaskStyle} onClick={() => onboarding?.current?.startOnboarding()}/>
      </Card>
    </Grid>
    )
  }

  return (
    <>
      {isAuthenticated && user?.getUsername() && user?.getEmail() ? (
        <Home />
      ) : (
        <Grid
          container
          component="form"
          onSubmit={handleSubmit}
          justifyContent="center"
          sx={{ height: "70vh" }}
        >
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
            className="card"
          >
            <Card
              sx={{
                display: "grid",
                justifyItems: "center",
                width: "385px",
                borderRadius: "60px !important",
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
              <ToastContainer/>
            </Card>
          </Grid>
          <MuiDialog
            open={isDialogVisible}
            onClose={() => setIsDialogVisible(false)}
          >
            <Grid
              justifyItems="center"
              sx={{ textAlign: "center", height: "20vh", width: "30vw" }}
            >
              <DialogTitle>
                Please Connect your MetaMask Wallet before registering
              </DialogTitle>
              <img
                src={MetaMask}
                style={metamaskStyle}
                alt="MetaMask"
                onClick={async () => {
                  try {
                    await authenticate();
                    window.localStorage.setItem("metamask", "injected");
                    setIsDialogVisible(false);
                    console.log(
                      "USER authenticated via sign up: ",
                      user,
                      isAuthenticated,
                      account
                    );
                  } catch (e) {
                    console.error(e);
                  }
                }}
              />
            </Grid>
          </MuiDialog>
          {/* </Grid> */}
        </Grid>
      )}
    </>
  );
};

export default SignUp;
