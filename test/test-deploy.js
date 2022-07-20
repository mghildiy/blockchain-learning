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

    assert.equal(currentNumber.toString(), "0");
  });

  it("should correctly update when we call store", async function () {
    const expected = "4";

    const transactionResponse = await simpleStorage.store(expected);
    // not really needed here
    await transactionResponse.wait(1);

    assert.equal((await simpleStorage.retrieve()).toString(), expected);
  });
});
