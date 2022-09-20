/// @notice this will be a list of REGISTERED users with name + email for the live Dapp
// Immeadiately after, the minter contract will be deployed
const addresses = [
  "0xBDE6a4c4b28046d37179a52266b792A67894BF88",
  "0xbf70074b0b455b199f0244a8cd01a4d8f0649f77",
  "0x1e6920460ea1ddde4e3709bb184bdeaf3d3b83b9",
  "0x49daf3b6db2643dd38795428d5c4031449366f57",
  "0x5d0418d870100058970D2109C34CE9cb81f376cF",
  "0x212ecb0d94994f92a2bafccf2787e493db5f49fd",
  "0x1c0b0566d247c0f409f6595ae671d20b4b3436aa",
  "0x5d0418d870100058970d2109c34ce9cb81f376cf",
  "0x8a5c94653267518A16F6d7182991f434EaD9e558",
];
const existingContractAddr = "0x2A28258751b47f11279C803bb5A63334D1eB3D45";

async function sendNFTs() {
  const nft = await hre.ethers.getContractAt(
    "MaxjaAirdrop",
    existingContractAddr
  );

  const signer0 = await ethers.provider.getSigner(0);
  const nonce = await signer0.getTransactionCount();
  for (let i = 0; i < addresses.length; i++) {
    const tokenURI =
      "https://bafkreigwifcp3edbcjnzzhf6ztcd5roy2km356g6667gcxzpzgr3bkob74.ipfs.nftstorage.link/";
    await nft.sendNFT(addresses[i], tokenURI, {
      nonce: nonce + i,
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
