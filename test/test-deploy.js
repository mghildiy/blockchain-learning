const { assert } = require("chai");
const { ethers } = require("hardhat");

describe("SimpleStorage", function () {
  let simpleStorageFactory, simpleStorage;

  beforeEach(async function () {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await simpleStorageFactory.deploy();
  });

  it("should start with a favourite number of 0", async function () {
    const currentNumber = await simpleStorage.retrieve();
    const expectedValue = "0";

    assert.equal(currentNumber.toString(), expectedValue);
  });

  it("should correctly update when we call store", async function () {
    const expectedValue = "4";

    const transactionResponse = await simpleStorage.store(expectedValue);
    // not really needed here
    await transactionResponse.wait(1);
    
    const currentValue = await simpleStorage.retrieve();
    assert.equal(currentValue.toString(), expectedValue);
  });
});
