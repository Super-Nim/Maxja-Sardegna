// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MaxjaAirdrop is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter public tokenIds;
    // TODO: make token id's private again, access via getter func in test scripts
    // _tokenIdCounter.current();

    mapping(address => bool) public isVerified;

    constructor() ERC721("Mandala", "MND") {}

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