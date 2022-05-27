import web3 from './web3'
import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x9850CAd73Ee26AeBF5A9d8A1a2baDb09b42B6B51'
)

export default instance