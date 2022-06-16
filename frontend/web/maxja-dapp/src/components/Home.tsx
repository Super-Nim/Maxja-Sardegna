import { Card, CardHeader, CardMedia, Grid, CardActions, CardContent, Button } from "@mui/material";
import { Box } from "@mui/system";
import { Typography } from "antd";
import bigBuyCrypto from "../assets/bigBuyCrypto.png";
import bigMintNFT from "../assets/bigMintNFT.png";
import bigViewNFTs from "../assets/bigViewNFTs.png";

const Home = () => {

  type cardProps = {
    title: string,
    image: string,
    description: string,
    background: string,
    buttonText: string
  }

    const cards: cardProps[] = [
        {
            title: "BUY CRYPTO",
            image: bigBuyCrypto,
            background: "#741918",
            description: "Get some Funds! /n Purchase at least 1 Matic and $100 USDC to MINT your NFT",
            buttonText: "BUY CRYPTO"
        },
        {
          title: "MINT NFT",
          image: bigMintNFT,
          description: "This NFT is your Ticket to Maxja 2022 also gives you access to a % of discount for accommodation at the Venue!",
          background: "",
          buttonText: "MINT NFT"
        },
        {
          title: "VIEW NFTs",
          image: bigViewNFTs,
          description: "“The Deer” Deer have sharp hearing, vision, and sense of smell. They can see approximately 360 degrees. Because of their potent sensitivity, deer symbolize instincts and intuition.",
          background: "",
          buttonText: "MINT NFTs"
        }
    ]

    return (
        <Grid container justifyContent="center" spacing={2} sx={{gap: "5em"}}>

        {cards.map((card: cardProps) => (
      <Card
      key={card.title}
      sx={{
        display: "grid",
        justifyItems: "center",
        height: "600px",
        width: "385px",
        borderRadius: "60px !important",
      }}
    >
      <Grid display="flex" alignContent="center">
        <CardHeader
          title={card.title}
          titleTypographyProps={{ align: "right" }}
          subheaderTypographyProps={{
            color: "#C5716B",
            align: "center",
            marginLeft: "auto",
          }}
          sx={{ }}
        />
      </Grid>
      <Grid container spacing={2} sx={{height: "200px", width: "200px"}}>
            <CardMedia component="img" image={card.image} height="200px" width="200px" sx={{ background: card.background, borderRadius: "50%"}}></CardMedia>
          </Grid>
      <CardContent sx={{display: "flex", justifyContent: "center"}}>
          <Typography style={{textAlign: "center"}}>{card.description}</Typography>

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
        >
          {card.buttonText}
        </Button>
      </CardActions>
    </Card>
    ))}

        </Grid>
    )

}

export default Home;