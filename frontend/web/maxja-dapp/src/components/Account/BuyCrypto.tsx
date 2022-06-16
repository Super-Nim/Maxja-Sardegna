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
          boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
          border: "1px solid #e7eaf3",
          borderRadius: "1rem",
          backgroundColor: "white",
        }}
      />
  );
};

export default BuyCrypto;
