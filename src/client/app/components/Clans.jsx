import React from 'react'
import request from 'request'

import styles from '../stylesheets/_Clans.css'

import SearchBar from './SearchBar.jsx'

export default class Clans extends React.Component{
  constructor(){
    super()
    this.state = {clanName: ''}

    this.render = this.render.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  handleSearch(name){
    console.log("Searching for clan "+name)
    this.setState({clanName: name})
    try{
      request({
        url: 'https://www.bungie.net/Platform/User/SearchUsersPaged/'+name+'/1/1/', //URL to hit
        method: 'GET', //Specify the method
        headers: { //We can define headers too
            'X-API-Key': 'f733026343ec46669a6e9d49d08f3c6b',
        }
      }, function(error, response, body){
          if(error) {
              console.log(error);
          } else {
              console.log(response.statusCode, body);
          }
      });
    }catch(err){
      console.log(err)
    }
  }

  render(){
    return(
      <div>
        <SearchBar searchObject="Players" onSearch={this.handleSearch}/>
        <p className={styles.clanName}>Clan name = {this.state.clanName}</p>
      </div>
    )
  }
}
