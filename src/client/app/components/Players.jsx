import React from 'react'
import Request from 'request'

import styles from '../stylesheets/_Players.css'

import SearchBar from './SearchBar.jsx'

export default class Players extends React.Component{
  constructor(){
    super()
    this.state = {power: 'telekinetic'}

    this.render = this.render.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  handleSearch(name){
    this.setState({power: name})
    console.log(name);
  }

  render(){
    return(
      <div>
        <SearchBar searchObject="Players" onSearch={this.handleSearch}/>
        <p className={styles.nerd}>*In nerd voice* I have {this.state.power} powers</p>
      </div>
    )
  }
}
