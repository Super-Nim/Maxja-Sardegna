import { Layout } from "antd";
import "../scss/App.scss";
import Account from "./Account/Account";
import FiatOnRamp from "./Account/FiatOnRamp";
import { Grid } from "@material-ui/core";

const { Header, Footer } = Layout;

function App() {
  return (
    <>
    <Header
        style={{
          position: "fixed",
          zIndex: 1,
          width: "100%",
          background: "#610D0E",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: "Roboto, sans-serif",
          borderBottom: "2px solid rgba(0, 0, 0, 0.06)",
          padding: "0 10px",
          boxShadow: "0 1px 10px rgb(151 164 175 / 10%)",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "20px",
            alignItems: "center",
            fontSize: "15px",
            fontWeight: "600",
            margin: 'auto 0 auto auto',
            marginRight: '20px'
          }}
        >
          <Account/>
        </div>
      </Header>
    <Grid
    className="container"
    container
    justifyContent="center"
    alignItems="center"
>
      
      <FiatOnRamp />
    </Grid>
    </>
  );
}

export default App;
