import { ALL_PLAYLIST_FAIL, ALL_PLAYLIST_REQUEST, ALL_PLAYLIST_SUCCESS, CHANNEL_DETAILS_FAIL, CHANNEL_DETAILS_REQUEST, CHANNEL_DETAILS_SUCCESS, DEL_SUBSCRIPTION_FAIL, DEL_SUBSCRIPTION_REQUEST, DEL_SUBSCRIPTION_SUCCESS, GET_CHANNEL_FAIL, GET_CHANNEL_IMAGE_REQUEST, GET_CHANNEL_PLAYLIST_FAIL, GET_CHANNEL_PLAYLIST_REQUEST, GET_CHANNEL_PLAYLIST_SCREEN_FAIL, GET_CHANNEL_PLAYLIST_SCREEN_REQUEST, GET_CHANNEL_PLAYLIST_SCREEN_SUCCESS, GET_CHANNEL_PLAYLIST_SUCCESS, GET_CHANNEL_REQUEST, GET_CHANNEL_SUCCESS, GET_COMMUNITY_FAIL, GET_COMMUNITY_REQUEST, GET_COMMUNITY_SUCCESS, GET_RATE_FAIL, GET_RATE_REQUEST, GET_RATE_SUCCESS, MAKE_LIKE_FAIL, MAKE_LIKE_REQUEST, MAKE_LIKE_SUCCESS, SET_SUBSCRIPTION_FAIL, SET_SUBSCRIPTION_REQUEST, SET_SUBSCRIPTION_STATUS, SET_SUBSCRIPTION_SUCCESS } from "../actionTypes"
import request from "../../apiCall"
import { REACT_APP_YT_API_AUTHKEY } from "../../api"
import { getLikedVideos } from "./videos.action"
import axios from "axios"
export const getchannelDetails = id => async dispatch => {
    try {
        dispatch({
            type: CHANNEL_DETAILS_REQUEST,
        })

        const { data } = await request('/channels', {
            params: {
                part: 'snippet,statistics,contentDetails,brandingSettings',
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


export const makeLike = (id, act) => async (dispatch, getState) => {
    try {
        dispatch({
            type: MAKE_LIKE_REQUEST,

        })
        const obj = {
            id: id,
            rating: act,
        }
        await request.post('/videos/rate', obj, {

            headers: {
                Authorization: `Bearer ${getState().auth.accessToken}`,
            },
        })

        dispatch({
            type: MAKE_LIKE_SUCCESS,
        })
        console.log('success')
        dispatch(getVideoRating(id))
    } catch (error) {
        dispatch({

            type: MAKE_LIKE_FAIL,
            payload: error.response.data,
        })
    }
}

export const getVideoRating = id => async (dispatch, getState) => {
    try {
        dispatch({
            type: GET_RATE_REQUEST,
        })

        const { data } = await request('/videos/getRating', {
            params: {
                id: id,

            },
            headers: {
                Authorization: `Bearer ${getState().auth.accessToken}`,
            },
        })
        console.log(data);
        dispatch({
            type: GET_RATE_SUCCESS,
            payload: data.items[0].rating,

        })

    } catch (error) {
        console.log(error)
        dispatch({
            type: GET_RATE_FAIL,
            payload: error.response.data.message,
        })
    }
}

export const makeSubscribe = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: SET_SUBSCRIPTION_REQUEST,

        })
        const obj = {
            snippet: {
                resourceId: {
                    "kind": "youtube#channel",
                    "channelId": id,
                }
            }
        }

        await request.post('/subscriptions', obj, {
            params: {
                part: 'snippet',
            },
            headers: {
                Authorization: `Bearer ${getState().auth.accessToken}`,

            }
        })
        dispatch({
            type: SET_SUBSCRIPTION_SUCCESS
        })
        dispatch(checkSubscriptionStatus(id))
    } catch (error) {
        console.log(error.response.data)
        dispatch({
            type: SET_SUBSCRIPTION_FAIL,
            payload: error.response.data.message,
        })
    }
}

export const delSubscribe = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: DEL_SUBSCRIPTION_REQUEST,

        })
        const obj = {
            id: id,
        }
        await request.delete('/subscriptions', {
            params: {
                id: id,
            },

            headers: {
                Authorization: `Bearer ${getState().auth.accessToken}`,
            },
        })

        dispatch({
            type: DEL_SUBSCRIPTION_SUCCESS,
        })
        console.log('success')
        dispatch(checkSubscriptionStatus(id))
    } catch (error) {
        dispatch({

            type: DEL_SUBSCRIPTION_FAIL,
            payload: error.response.data,
        })
    }
}


