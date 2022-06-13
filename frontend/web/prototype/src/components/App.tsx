import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Account from "./Account/Account";
import Chains from "./Chains/Chains";
// import TokenPrice from "components/TokenPrice";
// import ERC20Balance from "components/ERC20Balance";
// import ERC20Transfers from "components/ERC20Transfers";
// import NFTBalance from "components/NFTBalance";
// import Wallet from "components/Wallet";
import { Layout, Tabs } from "antd";
import "antd/dist/antd.css";
// import NativeBalance from "components/NativeBalance";
// this might make things looks weird
import "./style.css";
import FiatOnRamp from "./Account/FiatOnRamp";
import MenuItems from "./MenuItems";
const { Header } = Layout;

const styles = {
  content: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Roboto, sans-serif",
    color: "#041836",
    marginTop: "130px",
    padding: "10px",
  },
  header: {
    position: "fixed",
    zIndex: 1,
    width: "100%",
    background: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Roboto, sans-serif",
    borderBottom: "2px solid rgba(0, 0, 0, 0.06)",
    padding: "0 10px",
    boxShadow: "0 1px 10px rgb(151 164 175 / 10%)",
  },
  headerRight: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    fontSize: "15px",
    fontWeight: "600",
  },
};
const App = () => {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
    useMoralis();

  useEffect(() => {
    const connectorId = window.localStorage.getItem("connectorId");
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
      // TODO: type connectorId
      enableWeb3({ provider: connectorId as any });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  return (
    <div>
      <h1>HIIIII</h1>
    </div>
      // <Header
      //     style={{
      //       position: "fixed",
      //       zIndex: 1,
      //       width: "100%",
      //       background: "#fff",
      //       display: "flex",
      //       justifyContent: "space-between",
      //       alignItems: "center",
      //       fontFamily: "Roboto, sans-serif",
      //       borderBottom: "2px solid rgba(0, 0, 0, 0.06)",
      //       padding: "0 10px",
      //       boxShadow: "0 1px 10px rgb(151 164 175 / 10%)",
      //     }}
      //   >
      //     <MenuItems />
      //     <div style={styles.headerRight}>
      //       <Chains />
      //       {/* <TokenPrice
      //         address="0x1f9840a85d5af5bf1d1762f925bdaddc4201f984"
      //         chain="eth"
      //         image="https://cloudflare-ipfs.com/ipfs/QmXttGpZrECX5qCyXbBQiqgQNytVGeZW5Anewvh2jc4psg/"
      //         size="40px"
      //       /> */}
      //       {/* <NativeBalance /> */}
      //       <Account />
      //     </div>
      //   </Header>

      //   <div style={styles.content}>
      //     {/* <Routes> */}
      //       {/* <Route path="/"> */}
      //         <FiatOnRamp />
      //       {/* </Route> */}
      //       {/* <Route path="/nftBalance">
      //         <NFTBalance />
      //       </Route> */}
      //       {/* <Route path="/nonauthenticated"> */}
      //         <>Please login using the "Authenticate" button</>
      //       {/* </Route> */}
      //     {/* </Routes> */}
      //   </div>

    // <Layout style={{ height: "100vh", overflow: "auto"}}>
    //   {/* <Router> */}
    //     <Header
    //       style={{
    //         position: "fixed",
    //         zIndex: 1,
    //         width: "100%",
    //         background: "#fff",
    //         display: "flex",
    //         justifyContent: "space-between",
    //         alignItems: "center",
    //         fontFamily: "Roboto, sans-serif",
    //         borderBottom: "2px solid rgba(0, 0, 0, 0.06)",
    //         padding: "0 10px",
    //         boxShadow: "0 1px 10px rgb(151 164 175 / 10%)",
    //       }}
    //     >
    //       <MenuItems />
    //       <div style={styles.headerRight}>
    //         <Chains />
    //         {/* <TokenPrice
    //           address="0x1f9840a85d5af5bf1d1762f925bdaddc4201f984"
    //           chain="eth"
    //           image="https://cloudflare-ipfs.com/ipfs/QmXttGpZrECX5qCyXbBQiqgQNytVGeZW5Anewvh2jc4psg/"
    //           size="40px"
    //         /> */}
    //         {/* <NativeBalance /> */}
    //         <Account />
    //       </div>
    //     </Header>

    //     <div style={styles.content}>
    //       {/* <Routes> */}
    //         {/* <Route path="/"> */}
    //           <FiatOnRamp />
    //         {/* </Route> */}
    //         {/* <Route path="/nftBalance">
    //           <NFTBalance />
    //         </Route> */}
    //         {/* <Route path="/nonauthenticated"> */}
    //           <>Please login using the "Authenticate" button</>
    //         {/* </Route> */}
    //       {/* </Routes> */}
    //     </div>
    //   {/* </Router> */}
    // </Layout>
  );
};

export default App;
