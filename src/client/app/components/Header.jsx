import React from 'react'

import styles from '../stylesheets/_Header.css'

import NavbarOption from './NavbarOption.jsx'

export default class Header extends React.Component{
  render(){
    return(
      <div className={styles.header}>
        <NavbarOption option="Clans"/>
        <NavbarOption option="Players"/>
        <NavbarOption option="Me"/>
      </div>
    )
  }
}
