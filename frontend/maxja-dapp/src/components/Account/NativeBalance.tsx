import { useEffect } from "react";
import { useMoralis, useNativeBalance } from "react-moralis";

const NativeBalance = () => {
  const { data: balance } = useNativeBalance({ chain: "mumbai"});
  const { account, isAuthenticated } = useMoralis();

  useEffect(() => {
    console.log('native balance: ', balance)
  }, [])

  if (!account || !isAuthenticated) return null;

  

  return (
    <div style={{ textAlign: "center", whiteSpace: "nowrap" }}>
      {balance.formatted}
    </div>
  );
}

export default NativeBalance;
