const { ethers, run, network } = require("hardhat") // we can also require it in the old way
require("dotenv").config()

async function main() {
	const contract8 = await ethers.getContractFactory("Contract8mytoken")
	const myContract = await contract8.deploy("RossToken", "RT")
	await myContract.deployed()
	console.log(`Deployed To: ${myContract.address}`)

	if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
		// best practice to wait for a couple of blocks to be mined before verifying, else it won't be ready
		await myContract.deployTransaction.wait(6) // wait 1 minute on ETH?
		await verify(myContract.address, ["RossToken", "RT"])
	}

	await myContract.mint()

	// a very crude way to iterate over the publicly accessible array in the contract
	let x = 0
	var addr
	while (true) {
		try {
			addr = await myContract.owners(x)
		} catch (e) {
			break
		}
		console.log(addr)
		x++
	}
	//_owners.forEach((addr) => console.log(addr))
	//console.log(`first owner is: ${await myContract.owners(0)}`)
}

async function verify(_contractAddress, _args) {
	console.log("Verifying contract...")
	try {
		await run("verify:verify", {
			// this is the command line command from hardhat-etherscan
			address: _contractAddress,
			constructorArguments: _args,
		})
	} catch (e) {
		if (e.message.toLowerCase().includes("already verified")) {
			// we want it to work if already verified, instead of halting execution
			console.log("already verified!")
		} else {
			console.log(e)
		}
	}
}

main()
	.then(() => process.exit())
	.catch((error) => {
		console.error(error)
		process.exitCode = 1
	})