export const getChannels = id => async dispatch => {
    try{
        dispatch({
            type:GET_CHANNEL_REQUEST,
        })
        const response = await axios.get(`https://yt.lemnoslife.com/channels?part=status,channels,approval&id=${id}&handle=HANDLE`);
        dispatch({
            type:GET_CHANNEL_SUCCESS,
            payload:response.data,

        })

    }catch(error){
        console.log(error)
        dispatch({
            type:GET_CHANNEL_FAIL,
            payload:error
        })
    }
}


export const getCommunityPost = (id, nextPageToken=null) => async  (dispatch, getState)=>{
    try{
        dispatch({
            type:GET_COMMUNITY_REQUEST,

        })
        var reponse = null
        nextPageToken===null ? reponse = await axios.get(`https://yt.lemnoslife.com/channels?part=status,community&id=${id}&handle=HANDLE`) : reponse = await axios.get(`https://yt.lemnoslife.com/channels?part=status,community&id=${id}&pageToken=${nextPageToken}`)
        const community = reponse.data.items ?  reponse.data.items[0].community : []

        dispatch({
            type:GET_COMMUNITY_SUCCESS,
            payload:{
                
                community: community,
                nextPageToken:reponse.data.items? reponse.data.items[0].nextPageToken:"stop",
                channelId:id,
            }
            
        })

    }catch(error){
        console.log(error)
        dispatch({
            type:GET_COMMUNITY_FAIL,
            payload:error,
        })
    }
}

export const getChannelPlaylist =(id, nextPageToken = null) => async (dispatch, getState) => {
    try{
        dispatch({
            type:GET_CHANNEL_PLAYLIST_REQUEST,
        })
        var response = null
        nextPageToken === null ? response = await axios.get(`https://yt.lemnoslife.com/channels?part=status,playlists&id=${id}&handle=HANDLE`) : response = await axios.get(`https://yt.lemnoslife.com/channels?part=status,community&id=${id}&handle=HANDLE&pageToken=${nextPageToken}`)
        const playlists = response.data.items ? response.data.items[0].playlistSections : []
        console.log(response)
        dispatch({
            type:GET_CHANNEL_PLAYLIST_SUCCESS,
            payload:{
                playlists:playlists,
                nextPageToken:response.data.items ? response.data.items[0].nextPageToken: "stop",
                channelId:id,
            }
        })

    }catch(error){
        console.log(error)
        dispatch({
            type:GET_CHANNEL_PLAYLIST_FAIL,
            payload:error,
        })

    }
}

export const getChannelPlaylistDetails =(id ) => async(dispatch, getState) => {
    try{
        dispatch({
            type:GET_CHANNEL_PLAYLIST_SCREEN_REQUEST,
        })
        const {data} = await request('/playlists',{
            params:{
                part:'snippet,contentDetails',
                id:id,

            }
            
            
        })
        dispatch({
            type:GET_CHANNEL_PLAYLIST_SCREEN_SUCCESS,
            payload:data,
        })


    }catch(error){
        dispatch({
            type:GET_CHANNEL_PLAYLIST_SCREEN_FAIL,
            payload:error.response.data
        })
    }
}