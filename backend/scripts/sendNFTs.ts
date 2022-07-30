/// @notice this will be a list of REGISTERED users with name + email for the live Dapp
// Immeadiately after, the minter contract will be deployed
const addresses = [
    "0xBDE6a4c4b28046d37179a52266b792A67894BF88",
    "0x4c2eD3a67d771F2c6DC0FAE49999B12A12Dd168B",
    "0xC1484b53eB3A47e2007AE0E910ebB6Cb5eC7000C",
    "0x06C0D071f8666755Ea705aa6F4d12F7B6345B6fD",
];
const existingContractAddr = "0x02b31a30f391658e5bc6831Cef813A506f9e1Af0";

async function sendNFTs() {
  const nft = await hre.ethers.getContractAt("MaxjaAirdrop", existingContractAddr);

  const signer0 = await ethers.provider.getSigner(0);
  const nonce = await signer0.getTransactionCount();
  for(let i = 0; i < addresses.length; i++) {
    const tokenURI = "https://bafkreigwifcp3edbcjnzzhf6ztcd5roy2km356g6667gcxzpzgr3bkob74.ipfs.nftstorage.link/";
    await nft.awardItem(addresses[i], tokenURI,  {
      nonce: nonce + i
    });
  }

  console.log("Minting is complete!");
}

sendNFTs()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });