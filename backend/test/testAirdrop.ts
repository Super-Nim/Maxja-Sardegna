import { ethers, waffle } from "hardhat";
import type { MaxjaAirdrop } from "../typechain-types";
import MaxjaArtifact from "../artifacts/contracts/MaxjaAirdrop.sol/MaxjaAirdrop.json";
import { expect } from "chai";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { deployContract } from "ethereum-waffle";

describe("Maxja Airdrop", () => {
  let contract: MaxjaAirdrop;
  let owner: SignerWithAddress;
  let acc1: SignerWithAddress;
  let acc2: SignerWithAddress;
  let acc1Address: string;
  let acc2Address: string;
  let tokenURI = "https://gateway.pinata.cloud/ipfs/QmXm7M7RfQBGEvoH8cAAQ8myoBwhn9R7j3qdrRZohakAdD";

  beforeEach(async () => {
    [owner, acc1, acc2] = (await ethers.getSigners());
    contract = (await deployContract(
      owner,
      MaxjaArtifact
    )) as MaxjaAirdrop;
    acc1Address = acc1.address
    acc2Address = acc2.address
  });

  describe("Setup", () => {
    it("should be named Mandala", async () => {
      let name = await contract.name();
      expect(name).to.equal("Mandala");
    });
  
    it("should have the symbol MND", async () => {
      let symbol = await contract.symbol();
      expect(symbol).to.equal("MND");
    })  

  })

  describe("Positive", () => {
    it("should only allow OWNER to send NFTs", async () => {
      let txh = await contract.connect(owner).sendNFT(acc2Address, tokenURI);

      expect(txh).to.exist;
    });

    it("should send NFTs to recipient", async () => {
      
      await contract.connect(owner).sendNFT(acc1Address, tokenURI);
      let ownerOf = await contract.ownerOf(1);

      expect(ownerOf).to.equal(acc1Address);
    });

    it("should increment _tokenIds", async () => {
      let tokenIdBefore = await contract.tokenIds();
      await contract.connect(owner).sendNFT(acc1Address, tokenURI);
      let tokenIdAfter = await contract.tokenIds();

      expect(tokenIdBefore).to.equal(0);
      expect(tokenIdAfter).to.equal(1);

    });

    it("should verify the address", async () => {
      await contract.connect(owner).sendNFT(acc1Address, tokenURI);
      const verified = await contract.isVerified(acc1Address);
      expect(
        verified
      ).to.equal(true);
    })

    it("it should should send NFT with correct URI", async () => {
      let iface = new ethers.utils.Interface(MaxjaArtifact.abi);
      let txh = await contract.connect(owner).sendNFT(acc1Address, tokenURI);
      let decodedData = iface.parseTransaction({ data: txh.data })

      expect(decodedData.args?.tokenURI).to.equal(tokenURI)
    })
  
  });

  describe("Negative", () => {
    it("should NOT allow NON-OWNER to send NFTs", async () => {
      await expect(
        contract.connect(acc1).sendNFT(acc2Address, tokenURI)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });

  })


 
});
