import { ALL_PLAYLIST_FAIL, ALL_PLAYLIST_REQUEST, ALL_PLAYLIST_SUCCESS, CHANNEL_DETAILS_FAIL, CHANNEL_DETAILS_REQUEST, CHANNEL_DETAILS_SUCCESS, GET_CHANNEL_FAIL, GET_CHANNEL_PLAYLIST_FAIL, GET_CHANNEL_PLAYLIST_SUCCESS, GET_CHANNEL_REQUEST, GET_CHANNEL_SUCCESS, GET_COMMUNITY_FAIL, GET_COMMUNITY_REQUEST, GET_COMMUNITY_SUCCESS, GET_RATE_FAIL, GET_RATE_REQUEST, GET_RATE_SUCCESS, MAKE_LIKE_FAIL, MAKE_LIKE_REQUEST, MAKE_LIKE_SUCCESS, SET_SUBSCRIPTION_STATUS } from "../actionTypes"

export const channelDetailReducer = (
    state = {
        loading: true,
        channel: {},
        subscriptionStatus: false
    },
    action
) => {
    const { payload, type } = action

    switch (type) {
        case CHANNEL_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case CHANNEL_DETAILS_SUCCESS:
            return {
                ...state,
                channel: payload,
                loading: false,
            }
        case CHANNEL_DETAILS_FAIL:
            return {
                ...state,
                channel: null,
                loading: false,
                error: payload,
            }
        case SET_SUBSCRIPTION_STATUS:
            return {
                ...state,
                subscriptionStatus: payload
            }

        default:
            return state
    }
}



export const playlistReducer = (
    state = {
        loading: true,
        playlist: null,
    },
    action
) => {
    const { payload, type } = action

    switch (type) {
        case ALL_PLAYLIST_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case ALL_PLAYLIST_SUCCESS:
            return {
                ...state,
                playlist: payload,
                loading: false,
            }
        case ALL_PLAYLIST_FAIL:
            return {
                ...state,
                playlist: null,
                loading: false,
                error: payload,
            }


        default:
            return state
    }
}

export const makeLikeReducer = (
    state = {
        loading: true,
    },
    action
) => {
    const { payload, type } = action
    switch (type) {
        case MAKE_LIKE_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case MAKE_LIKE_SUCCESS:
            return {
                ...state,
                loading: false,

            }
        case MAKE_LIKE_FAIL:
            return {
                ...state,
                like: null,
                loading: false,
                error: payload,
            }

        default:
            return state

    }
}

export const rateVideoReducer = (
    state = {
        loading: true,
        rating: false,
    },
    action
) => {
    const { payload, type } = action

    switch (type) {
        case GET_RATE_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case GET_RATE_SUCCESS:
            return {
                ...state,
                loading: false,
                rating: payload,
            }

        case GET_RATE_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
                rating: null
            }

        default:
            return state
    }
}

export const channelGetReducer = (
    state={
        loading:true,
        channel:{},
        
    },
    action
)=> {
    const {payload, type } = action
    switch(type) {
        case GET_CHANNEL_REQUEST:
            return{
                ...state,
                loading:true,

            }

        case GET_CHANNEL_SUCCESS:
            return {
                ...state,
                channel:payload,
                loading:false,
            }

        case GET_CHANNEL_FAIL:
            return{
                ...state,
                channel:null,
                loading:true,
            }

        default:
            return state
    }

}

export const communityGetReducer = (
    state={
      loading: true,
      community: [],
      nextPageToken: null,
      channelId: null,
    },
    action
  ) => {
    const {payload, type} = action;
    switch (type) {
      case GET_COMMUNITY_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case GET_COMMUNITY_SUCCESS:
        return {
          ...state,
          community: state.channelId === payload.channelId ? [...state.community, ...payload.community] : payload.community,
          nextPageToken: payload.nextPageToken,
          channelId: payload.channelId,
          loading: false,
        };
      case GET_COMMUNITY_FAIL:
        return {
          ...state,
          community: [],
          loading: true,
        };
      default:
        return state;
    }
  }
  

export const channelPlaylistGetReducer = (
    state ={
        loading:true,
        playlists:[],
        nextPageToken:null,
        channelId:null,

    },
    action
)=>{
    const {payload,type} = action;
    switch(type) {
        case GET_CHANNEL_REQUEST:
            return{
                ...state,
                loading:true,

            };
        case GET_CHANNEL_PLAYLIST_SUCCESS:
            return{
                ...state,
                playlists:state.channelId === payload.channelId ? [...state.playlists, ...payload.playlists]:payload.playlists,
                nextPageToken: payload.nextPageToken,
                loading:false,
            }
        case GET_CHANNEL_PLAYLIST_FAIL:
            return{
                ...state,
                playlists:[],
                loading:true,
            }
        default:
            return state;
    }
}