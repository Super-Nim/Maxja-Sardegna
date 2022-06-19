// import { HardhatRuntimeEnvironment } from "hardhat/types";

const hre = require("hardhat");
const ethers = require("hardhat");

async function airdrop() {
    const MaxjaAirdrop = await hre.ethers.getContractFactory("MaxjaAirdrop");
    const contract = await MaxjaAirdrop.deploy();
  
    await contract.deployed();
  
    console.log("Mandala NFT deployed to:", contract.address);
  }
  
  airdrop()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });