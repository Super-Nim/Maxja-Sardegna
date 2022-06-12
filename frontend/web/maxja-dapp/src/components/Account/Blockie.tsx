import { Skeleton } from "antd";
//TODO: import not working fix later
// import Blockies from "react-blockies";
import { useMoralis } from "react-moralis";

/**
 * Shows a blockie image for the provided wallet address
 * @param {*} props
 * @returns <Blockies> JSX Elemenet
 */

function Blockie(props: any) {
  const { account, isAuthenticated } = useMoralis();
  if (!props.address && (!account || !isAuthenticated))
    return <Skeleton.Avatar active size={40} />;

  // return (
  //   <Blockies
  //     seed={
  //       props.currentWallet
  //         ? account?.toLowerCase()
  //         : props.address.toLowerCase()
  //     }
  //     className="identicon"
  //     {...props}
  //   />
  // );
}

export default Blockie;
