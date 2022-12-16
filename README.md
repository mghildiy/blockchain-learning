# Basic Sample Hardhat Project

# initial steps to start a hardhat project in VSS

mkdit <projectname>
cd <projectname>
code .
yarn add --dev hardhat

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```

run all tests:
yarn hardhat test

run a specific test:
yarn hardhat test --grep "a word specific to that test description"

run with coverage:
yarn hardhat coverage

//9.44.00
