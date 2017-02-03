import React, {PropTypes} from 'react'
import rp from 'request-promise'
import {connect} from 'react-redux'

import styles from './css/_Players.css'

import {getPlayer, getPlayerById} from '../../actions/playerActions'

import SearchBar from './SearchBar.jsx'
import {PlayerClansTable} from '../tables'

@connect((store) => {
  return{
    player: store.reducers.player
  }
})
export default class Players extends React.Component{
  constructor(){
    super()

    this.render = this.render.bind(this)
    this.componentWillMount = this.componentWillMount.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  handleSearch(name){
    console.log("Searching for player "+name)
    this.props.dispatch(getPlayer(name))
  }

  componentWillMount(){
    const name = this.props.params.playerName
    const id = this.props.params.playerId
    if(name && !id){
      console.log("Getting by name");
      this.props.dispatch(getPlayer(name))
    }else if(id){
      console.log("Getting by id");
      this.props.dispatch(getPlayerById(id))
    }
  }

  render(){
    if(this.props.player.clans.length < 1){
      var clanTable = ''
    }else{
      var clanTable = <PlayerClansTable clans={this.props.player.clans} />
    }

    if(this.props.player.onXbox){
      var xboxName = <p className={styles.playerName}>Xbox Name = {this.props.player.xboxName}</p>
    }else{
      var xboxName = ''
    }

    if(this.props.player.onPs){
      var psName = <p className={styles.playerName}>PSN Name = {this.props.player.psName}</p>
    }else{
      var psName = ''
    }

    return(
      <div>
        <SearchBar searchObject="Players" onSearch={this.handleSearch} path="/Players/"/>
        <div className={styles.content}>
          {clanTable}
          <div>
            <p className={styles.playerName}>Player name = {this.props.player.name}</p>
            <p className={styles.playerName}>Membership Id = {this.props.player.membershipId}</p>
            {xboxName}
            {psName}
          </div>
        </div>
      </div>
    )
  }
}
