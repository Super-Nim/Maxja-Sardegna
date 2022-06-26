# Solidity 

The Solidty smart contracts are included in the /contracts directory.

The contracts used are:

1. MaxjaAirdrop
2. MaxjaMinter

## MaxjaAirdrop.sol

This contract inherits ERC721, as each NFT will serve as an immutable identity for the maxja community member that holds it.

This NFT is limited to the amount of people that register with ther name/email + MetaMask wallet in the Dapp.

The contract is deployed by the Maxja founder, Ignacio, and the following occurs:

1. Token Id is increment via Counters library
2. The Mandala NFT is minted, its token ID and URI is set
3. The receiver's address is included in a "isVerified" mapping, to be whitelisted for the incoming minter contract

```javascript
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MaxjaAirdrop is ERC721URIStorage, Ownable {
    /// @notice use Counter library to track and increment NFT IDs
    using Counters for Counters.Counter;
    Counters.Counter private tokenIds;
    /// @notice whitelist each recipient of the NFT
    mapping(address => bool) public isVerified;
    /// @notice the name and symbol are defined here
    constructor() ERC721("The Mandala", "MND") {}
    /// @notice will be called by a deployment script to airdrop NFTs individually
    function sendNFT(address to, string memory tokenURI)
        onlyOwner()
        public
        returns (uint256)
    {
        tokenIds.increment();

        uint256 nftId = tokenIds.current();
        _mint(to, nftId);
        _setTokenURI(nftId, tokenURI);
        isVerified[to] = true;

        return nftId;
    }
}
```
## Minter.sol

This contract inherits ERC1155, as all ticket NFTs serve the same functionality and are not unique.

```javascript
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MaxjaMinter is ERC1155, Ownable {
    /// @notice use Counter library to track and increment NFT IDs
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    /// @notice define a name and symbol for etherscan to interpret
    string public name = "The Deer";
    string public symbol = "TDR";
    /// @notice ticket rate; USDC is in decimals of 6 NOT 18
    uint256 public rate = 167 * 10 ** 6;
    /// @notice whitelisted address from MaxjaAirdrop are stored here;
    address[] public whitelist;
    /// @notice IERC20 type-casted variable for the USDC, to access it's ERC-20 methods
    IERC20 public tokenAddress;

    /// @notice Whitelisted addresses and NFT metadata passed in constructor
    constructor(address _tokenAddress, address[] memory _whitelist) ERC1155("https://bafkreiaq4h3l6amwzspgaaazsybuunnu6lktatuq4pgrvk2xxyoxlnci6u.ipfs.nftstorage.link/") {
        tokenAddress = IERC20(_tokenAddress);
        whitelist = _whitelist;
    }
    /// @notice default mint func; only whitelisted addresses can mint
    function mint() public {
        require(_isWhitelisted(whitelist) == true, "You are not whitelisted");
        tokenAddress.transferFrom(msg.sender, address(this), rate);
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _mint(msg.sender, tokenId, 1, "");
    }
    /// @notice check how much this contract can spend on the USDC's contract's behalf
    function getAllowance() external view returns (uint256) {
        return tokenAddress.allowance(msg.sender, address(this));
    }  
    /// @notice get USDC balance of whoever calls; used in test scripts
    function getUsdcBalance() external view returns (uint256) {
        return tokenAddress.balanceOf(msg.sender);
    }
    /// @notice enables owner to withdraw USDC 
    function withdrawUsdc() public onlyOwner {
        tokenAddress.transfer(msg.sender, tokenAddress.balanceOf(address(this)));
    }
    /// @notice check if the user is whitelisted before minting
    function _isWhitelisted(address[] memory _whitelist) internal view returns(bool) {
        for (uint16 i = 0; i < _whitelist.length; i++) {
            if (_whitelist[i] == msg.sender) {
                return true;
            }
        }
        return false;
    }
}

```

# Hardhat

The smart contracts were written on remix, but tested and deployed, on Hardhat.

Head over to the [test](https://github.com/Super-Nim/Maxja-Sardegna/tree/main/backend/test) folder to view the unit tests. They are written in TypeScript to enable secure and fluent testing.

## testAirdrop.ts

The [testAirdrop](https://github.com/Super-Nim/Maxja-Sardegna/blob/main/backend/test/testAirdrop.ts) uses a linear testing sequence as it only has one relevant function in the contract.


## testMinter.ts

The [testMinter](https://github.com/Super-Nim/Maxja-Sardegna/blob/main/backend/test/testMinter.ts) is more complex and implements **mainnet forking**, a more involved **beforeEach()** hook, and **fixtures**.

### Mainnet forking

This contract uses Hardhat's **mainnet forking** feature for a few reasons:

1. Using USDC, an ERC-20 token, required "real" USDC to be transferred from an account. 
2. Instead of creating a mock contract, it was faster to emulate a USDC whale and transfer the exact amount to an account for testing

The **beforeEach()** hook 

```typescript
await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [USDC_WHALE],
      });

```

3. a signer object is defined and used to transfer $167 of USDC (167 x 10**6) to the test account (acc1Address)
```typescript
let whaleSigner = ethers.provider.getSigner(USDC_WHALE);

    /// @notice get usdc contract's address and pass to MaxjaMaxjaMinter contract
    /// @dev ERC1155's constructor arg is HARD CODED into MaxjaMaxjaMinter contract, no need to pass through in testing
    usdcContract = await ethers.getContractAt(
      IERC20_SOURCE,
      USDC_ADDRESS,
      whaleSigner
    );

    /// @dev can check whale balance => await usdcContract.connect(whaleSigner).balanceOf(whaleSigner._address);
    /// @notice fund acc1 with USDC from whale's wallet.
    usdcAddress = usdcContract.address;
    await usdcContract
      .connect(whaleSigner)
      .transfer(acc1Address, usdcAmount)
    /// @notice balance of acc1 = 100 USDC
    acc1Balance = await usdcContract.connect(acc1).balanceOf(acc1Address);

```

### Fixtures

**Fixtures** enable a consitent scenario to execute before **specific** unit tests, as opposed to **beforeEach()** hook.

The fixture below is only used when we want to test the contract from the **user's** perspective, otherwise no fixture is required.

```typescript
/// @notice set acc1 to default msg.sender and approve minter contract to spend USDC
  const acc1Fixture = async () => {
    minterContract = minterContract.connect(acc1);
    usdcContract = usdcContract.connect(acc1);
    await usdcContract.approve(minterContract.address, usdcAmount);
    return { minterContract, usdcContract };
  }
```



