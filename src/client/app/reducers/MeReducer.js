const initialState = {
  accessToken: '',
  refreshToken: '',
  accessAllowed: false,
  error: '',
  name: '',
  membershipId: 0,
  clans: [],
  //Need to add console functionality, use code from player reducer
  onXbox: false,
  xboxName: '',
  onPs: false,
  psName: '',
}

const ClanReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'CLEAR_ME': {
      return{...state,
        accessToken: '',
        refreshToken: '',
        accessAllowed: false,
        error: '',
        name: '',
        membershipId: 0,
        onXbox: false,
        xboxName: '',
        onPs: false,
        psName: '',
      }
    }

    case 'AUTHORIZE_PENDING':{
      return{...state,
        accessAllowed: false,
      }
    }

    case 'AUTHORIZE_REJECTED':{
      return{...state,
        error: action.payload,
      }
    }

    case 'AUTHORIZE_FULFILLED':{
      return{...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      }
    }

    /*case 'REFRESH_PENDING':{
      return{...state
        accessAllowed: false,
      }
    }

    case 'REFRESH_REJECTED':{
      return{...state
        error: action.payload,
      }
    }

    case 'REFRESH_FULFILLED':{
      return{...state
        accessToken: action
      }
    }*/

    case 'ACCESS_ALLOWED':{
      return{...state,
        accessAllowed: true
      }
    }

    case 'ACCESS_DENIED':{
      return{...state,
        accessAllowed: false,
        error: "Access Denied",
      }
    }

    case 'CHANGE_PLAYER':{
      return{...state,
        name: action.payload.Response.displayName,
        membershipId: action.payload.Response.membershipId,
      }
    }

    case 'MY_CLANS_FULFILLED':{
      return{...state,
        fetching: false,
        fetched: true,
        clans: action.payload,
      }
    }

    case 'MY_CLANS_REJECTED':{
      return{...state,
        fetching: false,
        fetched: false,
        clans: [],
      }
    }

    case 'MY_CLANS_PENDING':{
      return{...state,
        fetching: true,
        fetched: false,
      }
    }
  }
  return state;
}

export default ClanReducer;
