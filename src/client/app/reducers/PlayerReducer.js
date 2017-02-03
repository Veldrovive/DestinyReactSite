const initialState = {
  fetching: false,
  fetched: false,
  name: '',
  onXbox: false,
  xboxName: '',
  xboxCharacters: [],
  onPs: false,
  psName: '',
  psCharacters: [],
  membershipId: 0,
  clans: [],
  error: null,
}

const PlayerReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'CLEAR_PLAYER': {
      return{...state,
        fetching: false,
        fetched: false,
        name: '',
        onXbox: false,
        xboxName: '',
        xboxCharacters: [],
        onPs: false,
        psName: '',
        psCharacters: [],
        membershipId: 0,
        clans: [],
        error: null,
      }
    }

    case 'SET_PLAYER_CHARACTERS':{
      return{...state,
        xboxCharacters: action.payload.xboxCharacters,
        psCharacters: action.payload.psCharacters,
      }
    }

    case 'SET_CONSOLES':{
      return{...state,
        onXbox: action.payload.onXbox,
        xboxName: action.payload.xboxName,
        onPs: action.payload.onPs,
        psName: action.payload.psName,
      }
    }

    case 'PLAYER_PENDING':{
      return {...state,
        fetching: true,
        fetched: false
      }
    }

    case 'PLAYER_FULFILLED':{
      var result = action.payload
      if(result){
        return {...state,
          fetching: false,
          fetched: true,
          name: result.displayName,
          membershipId: result.membershipId
        }
      }else{
        return{...state,
          fetching: false,
          fetched: false,
          error: "Player does not exist"
        }
      }
    }

    case 'PLAYER_REJECTED':{
      return {...state,
        fetching: false,
        fetched: false,
        error: action.payload
      }
    }

    case 'MEMBER_CLANS_FULFILLED':{
      return{...state,
        fetching: false,
        fetched: true,
        clans: action.payload,
      }
    }

    case 'MEMBER_CLANS_REJECTED':{
      return{...state,
        fetching: false,
        fetched: false,
        clans: [],
      }
    }

    case 'MEMBER_CLANS_PENDING':{
      return{...state,
        fetching: true,
        fetched: false,
        clans: [],
      }
    }
  }
  return state;
}

export default PlayerReducer;
