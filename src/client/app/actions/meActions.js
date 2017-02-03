import rp from 'request-promise'

import {sendNotification} from './notificationsActions.js'

import store from '../store.js'

export function getMyClans(id){
  return dispatch => {
    dispatch({
      type: "MY_CLANS_PENDING"
    })
    var options = {
      method: 'GET',
      url: 'https://www.bungie.net/Platform/Group/User/'+id+'/',
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
            type: "MY_CLANS_REJECTED"
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
            type: "MY_CLANS_FULFILLED",
            payload: clanArray
          })
        }
      })
      .catch((body) => {
        dispatch({
          type: "MY_CLANS_REJECTED"
        })
        sendNotification("Could Not Fetch Clans", "error")
      })
  }
}
