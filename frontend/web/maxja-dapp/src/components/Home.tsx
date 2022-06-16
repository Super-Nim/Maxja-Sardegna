import { Card, CardHeader, CardMedia, Grid, CardActions, CardContent, Button } from "@mui/material";
import { Box } from "@mui/system";

const Home = () => {

    const cardProps = [
        {
            title: "Buy Crypto",
            image: "",
            description: "Get some Funds! /n Purchase at least 1 Matic and $100 USDC to MINT your NFT",
            buttonText: "Buy Crypto"
        }
    ]

    return (
        <>
        <Card
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
          title={cardProps[0].title}
          titleTypographyProps={{ align: "right" }}
          subheaderTypographyProps={{
            color: "#C5716B",
            align: "center",
            marginLeft: "auto",
          }}
          sx={{ }}
        />
      </Grid>
      <CardContent>
        <Box
          component="form"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "baseline",
            mb: 2,
          }}
        >
          <Grid container spacing={2}>
            <CardMedia component="img" image={cardProps[0].image} width="350"></CardMedia>
          </Grid>
        </Box>
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
          {cardProps[0].buttonText}
        </Button>
      </CardActions>
    </Card>

        </>
    )

}

export default Home;