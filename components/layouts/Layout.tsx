import React from 'react'
import { initHubspot } from '@utils/hubspot/hubspot'
import { initGA, logPageView } from '@utils/utils/analytics'

export default class Layout extends React.Component {
  componentDidMount() {
    initHubspot()
    initGA()
    logPageView()
  }
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}
