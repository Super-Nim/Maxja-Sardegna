async function minter() {
    const MaxjaMinter = await hre.ethers.getContractFactory("MaxjaMinter");
    const mumbaiUSDCAddress = "0xe11A86849d99F524cAC3E7A0Ec1241828e332C62";
    const whitelist = ["0xBDE6a4c4b28046d37179a52266b792A67894BF88", "0x4c2eD3a67d771F2c6DC0FAE49999B12A12Dd168B"];
    const contract = await MaxjaMinter.deploy(
      mumbaiUSDCAddress,
      whitelist
    );
  
    await contract.deployed();
  
    console.log("Maxja Minter deployed to:", contract.address);
  }
  
  minter()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });