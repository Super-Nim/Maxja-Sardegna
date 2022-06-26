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