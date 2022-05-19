const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');
const fs = require('fs')

const {mnemonic, infuraProjectId} = require('../.env')

const provider = new HDWalletProvider(mnemonic, infuraProjectId)

const web3 = new Web3(provider)

async function deploy(){
    const accounts = await web3.eth.getAccounts()
    
    const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({data: compiledFactory.bytecode, arguments: ['Hi There!!!']})
        .send({gas: '1000000', from: accounts[0]})

    fs.writeFileSync('contract_address.txt', `Contract deployed to: ${result.options.address}`, 'utf-8')

    provider.engine.stop()
}
deploy()