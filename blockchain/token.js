const Web3 = require('web3');
const { abi, networks } = require('../build/contracts/Token.json');

class Token {
  constructor(network = 'development') {
    this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    this.contract = new this.web3.eth.Contract(
      abi,
      networks[network].address,
    );
  }

  async mint(tokenId, account) {
    const gasPrice = await this.web3.eth.getGasPrice();
    const gasEstimate = await this.contract.methods.mint(tokenId).estimateGas({ from: account });

    return this.contract.methods.mint(tokenId).send({ from: account, gasPrice, gas: gasEstimate });
  }

  async ownerOf(tokenId) {
    return this.contract.methods.ownerOf(tokenId).call();
  }

  async transferFrom(from, to, tokenId) {
    const gasPrice = await this.web3.eth.getGasPrice();
    const gasEstimate = await this.contract.methods.transferFrom(from, to, tokenId).estimateGas({ from });

    return this.contract.methods.transferFrom(from, to, tokenId).send({ from, gasPrice, gas: gasEstimate });
  }
}

module.exports = Token;