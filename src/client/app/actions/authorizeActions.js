import rp from 'request-promise'

import {sendNotification} from './notificationsActions.js'

import store, {storeState} from '../store.js'

function getTestAuthOptions(authCode){
  return{
    method: 'GET',
    url: 'https://www.bungie.net/Platform/User/GetCurrentBungieNetUser/',
    headers: {
      'X-API-Key': 'f733026343ec46669a6e9d49d08f3c6b',
      'Authorization': "Bearer " + authCode,
    }
  }
}

export function resetAuth(){
  return(dispatch) => {
    dispatch({
      type: "CLEAR_ME"
    })
    window.location = "https://www.bungie.net/en/Application/Authorize/10715"
  }
}

export function renewToken(refreshToken, supressNotes){
  if(!supressNotes){
    var supressNotes = false
  }

  var renewTokenOptions = {
    method: 'POST',
    uri: 'https://www.bungie.net/Platform/App/GetAccessTokensFromRefreshToken/',
    body: {
        "refreshToken": refreshToken
    },
    json: true,
    headers: { //We can define headers too
        'X-API-Key': 'f733026343ec46669a6e9d49d08f3c6b',
    }
  }
  return (dispatch) => {
    dispatch({
      type: "REFRESH_PENDING"
    })
    rp(renewTokenOptions)
      .then((body) => {
        if(body.ErrorCode == 1){
          dispatch({
            type: "CLEAR_ME"
          })
          dispatch({
            type: "AUTHORIZE_FULFILLED",
            payload: body.Response
          })
          sendNotification("Refreshed","notification")
          rp(getTestAuthOptions(body.Response.accessToken.value))
            .then((body) => {
              body = JSON.parse(body)
              dispatch({
                type: "ACCESS_ALLOWED",
              })
              dispatch({
                type: "CHANGE_PLAYER",
                payload: body,
              })
              storeState()
            })
            .catch((err) => {
              dispatch({
                type: "ACCESS_DENIED",
              })
              sendNotification("Access Denied", "Error")
            })
        }else if(body.ErrorCode == 19){
          window.location = "https://www.bungie.net/en/Application/Authorize/10715"
        }else if(!supressNotes){
          sendNotification("Refresh Failed. Try waiting for 30 minutes to pass. This service also automatically renews authorization.","error")
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export function getToken(code){
  var getTokenOptions = {
    method: 'POST',
    uri: 'https://www.bungie.net/Platform/App/GetAccessTokensFromCode/',
    body: {
        code: code
    },
    json: true,
    headers: { //We can define headers too
        'X-API-Key': 'f733026343ec46669a6e9d49d08f3c6b',
    }
  }

  return (dispatch) => {
    dispatch({
      type: "AUTHORIZE_PENDING"
    })
    rp(getTokenOptions)
      .then((body) => {
        dispatch({
          type: "CLEAR_ME"
        })
        dispatch({
          type: "AUTHORIZE_FULFILLED",
          payload: body.Response,
        })
        rp(getTestAuthOptions(body.Response.accessToken.value))
          .then((body) => {
            body = JSON.parse(body)
            dispatch({
              type: "ACCESS_ALLOWED",
            })
            dispatch({
              type: "CHANGE_PLAYER",
              payload: body,
            })
            sendNotification("Authentication Succesful", "notification")
            setTimeout(function(){
              storeState()
              window.location = "https://localhost:3000/Me"
            }, 4000)
          })
          .catch((err) => {
            dispatch({
              type: "ACCESS_DENIED",
            })
            sendNotification("Access Denied", "Error")
          })
      })
      .catch((err) => {
        sendNotification("Access Denied", "error")
        dispatch({
          type: "AUTHORIZE_REJECTED",
          payload: err,
        })
        setTimeout(function(){
          storeState()
          window.location = "https://localhost:3000/Me"
        }, 4000)
      })
  }
}
