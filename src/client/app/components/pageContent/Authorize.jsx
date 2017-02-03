import React from 'react'
import { connect } from 'react-redux'

import {getToken} from '../../actions/authorizeActions'

import styles from './css/_Authorize.css'

@connect((store) => {
  return{
    clan: store.reducers.clan
  }
})
export default class Me extends React.Component{
  constructor(){
    super()

    this.render = this.render.bind(this)
  }

  render(){
    var authCode = this.props.location.query.code
    this.props.dispatch(getToken(authCode))
    return(
      <div>
        <p>Auth Code Is: {authCode}</p>
      </div>
    )
  }
}
