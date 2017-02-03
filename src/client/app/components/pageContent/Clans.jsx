import React from 'react'
import { connect } from 'react-redux'

import styles from './css/_Clans.css'

import {getClan} from '../../actions/clanActions'
import {sendNotification} from '../../actions/notificationsActions'

import SearchBar from './SearchBar.jsx'
import {ClanTable} from '../tables'
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
    this.componentWillMount = this.componentWillMount.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  handleSearch(name){
    this.props.dispatch(getClan(name))
    //window.history.pushState("Test", "Clan: "+name, "/clans/"+name);
    sendNotification("Searching for clan: "+name, "notification")
  }

  componentWillMount(){
    const name = this.props.params.clanName;
    if(name){
      this.props.dispatch(getClan(name))
    }
  }

  render(){
    if(this.props.clan.members.length < 1){
      var clanArray = ''
    }else{
      var clanArray = <ClanTable members={this.props.clan.members} />
    }

    return(
      <div>
        <SearchBar searchObject="Clans" onSearch={this.handleSearch} path="/Clans/"/>
        <div className={styles.content}>
          {clanArray}
          <div>
            <p className={styles.clanName}>Clan id = {this.props.clan.id}</p>
            <p className={styles.clanName}>Clan name = {this.props.clan.name}</p>
            <p className={styles.clanName}>Clan member count = {this.props.clan.memberCount}</p>
          </div>
        </div>
      </div>
    )
  }
}
