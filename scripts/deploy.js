const { isCommunityResourcable } = require("@ethersproject/providers");
const { ethers, run, network } = require("hardhat");

async function main() {
  // hardhat ehters know about compiled contracts in contracts folder
  const simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  // hardhat default network is used internally to deploy the contract, unless we provide diff network using network flag
  // yarn hardhat run <path to script> --network <netowork name defined in hardhat config file>
  console.log("Deploying contract....");
  // contract is prepared, and send to network to be deployed
  const simpleStorage = await simpleStorageFactory.deploy();
  // to be sure, we check that contract is deployed or not
  await simpleStorage.deployed();
  console.log(`Deployed contract to:${simpleStorage.address}`);
  console.log(network.config);

  // verify network, but only on rinkeby
  if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
    // though contract may have been deployed, etherscan may not yet know about it...
    // so we wait for few blocks to be mined
    console.log("Waiting for block confirmations....");
    await simpleStorage.deployTransaction.wait(6);
    // ...and now we verify
    await verify(simpleStorage.address, []);
  }

  // ...lets interact with contract
  const currentValue = await simpleStorage.retrieve();
  console.log(`Current value is: ${currentValue}`);
  const transactionResponse = await simpleStorage.store(7);
  await transactionResponse.wait(1);
  const updatedValue = await simpleStorage.retrieve();
  console.log(`Updated value is: ${updatedValue}`);
}

async function verify(contractAddress, args) {
  console.log("Verifying contract....");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArgumnents: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified!");
    } else {
      console.log(e);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
