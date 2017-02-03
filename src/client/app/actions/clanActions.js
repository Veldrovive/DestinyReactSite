import rp from 'request-promise'
import store from '../store.js'

import {sendNotification} from './notificationsActions'

//Get's group ID
//https://www.bungie.net/Platform/Group/Name/%7BgroupName%7D/
function getFullMembers(id, page, membersArray){
  if(!page){
    var page = 1
  }
  if(!membersArray){
    var membersArray = []
  }

  var options = {
    method: 'GET', //Specify the method
    headers: { //We can define headers too
        'X-API-Key': 'f733026343ec46669a6e9d49d08f3c6b',
    }
  }
  rp({...options, url: "https://www.bungie.net/Platform/Group/"+id+"/MembersV3/?currentPage="+page})
    .then(function(result){
      result = JSON.parse(result)
      //console.log("Pushing: ", result.Response.results)
      membersArray.push(...(result.Response.results))
      if(result.Response.hasMore){
        return getFullMembers(id, page+1, membersArray)
      }else{
        store.dispatch((dispatch) => {
          dispatch({
            type: "CLAN_MEMBERS_FULFILLED",
            payload: membersArray
          })
        })
      }
    })
    .catch((err) => {
      sendNotification("Failed To Fetch Clan Members", "error")
      dispatch({
        type: "CLAN_MEMBERS_REJECTED",
        payload: err,
      })
    })
}

export function getClan(name){
  var options = {
    method: 'GET', //Specify the method
    headers: { //We can define headers too
        'X-API-Key': 'f733026343ec46669a6e9d49d08f3c6b',
    }
  }

    return (dispatch) => {
      dispatch({
        type: 'CLEAR_CLAN'
      })
      var id = 0;
      var totalMembers
      dispatch({
        type: 'CLAN_PENDING'
      })
      dispatch({
        type: 'CLAN_NAME',
        payload: name
      })
      rp({...options, url: 'https://www.bungie.net/Platform/Group/Name/'+name+'/'})
        .then(function(result){
          id = JSON.parse(result).Response.detail.groupId
          totalMembers = JSON.parse(result).Response.detail.memberCount
          var timeToGet = Math.ceil((0.0185*totalMembers))
          if(timeToGet > 5){
            sendNotification("Estimated to to get players is "+(timeToGet)+" seconds", "notification", 1.5)
          }
          dispatch({
            type: 'CLAN_MEMBER_COUNT',
            payload: totalMembers
          })
          dispatch({
            type: "CLAN_ID",
            payload: id
          })
        })

        //Edited node_modules/request-promise/node_modules/bluebird/js/browser/bluebird.js at line 1543 to get rid of warning
        .then(function(result){
          if(totalMembers < 3000){
            getFullMembers(id)
          }else{
            sendNotification("Too many members to fetch", "error")
          }
        })

        .catch(function(error){
          sendNotification("Failed To Fetch Clan", "error")
          dispatch({
            type: "CLAN_REJECTED",
            payload: error
          })
        })
    }
}
