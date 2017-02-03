import React from 'react'
import { connect } from 'react-redux'

import {lowerNotCount} from '../../actions/notificationsActions.js'

import styles from './css/_NotificationBar.css'

@connect((store) => {
  return{
    notification: store.reducers.notifications
  }
})
export default class Me extends React.Component{
  constructor(){
    super()

    this.render = this.render.bind(this)
    this.deleteNotification = this.deleteNotification.bind(this)
  }

  deleteNotification(){
    this.props.dispatch(lowerNotCount())
  }

  render(){
    var visible = this.props.notification.visible
    var message = this.props.notification.message
    var type = this.props.notification.state
    var className;
    if(visible == true){
      if(type == "error"){
        className = styles.errorBar
      }else if(type == "notification"){
        className = styles.notificationBar
      }
    }
    if(visible == false){
      if(type == "error"){
        className = styles.errorInvisible
      }else if(type == "notification"){
        className = styles.notificationInvisible
      }
    }
    return(
      <div className = {className} onClick={this.deleteNotification}>
        <p>{message}</p>
      </div>
    )
  }
}
