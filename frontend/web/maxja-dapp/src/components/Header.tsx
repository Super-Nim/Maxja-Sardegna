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
import home from "./assets/home.png";
import buyCrypto from "./assets/buyCrypto.png";
import mintNFT from "./assets/mintNFT.png";
import viewNFTs from "./assets/viewNFT.png";
import homeH from "./assets/homeH.png";
import buyCryptoH from "./assets/buyCryptoH.png";
import mintNFTH from "./assets/mintNFTH.png";
import viewNFTsH from "./assets/viewNFTH.png";
import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import NativeBalance from "./Account/NativeBalance";
import Polygon from "./Account/Polygon";
import MetaMaskOnboarding from "@metamask/onboarding";
import { getEllipsisTxt } from "../helpers/format";
import { useChain, useMoralis } from "react-moralis";

type LinkProps = {
  name: string;
  to: string;
}

const Header = () => {
  const mediaQuery = useMediaQuery("(max-width:1225px)");
  const onboarding = useRef<MetaMaskOnboarding>();
  const { account, authenticate, isAuthenticated, logout } = useMoralis();
  const { switchNetwork, chainId } = useChain();

  
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false)
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
    to: "/view-nfts"}

  ]

  const authenticated = async () => {
    if(!isMetaMaskInstalled) {
      onboarding.current?.startOnboarding()
    }
      try {
        await authenticate();
        window.localStorage.setItem("metamask", "injected");
      } catch (e) {
        console.error(e);
      
  }
}

  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
    
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      setIsMetaMaskInstalled(true);
    } else {
      setIsMetaMaskInstalled(false);
    }
    console.log('ACC: ', account)
  }, [], );

  useEffect(() => {
    //TOOD: UNCOMMENT FOR LIVE DAPP
    // const checkChain = async () => {
    //   if (chainId !== "0x89") {
    //     switchNetwork("0x89");
    //   }
    // }
    //   console.log('chainId: ', chainId);
    // checkChain()

  }, [chainId])



  const list = () => {

    if (!isAuthenticated) {
      return (
        <Box
        sx={{ width: "250px" }}
        role="presentation"
        onClick={() => setDrawer(false)}
        onKeyDown={() => setDrawer(false)}
      >
        <List>
          <ListItem>
            <ListItemButton>
              <ListItemText primary="Connect Wallet" onClick={() => authenticated()}/>
            </ListItemButton>
            </ListItem>
            <Divider/>
          {links.map(
            (link) => (
              <ListItem key={link.name} disablePadding>
                <NavLink to={link.to} style={linkStyleDrawer}>
                <ListItemButton>
                  <ListItemText primary={link.name} sx={{textOverflow: "ellipsis"}} />
                </ListItemButton>
                </NavLink>
              </ListItem>
            )
          )}
        </List>
      </Box>  
      )
    }

    return (
      <Box
      sx={{ width: "250px" }}
      role="presentation"
      onClick={() => setDrawer(false)}
      onKeyDown={() => setDrawer(false)}
    >
      <List>
        <ListItem>
          <ListItemButton>
            <ListItemText primary={getEllipsisTxt(account!)} onClick={() => logout()}/>
          </ListItemButton>
          </ListItem>
          <Divider/>
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
        <Toolbar sx={{ flexWrap: "wrap", justifyContent: "space-evenly" }}>
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
          {/* <NativeBalance /> */}
          <Box display="inline-flex" flexDirection="row" sx={{gap: "10px"}}>
          <Polygon/>
          <Account />
          </Box>
        </Toolbar>
      )}
    </AppBar>
  );
};

export default Header;
