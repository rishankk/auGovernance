const { ethers } = require("hardhat");
const { toUtf8Bytes, keccak256, parseEther } = ethers.utils;
async function main() {
  const [owner] = await ethers.getSigners();

  const governorAddress = "0x7cb3D0e2BD106Ad9E09eeE9558fdd6112C25b32A";
  const tokenAddress = "0xD05f411BE839f387B45F420A0D0235d20925b9cE";

  const token = await ethers.getContractAt("MyToken", tokenAddress);
  const governor = await ethers.getContractAt("MyGovernor", governorAddress);
  await governor.execute(
    [token.address],
    [0],
    [
      token.interface.encodeFunctionData("mint", [
        owner.address,
        parseEther("25000"),
      ]),
    ],
    keccak256(toUtf8Bytes("Give the owner more tokens!"))
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
