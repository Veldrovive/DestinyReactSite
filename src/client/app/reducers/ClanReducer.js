const initialState = {
  fetching: false,
  fetched: false,
  name: '',
  id: 0,
  members: [],
  memberCount: 0,
  error: null,
}

const ClanReducer = (state = initialState, action) => {
  switch(action.type) {
    case "CLEAR_CLAN": {
      return{...state,
        name: '',
        id: 0,
        members: [],
        memberCount: 0,
        fetched: false,
        fetching: false,
      }
    }

    case "CLAN_NAME": {
      return{...state,
        name: action.payload
      }
    }

    case 'CLAN_MEMBER_COUNT': {
      return{...state,
        memberCount: action.payload,
      }
    }

    case "CLAN_ID": {
      return{...state,
        id: action.payload
      }
    }

    case "CLAN_PENDING": {
      return{...state,
        fetching: true,
        fetched: false,
      }
    }

    case "CLAN_FULFILLED": {
      return{...state,
        fetching: false,
        fetched: true,

      }
    }

    case "CLAN_REJECTED": {
      return{...state,
        fetching: false,
        fetched: false,
        error: action.payload
      }
    }

    case "CLAN_MEMBERS_FULFILLED": {
      return{...state,
        members: action.payload
      }
    }
  }
  return state;
}

export default ClanReducer;
