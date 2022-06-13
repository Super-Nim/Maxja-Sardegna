import '@typechain/hardhat'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-waffle'
require('dotenv').config();

module.exports = {
  solidity: "0.8.1",
  // defaultNetwork: 'matic',
  networks: {
    matic: {
      url: process.env.ALCHEMY_URL,
      accounts: [process.env.PRIVATE_KEY],
    } 
  }
};
