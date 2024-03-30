const assert = require('assert');
const { Web3 } = require('web3');
const ganache = require('ganache');
const web3 = new Web3(ganache.provider());
const {interface, bytecode} = require('../compile');

let accounts;
let inbox;
beforeEach(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();

    inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode, arguments: ["Hi there!"]
    }).send({ from: accounts[0], gas: '1000000' }); //　デプロイしたいアカウントやデプロイ元のアカウントを指定。アカウントをデプロイしている人。
});


describe('Inbox', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address);
  });
  it('method', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, 'Hi there!');
  });
  it('method set', async () => {
    await inbox.methods.setMessage('by!').send({ from: accounts[0] });　 // テスト費用を負担するアカウントを指定
    const massage = await inbox.methods.message().call();
    assert.equal(massage, 'by!');
  });
});
