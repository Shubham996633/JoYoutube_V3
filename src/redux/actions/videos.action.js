import { HOME_VIDEOS_REQUEST } from "../actionTypes"

import request from "../../apiCall"

export const getPopularVideos = () => async dispatch => {
    try {

        dispatch({
            type: HOME_VIDEOS_REQUEST,

        })

        const res = request("/videos", {
            params: {
                part: 'snippet,contentDetails,statistics',
                chart: 'mostPopular',
                regionCode: 'IN',
                maxResults: 20,
                pageToken: ''
            }
        })
        console.log(res);


    } catch (error) {

    }
}