require('dotenv').config()
const HDWalletProvider = require('@truffle/hdwallet-provider');

const {Web3} = require('web3');
const { interface, bytecode } = require('../compile');

const provider = new HDWalletProvider(process.env.ACCOUNT, `https://goerli.infura.io/v3/${process.env.API_KEY}`)

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface)) // オブジェクトを渡す必要がある
    .deploy({ data: bytecode, arguments: ['Hi there!'] })
    .send({ from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
}

deploy();
