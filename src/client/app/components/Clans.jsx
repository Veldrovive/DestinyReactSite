import React from 'react'
import request from 'request'
import { connect } from 'react-redux'

import styles from '../stylesheets/_Clans.css'

import {getClan} from '../actions/clanActions'

import SearchBar from './SearchBar.jsx'
//import ClanContent from './ClanContent.jsx'

@connect((store) => {
  return{
    clan: store.reducers.clan
  }
})
export default class Clans extends React.Component{
  constructor(){
    super()

    this.render = this.render.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  handleSearch(name){
    console.log("Searching for clan "+name)
    this.props.dispatch(getClan(name))
  }

  render(){
    return(
      <div>
        <SearchBar searchObject="Clans" onSearch={this.handleSearch}/>
        <p className={styles.clanName}>Clan id = {this.props.clan.id}</p>
      </div>
    )
  }
}
