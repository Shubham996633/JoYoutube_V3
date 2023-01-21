import { HOME_VIDEOS_FAIL, HOME_VIDEOS_REQUEST, HOME_VIDEOS_SUCCESS, SELECTED_VIDEO_FAIL, SELECTED_VIDEO_REQUEST, SELECTED_VIDEO_SUCCESS } from "../actionTypes"

import request from "../../apiCall"

export const getPopularVideos = () => async (dispatch, getState) => {
    try {

        dispatch({
            type: HOME_VIDEOS_REQUEST,

        })

        const { data } = await request("/videos", {
            params: {
                part: 'snippet,contentDetails,statistics',
                chart: 'mostPopular',
                regionCode: 'IN',
                maxResults: 20,
                pageToken: getState().homeVideos.netxPageToken
            }
        })
        dispatch({
            type: HOME_VIDEOS_SUCCESS,
            payload: {
                videos: data.items,
                netxPageToken: data.netxPageToken,
                category: 'All',


            },
        })


    } catch (error) {
        console.log(error.message)
        dispatch({
            type: HOME_VIDEOS_FAIL,
            payload: error.message,
        })

    }
}

export const getVideosByCategory = (keyword) => async (dispatch, getState) => {
    try {

        dispatch({
            type: HOME_VIDEOS_REQUEST,

        })

        const { data } = await request("/search", {
            params: {
                part: 'snippet',
                maxResults: 20,

                pageToken: getState().homeVideos.netxPageToken,
                q: keyword,
                type: 'video'
            }
        })
        dispatch({
            type: HOME_VIDEOS_SUCCESS,
            payload: {
                videos: data.items,
                netxPageToken: data.netxPageToken,
                category: keyword
            },
        })


    } catch (error) {
        console.log(error.message)
        dispatch({
            type: HOME_VIDEOS_FAIL,
            payload: error.message,
        })

    }
}

export const getVideoById = id => async dispatch => {
    try {
        dispatch({
            type: SELECTED_VIDEO_REQUEST,
        })

        const { data } = await request('/videos', {
            params: {
                part: 'snippet,statistics',
                id: id,
            },
        })
        dispatch({
            type: SELECTED_VIDEO_SUCCESS,
            payload: data.items[0],
        })
    } catch (error) {
        console.log(error.message)
        dispatch({
            type: SELECTED_VIDEO_FAIL,
            payload: error.message,
        })
    }
}