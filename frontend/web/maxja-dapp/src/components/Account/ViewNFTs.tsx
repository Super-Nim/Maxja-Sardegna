import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  Grid,
  CircularProgress,
  Dialog as MuiDialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useMoralis, useNFTBalances } from "react-moralis";
import MetaMask from "../../assets/metamaskWallet.png";

type ISetInfoProps = {
  index: number;
};

type IMetadata = {
  name?: string;
  image?: string;
  description?: string;
};

type GetNFTExternalMetaForContractDto = {
  chainId: number;
  contractAddress: string;
  tokenId: string;
};

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

const metamaskStyle = {
  cursor: "pointer",
};

const hrStyle = {
  height: 0,
  width: "320px",
  background: "#E2E2E2",
  border: "1px solid #E2E2E2",
};

const emptyState = {
  emptyWallet: "You have no NFTs in your wallet",
  notAuthenticated: "Please connect your wallet to view your NFTs",
};
const ViewNFTs = () => {
  const { getNFTBalances, data, error, isFetching } = useNFTBalances();
  const { authenticate, account } = useMoralis();
  // const [covalentApi, setCovalentApi] = useState<any>();
  const [balance, setBalance] = useState<ResolveCallOptions>();
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [currentMetadata, setCurrentMetadata] = useState<any>();

  const metadata: IMetadata[] = [];
  // TODO: defined param type for description of current NFT
  const SetInfo = (index: ISetInfoProps | number) => {
    if (!index) {
      return;
    }
    console.log('INDEX SELECTED: ', index)
    const selected = metadata[index as number];
    console.log("SELECTED: ", selected)
    setCurrentMetadata(selected);
    setIsInfoVisible(true);
  };

  // Need to store each metadata into a state variable --> push as an object into array
  // onClick "more" --> select object by index passed through, dialog will output the name/description

  // TODO: component to refetch NFTbalances when a new one enters wallet
  // for now just on render
  useEffect(() => {
    const init = async () => {
      // if (!Moralis?.["Plugins"]?.["covalent"]) return;
      // // Moralis.initPlugins();
      // // setCovalentApi(Moralis.Plugins.covalent);
      const balance = await getNFTBalances({});
      setBalance(balance);
      if (balance?.result) {
        console.log("NFT Balance: ", balance?.result[2]?.metadata);
      }
    };
    init();
  }, []);

  if (isFetching) {
    return (
      <>
        <CircularProgress />
      </>
    );
  } else if (!account) {
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
          title={emptyState.notAuthenticated}
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
    );
  } else if (balance?.result?.length === 0) {
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
          title={emptyState.emptyWallet}
          titleTypographyProps={{ align: "center" }}
        />
      </Card>
    );
  }

  return (
    <Grid
      container
      justifyContent="center"
      sx={{
        overflowY: "scroll",
        height: "100%",
        width: "80%",
        padding: "10px",
        gap: "5em",
      }}
    >
      {balance &&
        balance.result?.map((nft) => {
          /// @notice convert metadata into JSON obj in loop
          const tokenURI = JSON.parse(nft.metadata as string);
          // SetInfo(tokenURI);
          metadata.push(tokenURI);
          const selected = balance?.result?.indexOf(nft);
          // console.log("metadata.push ", metadata);
          // console.log("indexOf nft: ", balance?.result?.indexOf(nft));
          return (
            <Card
              key={nft.token_id}
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
                title={nft?.name || tokenURI?.name}
                titleTypographyProps={{ textAlign: "center" }}
              />
              <hr style={hrStyle} />

              <CardMedia
                component="img"
                image={tokenURI.image}
                sx={{
                  justifySelf: "center",
                  height: "280px !important",
                  width: "280px !important",
                }}
              ></CardMedia>
              <CardActions
                sx={{
                  justifySelf: "center",
                  color: "#C5716B",
                  cursor: "pointer",
                }}
                onClick={() => SetInfo(selected!)}
              >
                More
              </CardActions>
              <MuiDialog
              className="dialog-media-query"
                open={isInfoVisible}
                onClose={() => setIsInfoVisible(false)}
              >
                <Grid
                  justifyItems="center"
                  sx={{ textAlign: "center", height: "20vh", width: "30vw" }}
                >
                  <DialogTitle>{currentMetadata?.name}</DialogTitle>
                  <DialogContent>{currentMetadata?.description}</DialogContent>
                </Grid>
              </MuiDialog>

              {/* {isInfoVisible ? <SetInfo index={selected}/> : <></> } */}
              {/* {isInfoVisible ? <SetInfo tokenURI={tokenURI}/> : <></>} */}
            </Card>
          );
        })}
      {/* <SetInfo index={0}/> */}
    </Grid>
  );
};

export default ViewNFTs;
