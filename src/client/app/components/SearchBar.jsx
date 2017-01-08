import React from 'react'

import styles from '../stylesheets/_SearchBar.css'

export default class SearchBar extends React.Component{
  constructor(){
    super()
    this.state = {value: ''}

    this.render = this.render.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event){
    this.setState({value: event.target.value})
  }

  handleSubmit(event){
    this.props.onSearch(this.state.value)
    event.preventDefault();
  }

  render(){
    return(
      <div className={styles.searchBar}>
        <form onSubmit={this.handleSubmit}>
          <p>Search: </p>
          <input type="text" placeholder={this.props.searchObject} value={this.state.value} onChange={this.handleChange}></input>
          <input type="submit" value="Submit"></input>
        </form>
      </div>
    )
  }
}
