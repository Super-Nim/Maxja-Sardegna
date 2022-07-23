import {
  Card,
  CardHeader,
  CardMedia,
  Grid,
  CardActions,
  CardContent,
  Button,
  Typography,
  SvgIconTypeMap,
} from "@mui/material";
import { useNavigate } from "react-router";
import bigMintNFT from "../assets/bigMintNFT.png";
import bigViewNFTs from "../assets/bigViewNFTs.png";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LocalActivityOutlinedIcon from "@mui/icons-material/LocalActivityOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import "../scss/Home.scss";
import { CSSProperties } from "@mui/material/styles/createMixins";

const Home = () => {
  const navigate = useNavigate();

  type cardProps = {
    title: string;
    image: any;
    description: string;
    background: string;
    buttonText: string;
    to: "/buy-crypto" | "/mint-nft" | "/view-nfts";
  };

  const svgProps: CSSProperties = {
    // position: "relative",
    // top: "45px",
    // left: "45px",
    fontSize: "120px",
    color: "white",
  };

  const cards: cardProps[] = [
    {
      title: "BUY CRYPTO",
      image: <ShoppingCartOutlinedIcon sx={ svgProps } />,
      background: "#741918",
      description:
        "Get some Funds! Purchase $167 USDC to MINT your NFT. Remember to have at least 1 MATIC for gas fees!",
      buttonText: "BUY CRYPTO",
      to: "/buy-crypto",
    },
    {
      title: "MINT NFT",
      image: <LocalActivityOutlinedIcon sx={ svgProps }/>,
      description:
        "This NFT is your Ticket to the Maxja Festival 2022, and also gives you access to a 10% discount for accommodation at the Venue!",
      background: "#F69043",
      buttonText: "MINT NFT",
      to: "/mint-nft",
    },
    {
      title: "VIEW NFTs",
      image: <ImageOutlinedIcon sx={ svgProps }/>,
      description:
        "View your NFTs! All NFTs you own on the Polygon network will be visible here.",
      background: "#B53848",
      buttonText: "VIEW NFTs",
      to: "/view-nfts",
    },
  ];

  const navigateTo = (to: "/buy-crypto" | "/mint-nft" | "/view-nfts") => {
    if (to === "/buy-crypto") {
      navigate("/buy-crypto", { replace: true });
    } else if (to === "/mint-nft") {
      navigate("/mint-nft", { replace: true });
    } else {
      navigate("/view-nfts", { replace: true });
    }
  };
  //TODO: add media query @1335px width to REMOVE alignContent center
  return (
    <Grid
      container
      className="container-media-query"
      justifyContent="center"
      sx={{
        gap: "5em",
        height: "100%",
        width: "100%",
        overflowY: "scroll",
        padding: "10px",
      }}
    >
      {cards.map((card: cardProps) => (
        <Card
          key={card.title}
          sx={{
            display: "grid",
            justifyItems: "center",
            height: "600px",
            width: "385px",
            borderRadius: "60px !important",
            boxShadow: "0px 0px 6px 10px #00000005",
          }}
        >
          <Grid display="flex" alignContent="center">
            <CardHeader
              title={card.title}
              titleTypographyProps={{ align: "right", fontWeight: "600" }}
              subheaderTypographyProps={{
                color: "#C5716B",
                align: "center",
                marginLeft: "auto",
              }}
              sx={{}}
            />
          </Grid>
          <Grid container spacing={2} sx={{ height: "200px", width: "200px" }}>
              <CardMedia
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "200px",
                  width: "200px",
                  background: card.background,
                  borderRadius: "50%",
                }}
              >
                {card.image}
              </CardMedia>
          </Grid>
          <CardContent sx={{ display: "flex", justifyContent: "center" }}>
            <Typography style={{ textAlign: "center" }}>
              {card.description}
            </Typography>
          </CardContent>
          <CardActions>
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
              onClick={() => navigateTo(card.to)}
            >
              {card.buttonText}
            </Button>
          </CardActions>
        </Card>
      ))}
    </Grid>
  );
};

export default Home;
