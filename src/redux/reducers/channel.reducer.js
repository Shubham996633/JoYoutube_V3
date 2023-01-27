import { ALL_PLAYLIST_FAIL, ALL_PLAYLIST_REQUEST, ALL_PLAYLIST_SUCCESS, CHANNEL_DETAILS_FAIL, CHANNEL_DETAILS_REQUEST, CHANNEL_DETAILS_SUCCESS, SET_SUBSCRIPTION_STATUS } from "../actionTypes"

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