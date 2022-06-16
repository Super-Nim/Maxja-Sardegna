import "../scss/App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router";
import Footer from "./Footer";
import Header from "./Header";
import SignUp from "./SignUp";
import BuyCrypto from "./Account/BuyCrypto";
import Minter from './Minter';
import { Grid } from "@mui/material";

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Header />
      <Grid container justifyContent="center" alignContent="center" className="background">
      <Routes>
        {/* <Route path="*" element={<Navigate to="/home" replace/>} /> */}
        <Route index element={<SignUp/>} />
        <Route path="/home"  element={<SignUp/>} />
        <Route path="/buy-crypto" element={<BuyCrypto/>}/>
        <Route path="/mint-nft" element={<Minter/>}/>
      </Routes>
      </Grid>
      <Footer />
    </div>
    </BrowserRouter>

  );
}

export default App;
