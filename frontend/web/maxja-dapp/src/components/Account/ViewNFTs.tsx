import { Card, CardActions, CardHeader, CardMedia, Grid } from "@mui/material";
import ticket from "../../assets/ticket.png";

const hrStyle = {
    height: 0,
    width: "320px",
    background: "#E2E2E2",
    border: "1px solid #E2E2E2",
  };
  
const ViewNFTs = () => {
  //TODO: 1. useNFTBalances() =>
  // 2. output image via metadata.image URL

  return (
    <Grid container sx={{ overflowY: "scroll", height: "100%", width: "80%", padding: "10px" }}>
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
        <hr style={hrStyle}/>

        <CardMedia
          component="img"
          image={ticket}
        //   height="300px !important"
        //   width="300px !important"
          sx={{justifySelf: "center", height: "280px !important", width: "280px !important"}}
        ></CardMedia>
        <CardActions sx={{ justifySelf: "center", color: "#C5716B", cursor: "pointer" }}>More</CardActions>
      </Card>
    </Grid>
  );
};

export default ViewNFTs;
