import { ethers } from "hardhat";

async function main() {

  const Greeter = await ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("khadija");

  await greeter.waitForDeployment(); // Wait for deployment transaction to be mined

  console.log("Greeter deployed to:", greeter.target);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// async function main() {
//   const currentTimestampInSeconds = Math.round(Date.now() / 1000);
//   const unlockTime = currentTimestampInSeconds + 60;

//   const lockedAmount = ethers.parseEther("0.001");

//   const lock = await ethers.deployContract("Lock", [unlockTime], {
//     value: lockedAmount,
//   });

//   await lock.waitForDeployment();

//   console.log(
//     `Lock with ${ethers.formatEther(
//       lockedAmount
//     )}ETH and unlock timestamp ${unlockTime} deployed to ${lock.target}`
//   );
// }

// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });
