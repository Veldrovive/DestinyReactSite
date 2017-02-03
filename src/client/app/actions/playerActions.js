import rp from 'request-promise'

import {sendNotification} from './notificationsActions.js'

import store from '../store.js'

function getCharacters(dispatch, membershipId){
  var characters = {xboxCharacters: [], psCharacters: []}
  var options = {
    method: 'GET',
    url: 'https://www.bungie.net/Platform/User/GetBungieAccount/'+membershipId+'/254/',
    headers: {
      'X-API-Key': 'f733026343ec46669a6e9d49d08f3c6b',
    }
  }

  rp(options)
    .then((body) => {
      body = JSON.parse(body)
      var accounts = body.Response.destinyAccounts
      var consoleValue = null; //1 = xbox, 2 = ps
      for(var i = 0; i < accounts.length; i++){
        consoleValue = accounts[i].userInfo.membershipType
        switch(consoleValue){
          case 1:{
            characters.xboxCharacters = accounts[i].characters
            break
          }
          case 2:{
            characters.psCharacters = accounts[i].characters
            break
          }
        }
      }
      dispatch({
        type: "SET_PLAYER_CHARACTERS",
        payload: characters
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

function getClans(dispatch, membershipId){
  dispatch({
    type: "MEMBER_CLANS_PENDING"
  })
  var options = {
    method: 'GET',
    url: 'https://www.bungie.net/Platform/Group/User/'+membershipId+'/',
    headers: {
      'X-API-Key': 'f733026343ec46669a6e9d49d08f3c6b',
    }
  }

  rp(options)
    .then((body) => {
      body = JSON.parse(body);
      var clanArray = []
      var clan = {}
      var clansLength = body.Response.results.length
      if(clansLength < 1){
        dispatch({
          type: "MEMBER_CLANS_REJECTED"
        })
        sendNotification("Player is not in a clan", "notification")
      }else{
        for(var i = 0; i < clansLength; i++){
          clan = {
            name: body.Response.results[i].detail.name,
            id: body.Response.results[i].detail.groupId,
          }
          clanArray.push(clan)
        }
        dispatch({
          type: "MEMBER_CLANS_FULFILLED",
          payload: clanArray
        })
      }
    })
    .catch((body) => {
      dispatch({
        type: "MEMBER_CLANS_REJECTED"
      })
      sendNotification("Could Not Fetch Clans", "error")
    })
}

export function getPlayer(name) {
  var options = {
    url: 'https://www.bungie.net/Platform/User/SearchUsersPaged/'+name+'/1/1/', //URL to hit
    method: 'GET', //Specify the method
    headers: { //We can define headers too
        'X-API-Key': 'f733026343ec46669a6e9d49d08f3c6b',
    }
  }

  return (dispatch) => {
    dispatch({
      type: "PLAYER_PENDING",
    })
    dispatch({
      type: "CLEAR_PLAYER",
    })
    rp(options)
      .then((body) => {
        body = JSON.parse(body)
        if(body.Response.totalResults > 0){
          dispatch({
            type: "PLAYER_FULFILLED",
            payload: body.Response.results[0],
          })
          //console.log("Player is ", body)
          getClans(dispatch, body.Response.results["0"].membershipId)
          getConsoles(dispatch, body.Response.results["0"])
          getCharacters(dispatch, body.Response.results["0"].membershipId)
        }else{
          sendNotification("Player Does Not Exist", "error")
          dispatch({
            type: "PLAYER_REJECTED",
            payload: "Player Does Not Exist",
          })
        }
      })
      .catch((err) => {
        sendNotification("Failed To Fetch Player", "error")
        dispatch({
          type: "PLAYER_REJECTED",
          payload: err
        })
      })
  }
}

export function getPlayerById(id) {
  var options = {
    url: 'https://www.bungie.net/Platform/User/GetBungieNetUserById/'+id+'/', //URL to hit
    method: 'GET', //Specify the method
    headers: { //We can define headers too
        'X-API-Key': 'f733026343ec46669a6e9d49d08f3c6b',
    }
  }

  return (dispatch) => {
    dispatch({
      type: "PLAYER_PENDING",
    })
    dispatch({
      type: "CLEAR_PLAYER",
    })
    rp(options)
      .then((body) => {
        body = JSON.parse(body)
        if(body.Response.displayName){
          dispatch({
            type: "PLAYER_FULFILLED",
            payload: body.Response,
          })
          getClans(dispatch, body.Response.membershipId)
          getConsoles(dispatch, body.Response)
          getCharacters(dispatch, body.Response.membershipId)
        }else{
          sendNotification("Player Does Not Exist", "error")
          dispatch({
            type: "PLAYER_REJECTED",
            payload: "Player Does Not Exist",
          })
        }
      })
      .catch((err) => {
        sendNotification("Failed To Fetch Player", "error")
        dispatch({
          type: "PLAYER_REJECTED",
          payload: err
        })
      })
  }
}

function getConsoles(dispatch, player){
  var consoles = {
    onXbox: false,
    xboxName: '',
    onPs: false,
    psName: '',
  }
  if(player.psnDisplayName){
    consoles.onPs = true
    consoles.psName = player.psnDisplayName
  }
  if(player.xboxDisplayName){
    consoles.onXbox = true
    consoles.xboxName = player.xboxDisplayName
  }
  dispatch({
    type: "SET_CONSOLES",
    payload: consoles,
  })
}
