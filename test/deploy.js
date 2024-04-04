require('dotenv').config()
const HDWalletProvider = require('@truffle/hdwallet-provider');

const {Web3} = require('web3');
const { interface, bytecode } = require('../compile');

const provider = new HDWalletProvider(process.env.ACCOUNT, `https://goerli.infura.io/v3/${process.env.API_KEY}`)

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  try {

    const result = await new web3.eth.Contract(JSON.parse(interface)) // オブジェクトを渡す必要がある
    .deploy({ data: `0x${bytecode}`, arguments: ['Hi there!'] })
    .send({ gas: "1000000", from: accounts[0] });
    console.log('Contract deployed to', result.options.address);
    provider.engine.stop();
  } catch (err) {
    console.log(err);
    provider.engine.stop();
  }
}


deploy();
