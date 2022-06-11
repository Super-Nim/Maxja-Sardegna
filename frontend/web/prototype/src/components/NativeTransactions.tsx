import React, { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { getEllipsisTxt } from "../helpers/format";
import useNativeTransactions from "../hooks/useFiatSwap";
import "antd/dist/antd.css";
import { Skeleton, Table } from "antd";
import styles from "../scss/FiatStyles";

const NativeTransactions = () => {
  const { nativeTransactions, chainId } = useNativeTransactions('');
  const { Moralis } = useMoralis();
  useEffect(() => {
    console.log(nativeTransactions);
  }, [nativeTransactions]);
  const columns = [
    {
      title: "From",
      dataIndex: "from_address",
      key: "from_address",
      render: (from: string) => getEllipsisTxt(from, 5),
    },
    {
      title: "To",
      dataIndex: "to_address",
      key: "to_address",
      render: (to: string) => getEllipsisTxt(to, 5),
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      render: (value: number) => /// @dev might be Bignumberish/Bignumber instead
        // missing second argument in FromWei, decimals
        parseFloat(Moralis.Units.FromWei(value)).toFixed(6),
    },
    {
      title: "Hash",
      dataIndex: "hash",
      key: "hash",
      render: (hash: string) => (
        <a
          href={
            chainId === "0x1"
              ? `https://etherscan.io/tx/${hash}`
              : chainId === "0x38"
              ? `https://bscscan.com/tx/${hash}`
              : chainId === "0x89"
              ? `https://polygonscan.com/tx/${hash}`
              : `https://explorer.avax.network/search?query=${hash}`
          }
          target="_blank"
          rel="noreferrer"
        >
          View Transaction
        </a>
      ),
    },
  ];

  let key = 0;
  return (
    <div>
      <h1 style={styles.title}>💸Fiat Transactions</h1>
      <Skeleton
        loading={!nativeTransactions || nativeTransactions.length === 0}
      >
        <Table
          dataSource={nativeTransactions}
          columns={columns}
          rowKey={(record) => {
            key++;
            return `${record.transaction_hash}-${key}`;
          }}
        />
      </Skeleton>
    </div>
  );
}

export default NativeTransactions;
