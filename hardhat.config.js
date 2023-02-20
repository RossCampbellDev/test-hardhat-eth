require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()
require("./tasks/block-number.js")
require("hardhat-gas-reporter")
require("solidity-coverage")

const GOERLI_RPC_URL =
	process.env.GOERLI_RPC_URL || "http://some-default.com/example"
const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
	defaultNetwork: "hardhat",
	networks: {
		goerli: {
			url: GOERLI_RPC_URL,
			accounts: [GOERLI_PRIVATE_KEY],
			chainId: 5,
		},
		localhosty: {
			url: "http://127.0.0.1:8545/",
			chainId: 31337,
		},
	},
	solidity: "0.8.17",
	etherscan: {
		apiKey: ETHERSCAN_API_KEY,
	},
	gasReporter: {
		enabled: false,
		outputFile: "gasreport.txt",
		noColors: true,
		currency: "USD",
		coinmarketcap: COINMARKETCAP_API_KEY,
		TOKEN: "DOT",
	},
}
