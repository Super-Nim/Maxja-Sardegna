import { useMoralis } from "react-moralis";
import { getEllipsisTxt } from "../../helpers/format";
// import Blockie from "../Blockie";
import { Button, Card, Modal } from "antd";
import { useEffect, useState } from "react";
import Address from "./Address";
import { SelectOutlined } from "@ant-design/icons";
import { getExplorer } from "../../helpers/networks";
import Text from "antd/lib/typography/Text";
import { connectors } from "../../helpers/connectors";
import { ChainId } from "../../helpers/networks";
import { AuthenticateOptions } from "react-moralis/lib/hooks/core/useMoralis/_useMoralisAuth";

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
}
const textStyles: React.CSSProperties = {
  color: "#21BF96",
  cursor: "pointer"
}
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
}
const iconStyles: React.CSSProperties = {
  alignSelf: "center",
  fill: "rgb(40, 13, 95)",
  flexShrink: "0",
  marginBottom: "8px",
  height: "30px",
}

function Account() {
  const { authenticate, isAuthenticated, account, chainId, logout, refetchUserData, user, enableWeb3} =
    useMoralis();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      enableWeb3();

    }
    const getUserInfo = async () => {
      if(user && isAuthenticated === true){
          await refetchUserData();
          // let account = await user.get('accounts')[0];
          // setUserAddress(tmp);
      }
      else{
          // setIsLoading(false);
          // return setErrorMessage("You need to be logged in to view this page");
      }
  };
  console.log(isModalVisible)
  setIsModalVisible(false);
  console.log(isModalVisible)
  getUserInfo();

  }, [isAuthenticated])

  if (!isAuthenticated || !account) {
    return (
      <>
        <div onClick={() => setIsAuthModalVisible(true)}>
          <p style={textStyles}>Authenticate</p>
        </div>
        <Modal
          visible={isAuthModalVisible}
          footer={null}
          onCancel={() => setIsAuthModalVisible(false)}
          bodyStyle={{
            padding: "15px",
            fontSize: "17px",
            fontWeight: "500",
          }}
          style={{ fontSize: "16px", fontWeight: "500" }}
          width="340px"
        >
          <div
            style={{
              padding: "10px",
              display: "flex",
              justifyContent: "center",
              fontWeight: "700",
              fontSize: "20px",
            }}
          >
            Connect Wallet
          </div>
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
                    setIsAuthModalVisible(false);
                  } catch (e) {
                    console.error(e);
                  }
                }}
              >
                <img src={icon} alt={title} style={iconStyles} />
                <Text style={{ fontSize: "14px" }}>{title}</Text>
              </div>
            ))}
          </div>
        </Modal>
      </>
    );
  }

  return (
    <>
      <div style={accountStyles} onClick={() => setIsModalVisible(true)}>
        <p style={{ marginRight: "5px",  color: "#21BF96"}}>
          {getEllipsisTxt(account, 6)}
        </p>
        {/* <Blockie currentWallet scale={3} /> */}
      </div>
      <Modal
        visible={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
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
            setIsModalVisible(false);
          }}
        >
          Disconnect Wallet
        </Button>
      </Modal>
    </>
  );
}

export default Account;
