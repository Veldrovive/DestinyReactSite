import store from '../store.js'

var notificationCount = 0

export function lowerNotCount(){
  if(notificationCount > 0){notificationCount--}
  return (dispatch) => {
    if(notificationCount <= 1){
      dispatch({
        type: "HIDE_BAR",
      })
    }
  }
}

function setNotification(message, type, time) {
  if(!time){
    //console.log("Time not provided");
    var time = 3000
  }else{
    //console.log("Time provided");
    time = time*1000
  }
  notificationCount++
  return (dispatch) => {
    dispatch({
      type: "SET_MESSAGE",
      payload: message
    })
    if(type == 'error'){
      dispatch({
        type: "SWAP_ERROR",
      })
    }else{
      dispatch({
        type: "SWAP_NOTIFICATION",
      })
    }
    dispatch({
      type: "SHOW_BAR",
    })
    setTimeout(() => {
      if(notificationCount <= 1){
        if(notificationCount > 0){notificationCount--}
        dispatch({
          type: "HIDE_BAR",
        })
      }else{
        if(notificationCount > 0){notificationCount--}
      }
    }, time)
  }
}

export function sendNotification(message, type, time) {
  store.dispatch(setNotification(message, type, time))
}
