import React from 'react'

import { Link } from 'react-router'

import styles from './css/_ClanTable.css'

//<Link to={"/players/"+member.user.displayName}></Link>

export default class PlayerClanTable extends React.Component{
  constructor(){
    super()

    this.render = this.render.bind(this)
  }

  constructTable(clans){
    const list = clans.map((clan) =>
      <tr key={(clan.id).toString()}>
        <th><Link to={"/clans/"+clan.name}>{clan.name}</Link></th>
        <th>{clan.id}</th>
      </tr>
    )
    return <tbody>{list}</tbody>
  }

  render(){
    var clans = this.props.clans
    var clansList = this.constructTable(clans)
    return(
      <div className={styles.tableContainer}>
        <table className={styles.memberTable}>
          <thead>
            <tr key="Head">
              <th>Name</th>
              <th>Clan ID</th>
            </tr>
          </thead>
          {clansList}
        </table>
      </div>
    )
  }
}
