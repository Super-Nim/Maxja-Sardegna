import { Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";

const BuyCrypto = () => {
  const [ramper, setRamper] = useState();
  const { Moralis } = useMoralis();
  useEffect(() => {
    console.log("onramper ", Moralis?.["Plugins"]?.["fiat"]);
    if (!Moralis?.["Plugins"]?.["fiat"]) return;
    async function initPlugin() {
      Moralis.Plugins.fiat
        .buy({}, { disableTriggers: true })
        .then((data: any) => setRamper(data.data));
    }
    initPlugin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Moralis.Plugins, []]);

  return (
      <iframe
        src={ramper}
        title="ramper"
        frameBorder="no"
        allow="accelerometer; autoplay; camera; gyroscope; payment;"
        style={{
          width: "420px",
          height: "625px",
          boxShadow: "0px 0px 6px 10px #00000005",
          border: "1px solid #e7eaf3",
          borderRadius: "60px",
          backgroundColor: "white",
        }}
      />
  );
};

export default BuyCrypto;
