import web3 from './web3'
import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x1f878cabe40C29C625A45d7E3f9EfC9de49F186b'
)

export default instance