const { ethers } = require("hardhat") // we can also require it in the old way

async function main() {
	const contract8 = await ethers.getContractFactory("Contract8mytoken")

	const myContract = await contract8.deploy("RossToken", "RT")
	await myContract.deployed()
	console.log(`deployed to: ${myContract.address}`)
}

async function verify_deployment(contractAddress, args) {}

main()
	.then(() => process.exit())
	.catch((error) => {
		console.error(error)
		process.exitCode = 1
	})
