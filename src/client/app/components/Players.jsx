import React, {PropTypes} from 'react'
import request from 'request'
import {connect} from 'react-redux'

import styles from '../stylesheets/_Players.css'

import {getPlayer} from '../actions/playerActions'

import SearchBar from './SearchBar.jsx'

@connect((store) => {
  return{
    player: store.reducers.player
  }
})
export default class Players extends React.Component{
  constructor(){
    super()

    this.render = this.render.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  handleSearch(name){
    console.log("Searching for player "+name)
    this.props.dispatch(getPlayer(name))
  }

  render(){
    return(
      <div>
        <SearchBar searchObject="Players" onSearch={this.handleSearch}/>
        <p className={styles.playerName}>Player name = {this.props.player.name}</p>
        <p className={styles.playerName}>Membership Id = {this.props.player.membershipId}</p>
      </div>
    )
  }
}
