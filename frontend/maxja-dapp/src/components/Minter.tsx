import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Button,
  CardMedia,
  Dialog as MuiDialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import {
  useWeb3ExecuteFunction,
  Web3ExecuteFunctionParameters,
} from "react-moralis";
import ticket from "../assets/ticket.png";
import { minterAddress, minterABI } from "../minterContract";
import { usdcABI, usdcAddress } from "../usdcContract";
import { useMoralis } from "react-moralis";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import MetaMask from "../assets/metamaskWallet.png";
import "react-toastify/dist/ReactToastify.css";
import "../scss/Minter.scss";

const metamaskStyle = {
  cursor: "pointer",
};

const minterCard = {
  title: "NFT Minter",
  subheader: "More",
};

const hrStyle = {
  height: 0,
  width: "100%",
  background: "#E2E2E2",
  border: "1px solid #E2E2E2",
};

const liStyle = {
  listStyleType: "none",
  margin: "10px 0"

}

const ulStyle = {
  padding: 0
}

const emptyState = {
  title: "Please connect your MetaMask before minting"
}

const Minter = () => {
  /// @dev useWeb3ExecuteFunction function for write/call methods
  const { data, error, fetch, isFetching } = useWeb3ExecuteFunction();
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [showMint, setShowMint] = useState(false);
  const { authenticate, account } = useMoralis();
  // TODO: fix contract Rate before deploying to mainnet, here is how
  // const usdcValue = Moralis.Units.Token("100", 18);

  
  // TODO: _value might not work with decimals???
  // try doing ethers.utils.formatEther
  // test value: 100000 = 1x10^5 = 0.1 USDC
  // production value: 167000000 = 167 * 10^6 = 167 USDC
  const approveUSDC: Web3ExecuteFunctionParameters = {
    abi: usdcABI,
    contractAddress: usdcAddress,
    functionName: "approve",
    params: {
      _spender: minterAddress,
      _value: 167000000,
    },
  };

  const mintNFT: Web3ExecuteFunctionParameters = {
    abi: minterABI,
    contractAddress: minterAddress,
    functionName: "mint",
  };

  const approve = async () => {
    fetch({
      params: approveUSDC,
      onSuccess: () => {
        setShowMint(true);
        // mint();
      },
    });

    console.log("data: ", data);
    console.log("error: ", error);
    console.log("isFetching: ", isFetching);
  };

  const mint = async () => {
    fetch({
      params: mintNFT,
      onSuccess: async (tx: any) => {
        toast.success("Your NFT is minting!");
        return tx.wait().then(() => {
          toast.success("NFT minted!");
        });
      },
      onError: (tx: any) => {
          toast.error("You are NOT whitelisted!");
      }
    });
  };

  if (!account) {
    return (
      <Grid container className="empty-nft-media-query">
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
          title={emptyState.title}
          titleTypographyProps={{ align: "center" }}
        />
        <img
          src={MetaMask}
          style={metamaskStyle}
          alt="MetaMask"
          onClick={async () => {
            try {
              await authenticate();
              window.localStorage.setItem("metamask", "injected");
            } catch (e) {
              console.error(e);
            }
          }}
        />
      </Card>
      </Grid>
    );
  } 
 

  return (
    <Grid container className="container-media-query" justifyContent="center" sx={{gap: "5em", height: "100%", width: "100%", overflowY: "scroll", padding: "10px"}}>
    <Card
      sx={{
        display: "grid",
        justifyItems: "center",
        height: "600px",
        width: "500px",
        borderRadius: "60px !important",
        boxShadow: "0px 0px 6px 10px #00000005",
      }}
    >
      <Grid display="flex" alignContent="center">
        <CardHeader
          className="card-header-media-query"
          title={minterCard.title}
          titleTypographyProps={{ paddingLeft: "10px", align: "right" }}
          sx={{
            padding: "0",
            paddingTop: "20px",
            display: "flex",
          }}
        />
        <CardHeader
          title="More"
          titleTypographyProps={{ fontSize: "18px", color: "#C5716B" }}
          sx={{ padding: "0", paddingTop: "20px", cursor: "pointer" }}
          onClick={() => setIsInfoVisible(true)}
        >
          More
        </CardHeader>
      </Grid>
      <hr style={hrStyle} />

      <CardContent>
        <CardMedia component="img" image={ticket} width="350" />
      </CardContent>
      <CardActions>
        {!showMint ? (
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
            onClick={() => approve()}
          >
            Approve USDC
          </Button>
        ) : (
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
            onClick={() => mint()}
          >
            MINT NFT
          </Button>
        )}
      </CardActions>
      <MuiDialog open={isInfoVisible} onClose={() => setIsInfoVisible(false)}>
      <Grid
          justifyItems="center"
          sx={{ textAlign: "center"}}
        >
          <DialogTitle>
          Claim your ticket in just 2 steps!
          </DialogTitle>
          <DialogContent>
           <ul style={ulStyle}>
             <li style={liStyle}>1. Please have $167 USDC in your MetaMask wallet to approve for spending.</li>
             <li style={liStyle}>2. Mint your NFT ticket.</li>
            <li style={liStyle}>Polygon Network enables cheap and fast transactions, so you don't have to worry about expensive gas fees!</li>
            </ul>
          </DialogContent>
        </Grid>
    </MuiDialog>
      <ToastContainer />
    </Card>
    </Grid>
  );

  
};


export default Minter;
