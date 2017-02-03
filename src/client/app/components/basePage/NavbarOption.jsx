import React from 'react'
import {Link} from 'react-router'

import styles from './css/_NavbarOption.css'

export default class NavbarOption extends React.Component{
  constructor(){
    super()
    this.render = this.render.bind(this)
  }

  render(){
    if(!this.props.link){
      var link = "/"+this.props.option+'/';
    }else{
      var link = this.props.link;
    }
    return(
      <div className={styles.option}>
        <p><Link to={link}>{this.props.option}</Link></p>
      </div>
    )
  }
}
