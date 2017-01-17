const initialState = {
  fetching: false,
  fetched: false,
  name: '',
  membershipId: 0,
  error: null,
}

const PlayerReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'PLAYER_PENDING':{
      return {...state,
        fetching: true,
        fetched: false
      }
    }

    case 'PLAYER_FULFILLED':{
      var result = JSON.parse(action.payload).Response.results["0"]
      return {...state,
        fetching: false,
        fetched: true,
        name: result.displayName,
        membershipId: result.membershipId
      }
    }

    case 'PLAYER_REJECTED':{
      return {...state,
        fetching: false,
        fetched: false,
        error: action.payload
      }
    }
  }
  return state;
}

export default PlayerReducer;
