const { ethers } = require("hardhat");

async function main() {
  const [owner] = await ethers.getSigners();

  const governorAddress = "0x7cb3D0e2BD106Ad9E09eeE9558fdd6112C25b32A";
  const governor = await ethers.getContractAt("MyGovernor", governorAddress);

  const proposalId =
    "69812410604302709949471329754472504850671944981542715672918657459389886667630";

  proposalState = await governor.state(proposalId);
  console.log(`current proposal state is ${proposalState}`);

  const tx = await governor.castVote(proposalId, 1);
  const receipt = await tx.wait();
  const voteCastEvent = receipt.events.find((x) => x.event === "VoteCast");

  console.log(voteCastEvent);
  proposalState = await governor.state(proposalId);
  console.log(`current proposal state is ${proposalState}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
