import { ethers } from "hardhat";

async function main() {

  const SupplyChain = await ethers.getContractFactory("SupplyChain");
  const supplychain = await SupplyChain.deploy();

  await supplychain.waitForDeployment();

  console.log("SupplyChain deployed to:", supplychain.target);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
