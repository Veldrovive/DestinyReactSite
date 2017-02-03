const initialState = {
  message: '',
  visible: false,
  state: 'notification',
}

const ClanReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SHOW_BAR':{
      return{...state,
        visible: true,
      }
    }

    case 'HIDE_BAR':{
      return{...state,
        visible: false,
      }
    }

    case 'SWAP_ERROR':{
      return{...state,
        state: 'error',
      }
    }

    case 'SWAP_NOTIFICATION':{
      return{...state,
        state: 'notification',
      }
    }

    case 'SET_MESSAGE':{
      return{...state,
        message: action.payload,
      }
    }
  }
  return state;
}

export default ClanReducer;
