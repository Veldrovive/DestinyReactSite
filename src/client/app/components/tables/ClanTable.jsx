import React from 'react'

import { Link } from 'react-router'

import styles from './css/_ClanTable.css'

//<Link to={"/players/"+member.user.displayName}></Link>

export default class ClanTable extends React.Component{
  constructor(){
    super()

    this.render = this.render.bind(this)
  }

  constructTable(members){
    const list = members.map((member) =>
      <tr key={(member.membershipId).toString()}>
        <th><Link to={"/players/"+member.user.displayName+"/"+member.membershipId}>{member.user.displayName}</Link></th>
        <th>{member.membershipId}</th>
      </tr>
    )
    return <tbody>{list}</tbody>
  }

  render(){
    var members = this.props.members
    var memberList = this.constructTable(members)
    return(
      <div className={styles.tableContainer}>
        <table className={styles.memberTable}>
          <thead>
            <tr key="Head">
              <th>Name</th>
              <th>Membership ID</th>
            </tr>
          </thead>
          {memberList}
        </table>
      </div>
    )
  }
}
