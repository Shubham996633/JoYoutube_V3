import { ALL_PLAYLIST_FAIL, ALL_PLAYLIST_REQUEST, ALL_PLAYLIST_SUCCESS, CHANNEL_DETAILS_FAIL, CHANNEL_DETAILS_REQUEST, CHANNEL_DETAILS_SUCCESS, SET_SUBSCRIPTION_STATUS } from "../actionTypes"
import request from "../../apiCall"
import { REACT_APP_YT_API_AUTHKEY } from "../../api"
export const getchannelDetails = id => async dispatch => {
    try {
        dispatch({
            type: CHANNEL_DETAILS_REQUEST,
        })

        const { data } = await request('/channels', {
            params: {
                part: 'snippet,statistics,contentDetails',
                id,
            },
        })
        dispatch({
            type: CHANNEL_DETAILS_SUCCESS,
            payload: data.items[0],
        })
    } catch (error) {
        console.log(error.response.data)
        dispatch({
            type: CHANNEL_DETAILS_FAIL,
            payload: error.response.data,
        })
    }
}

export const checkSubscriptionStatus = id => async (dispatch, getState) => {
    try {
        const { data } = await request('/subscriptions', {
            params: {
                part: 'snippet',
                forChannelId: id,
                mine: true,
            },
            headers: {
                Authorization: `Bearer ${getState().auth.accessToken}`,
            },
        })
        dispatch({
            type: SET_SUBSCRIPTION_STATUS,
            payload: data.items.length !== 0,
        })
        console.log(data)
    } catch (error) {
        console.log(error.response.data)
    }
}


export const getAllPlaylist = id => async (dispatch, getState) => {
    try {
        dispatch({
            type: ALL_PLAYLIST_REQUEST,
        })
        const { data } = await request('/playlists', {
            params: {
                part: 'snippet,contentDetails',
                mine: true,
                maxResults: '25',
            },
            headers: {
                Authorization: `Bearer ${getState().auth.accessToken}`,
            },
        })
        dispatch({
            type: ALL_PLAYLIST_SUCCESS,
            payload: data.items,
        })
    } catch (error) {
        dispatch({
            type: ALL_PLAYLIST_FAIL,
            payload: error.response.data,
        })
    }
}