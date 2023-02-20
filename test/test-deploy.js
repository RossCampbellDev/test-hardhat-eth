const { ethers } = require("hardhat")
const { expect, assert } = require("chai")

describe("Contract8mytoken", function () {
	let contract8
	let myContract

	// perform this code before tests begin
	beforeEach(async function () {
		contract8 = await ethers.getContractFactory("Contract8mytoken")
		myContract = await contract8.deploy("RossToken", "RT")
		await myContract.mint()
	})

	// define a test we will run
	// it("should start and mint 1 token to an 'owner'", async function () {
	// 	const firstOwner = await myContract.owners(0)
	// 	// assert or expect to test the conditions
	//     assert.equal(firstOwner)
	// })

	it("should increment owner count when minting", async function () {
		let expectedCount = parseInt(await myContract.ownerCount())
		expectedCount += 1
		await myContract.mint()
		const newCount = await myContract.ownerCount()
		assert.equal(newCount, expectedCount)
        expect(newCount).to.equal(expectedCount)
	})
})
