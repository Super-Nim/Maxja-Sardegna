import { AppBar, Button, Toolbar, Typography, Link, Grid } from "@mui/material";
import logo from "../assets/MaxjaLogoTransparent.png";
import Account from "./Account/Account";
import home from "../assets/home.png";
import buycrypto from "../assets/buyCrypto.png";
import mintNFT from "../assets/mintNFT.png";
import viewNFTs from "../assets/viewNFT.png";
import homeH from "../assets/homeH.png";
import buyCryptoH from "../assets/buyCryptoH.png";
import mintNFTH from "../assets/mintNFTH.png";
import viewNFTsH from "../assets/viewNFTH.png";
import { useState } from "react";
import { useMoralis } from "react-moralis";

const Header = () => {

  const { signup, user, refetchUserData, enableWeb3} = useMoralis();

  const [onHomeHover, setOnHomeHover] = useState(false); 
  const [onBuyCryptoHover, setOnBuyCryptoHover] = useState(false);
  const [onMintNFTHover, setOnMintNFTHover] = useState(false);
  const [onViewNFTsHover, setOnViewNFTsHover] = useState(false); 


  const logoStyle = {
    width: "200px",
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
              onMouseOver={() => setOnHomeHover(true)} 
              onMouseLeave={() => setOnHomeHover(false)}
            >
              <img src={onHomeHover ? homeH : home} alt="home" style={navImage}/>
              HOME
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{  color: "black", "&:hover": {color: "#D26C68"}, display: "inline-flex", textDecoration: "none", fontSize: "18px", width: "fit-content"}}
              onMouseOver={() => setOnBuyCryptoHover(true)} 
              onMouseLeave={() => setOnBuyCryptoHover(false)}
            >
              <img src={onBuyCryptoHover ? buyCryptoH : buycrypto} alt="home" style={navImage}/>
              BUY CRYPTO
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ color: "black", "&:hover": {color: "#D26C68"},  display: "inline-flex", textDecoration: "none", fontSize: "18px",width: "fit-content"}}
              onMouseOver={() => setOnMintNFTHover(true)} 
              onMouseLeave={() => setOnMintNFTHover(false)}
            >
              <img src={onMintNFTHover ? mintNFTH : mintNFT} alt="home" style={navImage}/>
              MINT NFT
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{  color: "black", "&:hover": {color: "#D26C68"}, display: "inline-flex", textDecoration: "none", fontSize: "18px", width: "fit-content", alignItems: "baseline"}}
              onMouseOver={() => setOnViewNFTsHover(true)} 
              onMouseLeave={() => setOnViewNFTsHover(false)}
            >
              <img src={onViewNFTsHover ? viewNFTsH : viewNFTs} alt="home" style={viewNFTImage}/>
              <span>
              VIEW NFTs
              </span>
            </Link>
          </Grid>
        </nav>

        <Account />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
