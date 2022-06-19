import { ethers, waffle, hardhatArguments } from "hardhat";
const hre = require("hardhat");
import type { Minter } from "../typechain-types";
import MinterArtifact from "../artifacts/contracts/MaxjaMinter.sol/Minter.json";
import { expect } from "chai";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
const { loadFixture, deployContract, solidity } = waffle;
import { Contract } from "@ethersproject/contracts";
import { BigNumber } from "@ethersproject/bignumber";

const IERC20_SOURCE = "@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20";
const USDC_ADDRESS = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";
const USDC_WHALE = "0xF977814e90dA44bFA03b6295A0616a897441aceC";

describe("Minter", () => {
  let minterContract: Minter;
  let usdcContract: Contract;
  let owner: SignerWithAddress;
  let acc1: SignerWithAddress;
  let hacker: SignerWithAddress;
  let ownerAddress: string;
  let acc1Address: string;
  let hackerAddress: string;
  let acc1Balance: BigNumber;
  let metaData =
    "https://gateway.pinata.cloud/ipfs/bafybeifhefluv354htkihbwlj2tnwkocote5p4ci4eqvdiffyongwcf524/testMetadata.json";
  let usdcAddress: string;

  beforeEach(async () => {
    /// @notice fetch balance of largest USDC holder on Polygon Mainnet
    await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [USDC_WHALE],
      });
    
    [owner, acc1, hacker] = await ethers.getSigners();
    ownerAddress = owner.address;
    acc1Address = acc1.address;
    hackerAddress = hacker.address;
    /// @notice initalize whale signer 
    const whaleSigner = ethers.provider.getSigner(USDC_WHALE);

    /// @notice get usdc contract's address and pass to Minter contract
    /// @dev ERC1155's constructor arg is HARD CODED into Minter contract, no need to pass through in testing
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
      .transfer(acc1Address, 100);
    /// @notice balance of acc1 = 100 USDC
    acc1Balance = await usdcContract.connect(acc1).balanceOf(acc1Address);

    /// @notice deploy minter contract with USDC address and whitelisted address in constructor
    /// @dev owner signer is contract's owner
    minterContract = (await deployContract(owner, MinterArtifact, [
      USDC_ADDRESS,
      [acc1Address]
    ])) as Minter;
  });

  const ownerFixture = async () => {
      const ownerMinterContract = minterContract.connect(owner);
      return { ownerMinterContract };
  }

  /// @notice set acc1 to default msg.sender and approve minter contract to spend 100 USDC
  const acc1Fixture = async () => {
    minterContract = minterContract.connect(acc1);
    usdcContract = usdcContract.connect(acc1);
    await usdcContract.approve(minterContract.address, 100);
    return { minterContract, usdcContract };
  }

  /// @notice Check ERC20 approved's mapping = 100
  describe("ERC20 Approval", async () => {
    it("should approve minter contract  to spend user's USDC", async () => {
      const { usdcContract } = await loadFixture(acc1Fixture);
      const approved: BigNumber = await usdcContract.allowance(acc1Address, minterContract.address);

      expect(approved.toString()).to.equal('100');
    });
  });


  /// @notice Check ERC1155 EXPECTED main functionality 
  describe("ERC1155 Minter: Positive", async () => {
    it("should allow whitelisted address to mint an NFT", async () => {
        const { minterContract } = await loadFixture(acc1Fixture);
        const balanceBefore = await minterContract.balanceOf(acc1Address, 0);
        await minterContract.mint();
        const balanceAfter = await minterContract.balanceOf(acc1Address, 0);
        const usdcBalance = await minterContract.getUsdcBalance();

        expect(balanceBefore.toString()).to.equal('0');
        expect(balanceAfter.toString()).to.equal('1');
        expect(usdcBalance.toString()).to.equal('0');
    });
    //TODO: fix this withdraw test, i'm using 2 separate contract instances
    it("should allow OWNER to withdraw USDC", async () => {
        const { minterContract, usdcContract } = await loadFixture(acc1Fixture);

        const balanceBefore = await minterContract.connect(owner).getUsdcBalance();
        const connectOwner = minterContract.connect(owner);

        console.log("before: ", balanceBefore);
        await minterContract.mint();

        await minterContract.connect(owner).withdrawUsdc();
        const balanceAfter = await minterContract.connect(owner).getUsdcBalance();
        console.log("after: ", balanceAfter);
        expect(balanceAfter.toString()).to.equal('100');
    })

  })
  /// @notice Check ERC1155 UNEXPECTED main functionality
  describe("ERC1155 Minter: Negative", async () => {
      /// @notice whale is NOT whitelisted and tries to mint an NFT
      it("should NOT allow address NOT on whitelist to mint an NFT", async () => {
        const whaleSigner = ethers.provider.getSigner(USDC_WHALE);
        await usdcContract
        .connect(whaleSigner)
        .approve(minterContract.address, 100);
        await expect( 
            minterContract.connect(whaleSigner).mint()
        ).to.be.revertedWith("You are not whitelisted");
      })

      it("should NOT allow NOT the owner to withdraw USDC", async () => {
        const whaleSigner = ethers.provider.getSigner(USDC_WHALE);
          await expect(
              minterContract.connect(whaleSigner).withdrawUsdc()
          ).to.be.revertedWith("Ownable: caller is not the owner");
      })
  })
});
