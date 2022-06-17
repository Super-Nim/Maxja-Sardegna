import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Button,
  CardMedia,
} from "@mui/material";
import { Box } from "@mui/system";
import ticket from "../assets/ticket.png";

const minterCard = {
  title: "NFT Minter",
  subheader: "More",
};

const hrStyle = {
  height: 0,
  width: "100%",
  background: "#E2E2E2",
};

const Minter = () => {
  return (
    <Card
      sx={{
        display: "grid",
        justifyItems: "center",
        height: "600px",
        width: "500px",
        borderRadius: "60px !important",
      }}
    >
      <Grid display="flex" alignContent="center">
        <CardHeader
          title={minterCard.title}
          titleTypographyProps={{ paddingLeft: "10px", align: "right" }}
          subheaderTypographyProps={{
            color: "#C5716B",
            align: "center",
            marginLeft: "auto",
          }}
          sx={{ marginRight: "230px", display: "flex", paddingLeft: "30px" }}
        />
        <CardHeader
          title="More"
          titleTypographyProps={{ fontSize: "18px", color: "#C5716B" }}
        >
          More
        </CardHeader>
      </Grid>
      <hr style={hrStyle} />

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
            <CardMedia component="img" image={ticket} width="350"></CardMedia>
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
          MINT NFT
        </Button>
      </CardActions>
    </Card>
  );
};

export default Minter;
