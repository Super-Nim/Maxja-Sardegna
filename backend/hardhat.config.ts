import '@typechain/hardhat'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-waffle'
require('dotenv').config();

module.exports = {
  solidity: "0.8.1",
  // defaultNetwork: 'matic',
  networks: {
    hardhat: {
      forking: {
        url: `https://polygon-mainnet.g.alchemy.com/v2/${process.env.MINTER_TEST_KEY}`,
        blockNumber: 29715369
      }
    },
    matic: {
      url: process.env.ALCHEMY_URL,
      accounts: [process.env.PRIVATE_KEY],
    } 
  }
};
