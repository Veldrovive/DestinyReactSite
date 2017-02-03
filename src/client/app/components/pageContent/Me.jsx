//import packages
import React from 'react'
import { connect } from 'react-redux'
import rp from 'request-promise'

//import the css
import styles from './css/_Me.css'

//redux actions
import {getToken, renewToken, resetAuth} from '../../actions/authorizeActions'
import {sendNotification} from '../../actions/notificationsActions'
import {getMyClans} from '../../actions/meActions'


//change the location
import {PlayerClansTable} from '../tables'

@connect((store) => {
  return{
    me: store.reducers.me
  }
})
export default class Me extends React.Component{
  constructor(){
    super()

    this.render = this.render.bind(this)
    this.resetAuth = this.resetAuth.bind(this)
  }

  resetAuth(){
    this.props.dispatch(resetAuth())
  }

  componentWillMount(){
    //Change this in the future to avoid problems with the persisted state
    this.props.dispatch(getMyClans(this.props.me.membershipId))
    this.props.dispatch(renewToken(this.props.me.refreshToken.value, true))
  }

  render(){
    if(this.props.me.clans.length < 1){
      var clanArray = ''
    }else{
      console.log(this.props.me.clans);
      var clanArray = <PlayerClansTable clans={this.props.me.clans} />
    }

    if(!this.props.me.accessAllowed){
      return(
        <div>
          <button onClick={this.resetAuth}>Login</button>
        </div>
      )
    }else{
      return(
        <div className = {styles.content}>
          {clanArray}
          <div>
            <p>Name: {this.props.me.name}</p>
            <p>Membership Id: {this.props.me.membershipId}</p>
            <button onClick={this.resetAuth}>Login</button>
          </div>
        </div>
      )
    }
  }
}
