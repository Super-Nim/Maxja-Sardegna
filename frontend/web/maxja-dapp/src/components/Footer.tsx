import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Grid } from "@mui/material";
import discord from "../assets/discord.png";
import fbLogo from "../assets/fblogo.png";
import insta from "../assets/insta.png";
import twitter from "../assets/twitter.png";

function Copyright() {
  return (
    <Typography variant="body2" color="white" align="center" sx={{marginTop: "10px"}}>
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        All rights reserved Maxja Sardegna
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Footer = () => {
  return (
    <Grid container justifyContent="center" flexDirection="column" sx={{ background: "black", height: "20vh" }} >
      <Grid item display="flex" justifyContent="center" sx={{gap: "10px"}}>
          <img src={twitter} alt="twitter" />
          <img src={discord} alt="discord" />
          <img src={fbLogo} alt="facebook"/>
          <img src={insta} alt="insta"/>
      </Grid>

      <Copyright />
    </Grid>
  );
};

export default Footer;
