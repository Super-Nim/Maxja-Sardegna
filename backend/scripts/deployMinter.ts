// Once enough people have connected/registered their wallets
// I will need the array of wallets from ignacio's server, paste them in here, deploy the contract
async function minter() {
  const MaxjaMinter = await hre.ethers.getContractFactory("MaxjaMinter");
  const usdcAddress = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";
  const whitelist = [
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
  const contract = await MaxjaMinter.deploy(usdcAddress, whitelist);

  await contract.deployed();

  console.log("Maxja Minter deployed to:", contract.address);
}

minter()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
