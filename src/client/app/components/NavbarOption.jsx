import React from 'react'
import {Link} from 'react-router'

import styles from '../stylesheets/_NavbarOption.css'

export default class NavbarOption extends React.Component{
  constructor(){
    super()
    this.render = this.render.bind(this)
  }

  render(){
    var link = "/"+this.props.option;
    return(
      <div className={styles.option}>
        <p><Link to={link}>{this.props.option}</Link></p>
      </div>
    )
  }
}
