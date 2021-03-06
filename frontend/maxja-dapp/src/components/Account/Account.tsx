import { useMoralis } from "react-moralis";
import { getEllipsisTxt } from "../../helpers/format";
// import Blockie from "../Blockie";
import { useEffect, useState } from "react";
import Address from "./Address";
import { SelectOutlined } from "@ant-design/icons";
import { getExplorer } from "../../helpers/networks";
import { connectors } from "../../helpers/connectors";
import { ChainId } from "../../helpers/networks";
import { AuthenticateOptions } from "react-moralis/lib/hooks/core/useMoralis/_useMoralisAuth";
import {
  Card,
  CardContent,
  Dialog as MuiDialog,
  DialogProps as MuiDialogProps,
  DialogTitle,
  Grid,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import { Box } from "@mui/system";
import { userInfo } from "os";


const accountStyles = {
  height: "42px",
  padding: "0 15px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "fit-content",
  borderRadius: "12px",
  backgroundColor: "rgb(244, 244, 244)",
  cursor: "pointer",
  marginRight: "20px",
};
const textStyles: React.CSSProperties = {
  color: "#21BF96",
  cursor: "pointer",
};
const connectorStyles: React.CSSProperties = {
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  height: "auto",
  justifyContent: "center",
  marginLeft: "auto",
  marginRight: "auto",
  padding: "20px 5px",
  cursor: "pointer",
};
const iconStyles: React.CSSProperties = {
  alignSelf: "center",
  fill: "rgb(40, 13, 95)",
  flexShrink: "0",
  marginBottom: "8px",
  height: "30px",
};

function Account() {
  const {
    authenticate,
    isAuthenticated,
    account,
    chainId,
    logout,
    refetchUserData,
    user,
    enableWeb3,
    setUserData
  } = useMoralis();
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [isAuthDialogVisible, setIsAuthDialogVisible] = useState(false);


  useEffect(() => {
    const refetch = async () => {
      if (isAuthenticated) {
        enableWeb3();
        console.log(isAuthenticated, account, user)
      }
    }
    refetch();

  }, [isAuthenticated])
  if (!isAuthenticated || !account) {
    return (
      <>
        <div onClick={async () => {
            try {
              await authenticate();
              window.localStorage.setItem("metamask", "injected");
              setIsDialogVisible(false);
              console.log('USER authenticated via sign up: ', user, isAuthenticated, account)
            } catch (e) {
              console.error(e);
            }
           }}>
          <p style={textStyles}>Connect Wallet</p>
        </div>
        {/* 
        Code for multiple wallets, will stick to MetaMask for now
        <MuiDialog open={isAuthDialogVisible} onClose={() => setIsAuthDialogVisible(false)}>
          <div>
            <DialogTitle sx={{ textAlign: "center" }}>
              Connect Wallet
            </DialogTitle>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
              {connectors.map(({ title, icon, connectorId }, key) => (
                <div
                  style={connectorStyles}
                  key={key}
                  onClick={async () => {
                    try {
                      // TODO: this may break/cause issues as I removed params, confirm later once implemented
                      await authenticate(connectorId as AuthenticateOptions);
                      window.localStorage.setItem("connectorId", connectorId);
                      setIsAuthDialogVisible(false);
                      console.log('wallet logged in: ', user)
                    } catch (e) {
                      console.error(e);
                    }
                  }}
                >
                  <img src={icon} alt={title} style={iconStyles} />
                  <Typography style={{ fontSize: "14px" }}>{title}</Typography>
                </div>
              ))}
            </div>
          </div>
        </MuiDialog> */}
       
      </>
    );
  }

  return (
    <>
      <Card onClick={() => setIsDialogVisible(true)} sx={{borderRadius: "60px !important", cursor: "pointer"}}>
        <CardContent sx={{display: "flex", alignItems: "center",  pb: 0, "&:last-child": { pb: "10px"}, padding: "10px",}}> 
          <Address
            avatar="left"
            size={6}
            copyable
            style={{ fontSize: "20px" }}
          />
        </CardContent>
      </Card>
      <MuiDialog open={isDialogVisible} onClose={() => setIsDialogVisible(false)} sx={{}}>
        <Grid justifyContent="center" sx={{width: "30vw"}}>
          <DialogTitle>
            Account
          </DialogTitle>
          <Card>
            <CardContent>
            <Address
            avatar="left"
            size={6}
            copyable
            style={{ fontSize: "20px" }}
          />
          <div style={{ marginTop: "10px", padding: 0 }}>
            <a
              href={`${getExplorer(chainId as ChainId)}/address/${account}`}
              target="_blank"
              rel="noreferrer"
            >
              <SelectOutlined style={{ marginRight: "5px" }} />
              View on Explorer
            </a>
          </div>

            </CardContent>
          </Card>
          <Box display="flex" justifyContent="center">
          <Button
          variant="contained"
          style={{
            width: "80%",
            marginTop: "10px",
            marginBottom: "10px",
            borderRadius: "0.5rem",
            fontSize: "16px",
            fontWeight: "500",
          }}
          onClick={async () => {
            await logout();
            window.localStorage.removeItem("connectorId");
            setIsDialogVisible(false);
          }}
        >
          Disconnect Wallet
        </Button>
        </Box>
        </Grid>
      </MuiDialog>
      {/* <div style={accountStyles} onClick={() => setIsDialogVisible(true)}>
        <p style={{ marginRight: "5px",  color: "#21BF96"}}>
          {getEllipsisTxt(account, 6)}
        </p>
        {/* <Blockie currentWallet scale={3} /> 
      </div>
      <Dialog
        visible={isDialogVisible}
        footer={null}
        onCancel={() => setIsDialogVisible(false)}
        bodyStyle={{
          padding: "15px",
          fontSize: "17px",
          fontWeight: "500",
        }}
        style={{ fontSize: "16px", fontWeight: "500" }}
        width="400px"
      >
        Account
        <Card
          style={{
            marginTop: "10px",
            borderRadius: "1rem",
          }}
          bodyStyle={{ padding: "15px" }}
        >
          <Address
            avatar="left"
            size={6}
            copyable
            style={{ fontSize: "20px" }}
          />
          <div style={{ marginTop: "10px", padding: "0 10px" }}>
            <a
              href={`${getExplorer(chainId as ChainId)}/address/${account}`}
              target="_blank"
              rel="noreferrer"
            >
              <SelectOutlined style={{ marginRight: "5px" }} />
              View on Explorer
            </a>
          </div>
        </Card>
        <Button
          size="large"
          type="primary"
          style={{
            width: "100%",
            marginTop: "10px",
            borderRadius: "0.5rem",
            fontSize: "16px",
            fontWeight: "500",
          }}
          onClick={async () => {
            await logout();
            window.localStorage.removeItem("connectorId");
            setIsDialogVisible(false);
          }}
        >
          Disconnect Wallet
        </Button>
      </Dialog> */}
    </>
  );
}

export default Account;
