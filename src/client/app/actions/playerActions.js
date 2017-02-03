import rp from 'request-promise'

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
      type: "PLAYER",
      payload: rp(options)
    })
  }
}
