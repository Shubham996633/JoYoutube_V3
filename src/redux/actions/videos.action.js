import { CHANNEL_VIDEOS_FAIL, CHANNEL_VIDEOS_REQUEST, CHANNEL_VIDEOS_SUCCESS, GET_COMMUNITY_REQUEST, GET_COMMUNITY_SUCCESS, GET_SHORTS_FAIL, GET_SHORTS_REQUEST, GET_SHORTS_SUCCESS, HOME_VIDEOS_FAIL, HOME_VIDEOS_REQUEST, HOME_VIDEOS_SUCCESS, LIKED_VIDEOS_FAIL, LIKED_VIDEOS_REQUEST, LIKED_VIDEOS_SUCCESS, PLAYLIST_VIDOES_FAIL, PLAYLIST_VIDOES_REQUEST, PLAYLIST_VIDOES_SUCCESS, RELATED_VIDEO_FAIL, RELATED_VIDEO_REQUEST, RELATED_VIDEO_SUCCESS, SEARCHED_VIDEO_FAIL, SEARCHED_VIDEO_REQUEST, SEARCHED_VIDEO_SUCCESS, SELECTED_VIDEO_FAIL, SELECTED_VIDEO_REQUEST, SELECTED_VIDEO_SUCCESS, SUBSCRIPTIONS_CHANNEL_FAIL, SUBSCRIPTIONS_CHANNEL_REQUEST, SUBSCRIPTIONS_CHANNEL_SUCCESS } from "../actionTypes"

import request from "../../apiCall"
import axios from "axios"

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
                pageToken: getState().homeVideos.nextPageToken
            }
        })
        dispatch({
            type: HOME_VIDEOS_SUCCESS,
            payload: {
                videos: data.items,
                nextPageToken: data.nextPageToken,
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

                pageToken: getState().searchedVideos.nextPageToken,
                q: keyword,
                type: 'video'
            }
        })
        dispatch({
            type: HOME_VIDEOS_SUCCESS,
            payload: {
                videos: data.items,
                nextPageToken: data.nextPageToken,
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


export const getRelatedVideos = id => async dispatch => {
    try {
        dispatch({
            type: RELATED_VIDEO_REQUEST,
        })

        const { data } = await request('/search', {
            params: {
                part: 'snippet',
                relatedToVideoId: id,
                maxResults: 21,
                type: 'video'
            },
        })
        dispatch({
            type: RELATED_VIDEO_SUCCESS,
            payload: data.items,
        })
    } catch (error) {
        console.log(error.response.data.message)
        dispatch({
            type: RELATED_VIDEO_FAIL,
            payload: error.response.data.message,
        })
    }
}





export const getVideosBySearch = (keyword, nextPageToken = null) => async (dispatch, getState) => {
    try {
      dispatch({
        type: SEARCHED_VIDEO_REQUEST,
      })
  
      const { data } = await request("/search", {
        params: {
          part: 'snippet',
          maxResults: 20,
          pageToken: nextPageToken, // Use the nextPageToken parameter
          q: keyword,
          type: 'channel'
        }
      })
  
      dispatch({
        type: SEARCHED_VIDEO_SUCCESS,
        payload: {
          videos: nextPageToken ? [...getState().searchedVideos.videos, ...data.items] : data.items, // Add new items to existing videos array
          nextPageToken: data.nextPageToken,
          searchKeyword: keyword,
        },
      })
    } catch (error) {
      console.log(error.message)
      dispatch({
        type: SEARCHED_VIDEO_FAIL,
        payload: error.message,
      })
    }
  }
  

export const getSubscribedChannels = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: SUBSCRIPTIONS_CHANNEL_REQUEST,
        })
        const { data } = await request('/subscriptions', {
            params: {
                part: 'snippet,contentDetails',

                mine: true,
            },
            headers: {
                Authorization: `Bearer ${getState().auth.accessToken}`,
            },
        })
        dispatch({
            type: SUBSCRIPTIONS_CHANNEL_SUCCESS,
            payload: data.items,
        })
    } catch (error) {
        console.log(error.response.data)
        dispatch({
            type: SUBSCRIPTIONS_CHANNEL_FAIL,
            payload: error.response.data,
        })
    }
}
export const getVideoByChannel = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CHANNEL_VIDEOS_REQUEST,
        })

        // 1. get upload playlist id
        const {
            data: { items },
        } = await request('/channels', {
            params: {
                part: 'contentDetails',
                id: id,
            }
        })
        const uploadPlaylistId = items[0].contentDetails.relatedPlaylists.uploads
        // 2. get the videos using the id
        const { data } = await request('/playlistItems', {
            params: {
                part: 'snippet,contentDetails',
                playlistId: uploadPlaylistId,
                maxResults: 20,
                pageToken: getState().channelVideos.nextPageToken

            }
        })

        dispatch({
            type: CHANNEL_VIDEOS_SUCCESS,
            payload: {
                videos: data.items,
                nextPageToken: data.nextPageToken,
                playlistId: uploadPlaylistId,
            },

        })
    } catch (error) {
        console.log(error.response.data.message)
        dispatch({
            type: CHANNEL_VIDEOS_FAIL,
            payload: error.response.data,
        })
    }
}


export const getLikedVideos = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: LIKED_VIDEOS_REQUEST,
        })
        const { data } = await request('/videos', {
            params: {
                part: 'snippet,contentDetails,statistics',
                maxResults: 20,

                myRating: 'like',
                pageToken: getState().likedVideos.nextPageToken,
            },
            headers: {
                Authorization: `Bearer ${getState().auth.accessToken}`,
            },
        })
        dispatch({
            type: LIKED_VIDEOS_SUCCESS,
            payload: {
                videos: data.items,
                nextPageToken: data.nextPageToken,

            },
        })
    } catch (error) {
        console.log(error.response.data)
        dispatch({
            type: LIKED_VIDEOS_FAIL,
            payload: error.response.data,
        })
    }
}

export const getVideoBypPlaylist = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PLAYLIST_VIDOES_REQUEST,
        })

console.log('Before API call: nextPageToken=', getState().playlistVideos.nextPageToken)
console.log('Before API call: nextPageToken=', getState().playlistVideos.playlistid)
console.log(id)
        const { data } = await request('/playlistItems', {
            params: {
                part: 'snippet,contentDetails',
                playlistId: id,
                maxResults: 20,
                pageToken:  getState().playlistVideos.playlistid !=id?null:getState().playlistVideos.nextPageToken

            },
            // headers: {
            //     Authorization: `Bearer ${getState().auth.accessToken}`,
            // },
        })

        dispatch({
            type: PLAYLIST_VIDOES_SUCCESS,
            payload: {
                videos: data.items,
                nextPageToken: data.nextPageToken,
                playlistid: id,
            },

        })
    } catch (error) {
        console.log(error.response.data.message)
        dispatch({
            type: PLAYLIST_VIDOES_FAIL,
            payload: error.response.data,
        })
    }


}
