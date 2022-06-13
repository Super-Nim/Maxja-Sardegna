import { AppBar, Button, Toolbar, Typography, Link, Grid } from "@mui/material";
import logo from "../assets/MaxjaLogoTransparent.png";
import Account from "./Account/Account";
import home from "../assets/home.png";
import buycrypto from "../assets/buycrypto.png";
import mintnft from "../assets/mintnft.png";
import viewnfts from "../assets/viewnfts.png";
import homeHover from "../assets/homeHover.png";
import buyCryptoHover from "../assets/buyCryptoHover.png";
import mintNFTHover from "../assets/mintNFTHover.png";
import viewNFTHover from "../assets/viewNFTHover.png";
import { useState } from "react";
import { useMoralis } from "react-moralis";

const Header = () => {

  const { signup, user, refetchUserData, enableWeb3} = useMoralis();

  const [onHomeHover, setOnHomeHover] = useState(false); 
  const [onBuyCryptoHover, setOnBuyCryptoHover] = useState(false);
  const [onMintNFTHover, setOnMintNFTHover] = useState(false);
  const [onViewNFTsHover, setOnViewNFTsHover] = useState(false); 


  const logoStyle = {
    width: "15%",
  };

  const navItemStyle = {
    display: "flex",
    columnGap: "50px,",
  };
  const navImage = {
      height: "35%",
  }

  const viewNFTImage = {
      height: "35%",
      marginTop: "5px",
      marginRight: "1px"
  }

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{
        display: "grid",
        height: "120px",
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar sx={{ flexWrap: "wrap", justifyContent: "space-between" }}>
        <img src={logo} alt="Maxja Logo" style={logoStyle} />

        <nav>
          <Grid display="inline-flex" gap="50px" alignItems="center">
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{  color: "black", "&:hover": {color: "#D26C68"}, display: "inline-flex", textDecoration: "none", fontSize: "18px", width: "fit-content"}}
            //   onMouseOver={() => setOnHomeHover(true)} 
            //   onMouseLeave={() => setOnHomeHover(false)}
            >
              <img src={onHomeHover ? homeHover : home} alt="home" style={navImage}/>
              HOME
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{  color: "black", "&:hover": {color: "#D26C68"}, display: "inline-flex", textDecoration: "none", fontSize: "18px", width: "fit-content"}}
            //   onMouseOver={() => setOnBuyCryptoHover(true)} 
            //   onMouseLeave={() => setOnBuyCryptoHover(false)}
            >
              <img src={onBuyCryptoHover ? buyCryptoHover : buycrypto} alt="home" style={navImage}/>
              BUY CRYPTO
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ color: "black", "&:hover": {color: "#D26C68"},  display: "inline-flex", textDecoration: "none", fontSize: "18px",width: "fit-content"}}
            >
              <img src={mintnft} alt="home" style={navImage}/>
              MINT NFT
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{  color: "black", "&:hover": {color: "#D26C68"}, display: "inline-flex", textDecoration: "none", fontSize: "18px", width: "fit-content"}}
            >
              <img src={viewnfts} alt="home" style={viewNFTImage}/>
              VIEW NFTs
            </Link>
          </Grid>
        </nav>

        <Account />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
