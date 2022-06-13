// import { HardhatRuntimeEnvironment } from "hardhat/types";

//TODO: low-priority implement TS later
async function main() {
    const MaxjaNFT = await hre.ethers.getContractFactory("MaxjaAirdrop");
    const nft = await MaxjaNFT.deploy();
  
    await nft.deployed();
  
    console.log("Maxja NFT deployed to:", nft.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });