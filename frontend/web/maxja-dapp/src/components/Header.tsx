import {
  AppBar,
  Toolbar,
  Link,
  Grid,
  useMediaQuery,
  List,
  Divider,
  ListItemButton,
  ListItem,
  ListItemText,
  Box,
  SwipeableDrawer
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../assets/MaxjaLogoTransparent.png";
import Account from "./Account/Account";
import home from "../assets/home.png";
import buyCrypto from "../assets/buyCrypto.png";
import mintNFT from "../assets/mintNFT.png";
import viewNFTs from "../assets/viewNFT.png";
import homeH from "../assets/homeH.png";
import buyCryptoH from "../assets/buyCryptoH.png";
import mintNFTH from "../assets/mintNFTH.png";
import viewNFTsH from "../assets/viewNFTH.png";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import NativeBalance from "./Account/NativeBalance";

type LinkProps = {
  name: string;
  to: string;
}

const Header = () => {
  const mediaQuery = useMediaQuery("(max-width:1080px)");
  const [drawer, setDrawer] = useState(false);
  const [onHomeHover, setOnHomeHover] = useState(false);
  const [onBuyCryptoHover, setOnBuyCryptoHover] = useState(false);
  const [onMintNFTHover, setOnMintNFTHover] = useState(false);
  const [onViewNFTsHover, setOnViewNFTsHover] = useState(false);

  const menuIconStyle = {
    cursor: "pointer",
    fontSize: "70px",
    color: "#D26C68",
  };
  const logoStyle = {
    width: "200px",
  };

  const navImage = {
    height: "35%",
  };

  const viewNFTImage = {
    height: "35%",
    marginRight: "1px",
  };

  const linkStyle = {
    textDecoration: "none",
  };

  const linkStyleDrawer = {
    width: "100%",
    textDecoration: "none",

  }

  const links: LinkProps[] = [
    {
      name: "Home",
      to: "/home"
    },
    {name: "Buy Crypto",
      to: "/buy-crypto"},
    {name: "Mint NFT",
      to: "/mint-nft"},
    {name: "View NFTs", 
    to: "viewNFTs"}

  ]

  const list = () => {
    return (
      <Box
        sx={{ width: "250px" }}
        role="presentation"
        onClick={() => setDrawer(false)}
        onKeyDown={() => setDrawer(false)}
      >
        <List>
          {links.map(
            (link) => (
              <ListItem key={link.name} disablePadding>
                <NavLink to={link.to} style={linkStyleDrawer}>
                <ListItemButton>
                  <ListItemText primary={link.name} />
                </ListItemButton>
                </NavLink>
              </ListItem>
            )
          )}
        </List>
      </Box>
    );
  };

  return (
    <AppBar
      className="header-media-query"
      position="static"
      color="default"
      elevation={0}
      sx={{
        display: "grid",
        height: "120px",
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      {mediaQuery ? (
        <Toolbar sx={{ flexWrap: "wrap", justifyContent: "space-between" }}>
          <img src={logo} alt="Maxja Logo" style={logoStyle} />
          <MenuIcon
            style={menuIconStyle}
            onClick={() => setDrawer(true)}
            onKeyDown={() => setDrawer(true)}
              />
              <SwipeableDrawer
              open={drawer}
              onOpen={() => setDrawer(true)}
              onClose={() => setDrawer(false)}
              >
                {list()}
                </SwipeableDrawer>
        </Toolbar>
      ) : (
        <Toolbar sx={{ flexWrap: "wrap", justifyContent: "space-around" }}>
          <img src={logo} alt="Maxja Logo" style={logoStyle} />

          <nav>
            <Grid display="inline-flex" gap="50px" alignItems="center">
              <NavLink to="/home" style={linkStyle}>
                <Link
                  variant="button"
                  color="text.primary"
                  sx={{
                    color: "black",
                    "&:hover": { color: "#D26C68" },
                    display: "inline-flex",
                    textDecoration: "none",
                    fontSize: "18px",
                    width: "fit-content",
                  }}
                  onMouseOver={() => setOnHomeHover(true)}
                  onMouseLeave={() => setOnHomeHover(false)}
                >
                  <img
                    src={onHomeHover ? homeH : home}
                    alt="home"
                    style={navImage}
                  />
                  home
                </Link>
              </NavLink>

              <NavLink to="/buy-crypto" style={linkStyle}>
                <Link
                  variant="button"
                  color="text.primary"
                  href="#"
                  sx={{
                    color: "black",
                    "&:hover": { color: "#D26C68" },
                    display: "inline-flex",
                    textDecoration: "none",
                    fontSize: "18px",
                    width: "fit-content",
                  }}
                  onMouseOver={() => setOnBuyCryptoHover(true)}
                  onMouseLeave={() => setOnBuyCryptoHover(false)}
                >
                  <img
                    src={onBuyCryptoHover ? buyCryptoH : buyCrypto}
                    alt="home"
                    style={navImage}
                  />
                  BUY CRYPTO
                </Link>
              </NavLink>
              <NavLink to="/mint-nft" style={linkStyle}>
                <Link
                  variant="button"
                  color="text.primary"
                  href="#"
                  sx={{
                    color: "black",
                    "&:hover": { color: "#D26C68" },
                    display: "inline-flex",
                    textDecoration: "none",
                    fontSize: "18px",
                    width: "fit-content",
                  }}
                  onMouseOver={() => setOnMintNFTHover(true)}
                  onMouseLeave={() => setOnMintNFTHover(false)}
                >
                  <img
                    src={onMintNFTHover ? mintNFTH : mintNFT}
                    alt="home"
                    style={navImage}
                  />
                  MINT NFT
                </Link>
              </NavLink>
              <NavLink to="/view-nfts" style={linkStyle}>
                <Link
                  variant="button"
                  color="text.primary"
                  href="#"
                  sx={{
                    color: "black",
                    "&:hover": { color: "#D26C68" },
                    display: "inline-flex",
                    textDecoration: "none",
                    fontSize: "18px",
                    width: "fit-content",
                    alignItems: "baseline",
                  }}
                  onMouseOver={() => setOnViewNFTsHover(true)}
                  onMouseLeave={() => setOnViewNFTsHover(false)}
                >
                  <img
                    src={onViewNFTsHover ? viewNFTsH : viewNFTs}
                    alt="home"
                    style={viewNFTImage}
                  />
                  <span>VIEW NFTs</span>
                </Link>
              </NavLink>
            </Grid>
          </nav>
          <NativeBalance />
          <Account />
        </Toolbar>
      )}
    </AppBar>
  );
};

export default Header;
