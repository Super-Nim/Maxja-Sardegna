import { useEffect, useState } from "react";
import {
  useMoralisWeb3Api,
  useMoralisWeb3ApiCall,
  useMoralis,
} from "react-moralis";


const useNativeTransactions = (options: any) => {
  const { account } = useMoralisWeb3Api();
  const { chainId } = useMoralis();
  const [nativeTransactions, setNativeTransactions] = useState<any>();
  const {
    fetch: getNativeTransactions,
    data,
    error,
    isLoading,
  } = useMoralisWeb3ApiCall(account.getTransactions, {
    chain: chainId,
    ...options,
  });

  useEffect(() =>  setNativeTransactions(data?.result), [data]);

  return {
    getNativeTransactions,
    nativeTransactions,
    chainId,
    error,
    isLoading,
  };
};

export default useNativeTransactions;
