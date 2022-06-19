// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MaxjaMinter is ERC1155, Ownable {
   using Counters for Counters.Counter;
    IERC20 public tokenAddress;
    string public name = "Maxja Ticket";
    string public symbol = "MXT";
    // TODO: confirm the rate amount in test file, set to 100 for mainnet
    uint256 public rate = 1 * 10 ** 18;
    // uint256 public rate = 100;
    address[] public whitelist;
    Counters.Counter private _tokenIdCounter;


    constructor(address _tokenAddress, address[] memory _whitelist) ERC1155("https://gateway.pinata.cloud/ipfs/bafybeifhefluv354htkihbwlj2tnwkocote5p4ci4eqvdiffyongwcf524/testMetadata.json") {
        tokenAddress = IERC20(_tokenAddress);
        whitelist = _whitelist;
    }

    function mint() public {
        require(_isWhitelisted(whitelist) == true, "You are not whitelisted");
        tokenAddress.transferFrom(msg.sender, address(this), rate);
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _mint(msg.sender, tokenId, 1, "");
    }

    function getAllowance() external view returns (uint256) {
        return tokenAddress.allowance(msg.sender, address(this));
    }

    function getUsdcBalance() external view returns (uint256) {
        return tokenAddress.balanceOf(msg.sender);
    }

    function getWhitelistLength() external view returns (uint256) {
        return whitelist.length();
    }

    function withdrawUsdc() public onlyOwner {
        tokenAddress.transfer(msg.sender, tokenAddress.balanceOf(address(this)));
    }

    function _isWhitelisted(address[] memory _whitelist) internal view returns(bool) {
        for (uint16 i = 0; i < _whitelist.length; i++) {
            if (_whitelist[i] == msg.sender) {
                return true;
            }
        }
        return false;
    }

}