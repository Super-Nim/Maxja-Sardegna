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
      <Link color="inherit" href="http://maxjafestival.com/" rel="noreferrer" target="_blank">
        All rights reserved Maxja Sardegna
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Footer = () => {
  return (
    <Grid container justifyContent="center" flexDirection="column" sx={{ background: "black", height: "15vh" }} >
      <Grid item display="flex" justifyContent="center" sx={{gap: "10px"}}>
          <a href="https://twitter.com/MaxjaSardegna" rel="noreferrer" target="_blank">
          <img src={twitter} alt="twitter"/>
          </a>
          <a href="https://discord.gg/KhdKMyDH" rel="noreferrer" target="_blank">
          <img src={discord} alt="discord" />
          </a >
          <a href="https://www.facebook.com/maxja.sardegna" rel="noreferrer" target="_blank">
          <img src={fbLogo} alt="facebook"/>
          </a>
          <a href="https://www.instagram.com/maxja.sardegna/" rel="noreferrer" target="_blank">
          <img src={insta} alt="insta"/>
          </a>
      </Grid>

      <Copyright />
    </Grid>
  );
};

export default Footer;
