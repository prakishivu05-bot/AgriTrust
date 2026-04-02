const hre = require("hardhat");

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  console.log("Deployed AgriTrust Platform Smart Contracts via Local Node", currentTimestampInSeconds);

  const AgriTrust = await hre.ethers.deployContract("AgriTrust");

  await AgriTrust.waitForDeployment();

  console.log(
    `AgriTrust Core deployed gracefully to Immutable Address: ${AgriTrust.target}`
  );
  
  // Create some simulated Blockchain Accounts for MVP Demo
  const [deployer, farmer1, vendor1] = await hre.ethers.getSigners();
  
  console.log("\n--- TESTNET ACCOUNTS ---");
  console.log("Use these private keys in MetaMask to demo true decentralized login:");
  console.log("Farmer Wallet: ", farmer1.address);
  console.log("Vendor Wallet: ", vendor1.address);
  console.log("------------------------");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
