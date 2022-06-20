import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Button,
  CardMedia,
  Alert,
} from "@mui/material";
import { Box } from "@mui/system";
import {
  useWeb3ExecuteFunction,
  Web3ExecuteFunctionParameters,
} from "react-moralis";
import ticket from "../assets/ticket.png";
import { minterAddress, minterABI } from "../minterContract";
import { usdcABI, usdcAddress } from "../usdcContract";
import { useMoralis } from "react-moralis";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const Minter = () => {
  /// @dev useWeb3ExecuteFunction function for write/call methods
  const { data, error, fetch, isFetching } = useWeb3ExecuteFunction();
  const [successDialog, setSuccessDialog] = useState(false);
  const [showMint, setShowMint] = useState(false);
  const { Moralis, account } = useMoralis();
  // TODO: fix contract Rate before deploying to mainnet, here is how
  // const usdcValue = Moralis.Units.Token("100", 18);

  const getWhitelist: Web3ExecuteFunctionParameters = {
    abi: minterABI,
    contractAddress: minterAddress,
    functionName: "getWhitelistLength",
  };

  const approveUSDC: Web3ExecuteFunctionParameters = {
    abi: usdcABI,
    contractAddress: usdcAddress,
    functionName: "approve",
    params: {
      _spender: minterAddress,
      _value: 100,
    },
  };

  const mintNFT: Web3ExecuteFunctionParameters = {
    abi: minterABI,
    contractAddress: minterAddress,
    functionName: "mint",
  };

  const approve = async () => {
    // onSucccess => execute mint() func

    fetch({
      params: approveUSDC,
      onSuccess: () => {
        setShowMint(true);
        // mint();
      },
    });
    setSuccessDialog(true);

    console.log("data: ", data);
    console.log("error: ", error);
    console.log("isFetching: ", isFetching);
  };

  const mint = async () => {
    fetch({
      params: mintNFT,
      onSuccess: (tx: any) => {
        toast.success("Your NFT is minting!");
        return tx.wait().then(() => {
          toast.success("NFT minted!");
        });
      },
    });
  };
  // TODO: need to fetch whitelist
  // create a for loop, each time fetch the whiteList[0], [1], etc - if address !== account --> toast.error() else --> approve USDC
  const isWhitelisted = async () => {

    fetch({
      params: getWhitelist,
      onSuccess: (tx: any) => {
        const isWhitelisted = tx.some((address: string) => {
          return address === account
        })
        if (isWhitelisted) {
          approve();
        } else {
          toast.error("You did not register for the Mandala airdrop");
      }
      },
    });
    console.log('data whitelist: ', data)
    console.log('error whitelist: ', error);
    console.log('isFetching whitelist: ', isFetching);
  };

  return (
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
          title={minterCard.title}
          titleTypographyProps={{ paddingLeft: "10px", align: "right" }}
          // subheaderTypographyProps={{
          //   color: "#C5716B",
          //   align: "center",
          //   marginLeft: "auto",
          // }}
          sx={{ padding: "0", paddingTop: "20px", marginRight: "230px", display: "flex"}}
        />
        <CardHeader
          title="More"
          titleTypographyProps={{ fontSize: "18px", color: "#C5716B" }}
          sx= {{ padding: "0", paddingTop: "20px", cursor: "pointer"}}
        >
          More
        </CardHeader>
      </Grid>
      <hr style={hrStyle} />

      <CardContent>
       
      <CardMedia component="img" image={ticket} width="350"/>
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
            onClick={() => isWhitelisted()}
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
      <ToastContainer />
    </Card>
  );
};

export default Minter;
