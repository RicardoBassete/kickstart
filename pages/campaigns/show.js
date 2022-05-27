import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'

import Layout from '../../components/Layout'

import Campaign from '../../ethereum/campaign'
import web3 from '../../ethereum/web3'

class Show extends Component {
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address)
    const summary = await campaign.methods.getSummary().call()
    return {
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4],
    }
  }

  renderCards() {
    const {
      minimumContribution,
      balance,
      requestsCount,
      approversCount,
      manager,
    } = this.props

    const items = [
      {
        header: manager,
        meta: 'Address of the Manager',
        description: 'The Manager created this campaign',
        style: { overflowWrap: 'break-word' },
      },
      {
        header: minimumContribution,
        meta: 'Minimum contribution in WEI',
        description: 'You must contribute at least this ammount to become a approver',
        style: { overflowWrap: 'break-word' },
      },
      {
        header: requestsCount,
        meta: 'Number of requests',
        description: 'A request tries to withdraw money from the campaign. Requests must be approved by approvers.',
        style: { overflowWrap: 'break-word' },
      },
      {
        header: approversCount,
        meta: 'Number of approvers',
        description: 'Number of people who have already donated to this campaign.',
        style: { overflowWrap: 'break-word' },
      },
      {
        header: `${web3.utils.fromWei(balance, 'ether')} ETH`,
        meta: 'Balance of the Campaign in ETH',
        description: 'The ammount of WEI avaliable in the campaign',
        style: { overflowWrap: 'break-word' },
      },
    ]

    return <Card.Group items={items} />
  }

  render() {
    return (
      <Layout>
        <h3>Campaign Show</h3>
        {this.renderCards()}
      </Layout>
    )
  }
}

export default Show
