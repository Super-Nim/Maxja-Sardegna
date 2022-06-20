import { emptyStatement } from "@babel/types";
import { Card, CardActions, CardHeader, CardMedia, Grid , CircularProgress} from "@mui/material";
import { useEffect, useState } from "react";
import { useNFTBalances } from "react-moralis";
import ticket from "../../assets/ticket.png";

type ResolveCallOptions =
  | {
      status?: string | undefined;
      total?: number | undefined;
      page?: number | undefined;
      page_size?: number | undefined;
      result?:
        | {
            token_address: string;
            token_id: string;
            contract_type: string;
            owner_of: string;
            block_number: string;
            block_number_minted: string;
            token_uri?: string | undefined;
            metadata?: string | undefined;
            synced_at?: string | undefined;
            amount?: string | undefined;
            name: string;
            symbol: string;
          }[]
        | undefined;
    }
  | null
  | undefined;

const hrStyle = {
  height: 0,
  width: "320px",
  background: "#E2E2E2",
  border: "1px solid #E2E2E2",
};


const emptyState = {
  title: "You have no NFTs in your wallet"
}
const ViewNFTs = () => {
  //TODO: 1. useNFTBalances() =>
  // 2. output image via metadata.image URL
  const { getNFTBalances, data, error, isFetching } = useNFTBalances();
  const [balance, setBalance] = useState<ResolveCallOptions>();

  // TODO: component to refetch NFTbalances when a new one enters wallet
  // for now just on render
  useEffect(() => {
    const init = async () => {
      const balance = await getNFTBalances({
        onSuccess: () => {
          console.log("isFetching: ", isFetching);
        },
      });
      setBalance(balance);
      console.log("NFT Balance: ", balance);
    };
    init();
  }, []);

  // const 
  //TODO: add empty state
  if (!balance) {
    return (
      <>
      <CircularProgress/> 
        
      </>
    );
  }

  else if (balance?.result?.length === 0) {
    return (
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
    </Card>

    )
  }

  return (
    <Grid
      container
      sx={{
        overflowY: "scroll",
        height: "100%",
        width: "80%",
        padding: "10px",
      }}
    >
      <Card
        sx={{
          display: "grid",
          justifyContent: "center",
          height: "500px",
          width: "320px",
          borderRadius: "60px !important",
          boxShadow: "0px 0px 6px 10px #00000005",
        }}
      >
        <CardHeader
          title="The Deer"
          titleTypographyProps={{ textAlign: "center" }}
        />
        <hr style={hrStyle} />

        <CardMedia
          component="img"
          image={ticket}
          //   height="300px !important"
          //   width="300px !important"
          sx={{
            justifySelf: "center",
            height: "280px !important",
            width: "280px !important",
          }}
        ></CardMedia>
        <CardActions
          sx={{ justifySelf: "center", color: "#C5716B", cursor: "pointer" }}
        >
          More
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ViewNFTs;
