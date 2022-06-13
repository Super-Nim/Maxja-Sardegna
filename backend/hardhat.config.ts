import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-ethers';
require('dotenv').config();

module.exports = {
  solidity: "0.8.1",
  defaultNetwork: 'matic',
  networks: {
    matic: {
      url: process.env.ALCHEMY_URL,
      accounts: [process.env.PRIVATE_KEY],
    } 
  }
};
