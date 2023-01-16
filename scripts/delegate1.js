const { ethers } = require("hardhat");

async function main() {
  const [owner] = await ethers.getSigners();

  const tokenAddress = "0xD05f411BE839f387B45F420A0D0235d20925b9cE";
  const token = await ethers.getContractAt("MyToken", tokenAddress, owner);
  //const MyToken = await MyToken.deploy(governor.address);
  console.log(`owner address is ${owner.address}`);

  await token.delegate(owner.address);

  console.log(`Token address is ${token.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
