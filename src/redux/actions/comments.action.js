import { COMMENT_LIST_FAIL, COMMENT_LIST_REQUEST, COMMENT_LIST_SUCCESS, CREATE_COMMENT_FAIL, CREATE_COMMENT_SUCCESS } from "../actionTypes"
import { GET_SHORTS_FAIL, GET_SHORTS_REQUEST, GET_SHORTS_SUCCESS } from "../actionTypes"
import axios from "axios"
import request from "../../apiCall"
export const getCommentsOfVideoById = (id,nextPageToken = null,order=null) => async (dispatch,getState) => {
    try {
        dispatch({
            type: COMMENT_LIST_REQUEST,
        })
        const relevanceResponse = nextPageToken === null
        ? await axios.get(`https://yt.lemnoslife.com/commentThreads?part=snippet,replies&videoId=${id}&order=relevance`)
        : await axios.get(`https://yt.lemnoslife.com/commentThreads?part=snippet,replies&videoId=${id}&order=relevance&pageToken=${nextPageToken}`);
  
      let timeResponse = null;
      if (order === "time") {
        timeResponse = await axios.get(`https://yt.lemnoslife.com/commentThreads?part=snippet,replies&videoId=${id}&order=time`);
      }
  
      const relevanceData = relevanceResponse.data.items ? relevanceResponse.data.items : [];
      const timeData = timeResponse?.data.items ? timeResponse.data.items : [];
  
      let comments = [];
      if (order === "time" && timeData.length > 0) {
        // Merge the two lists as you described
        comments.push(timeData[0]);
        comments = comments.concat(relevanceData);
      } else {
        // Use only the relevance list
        comments = relevanceData;
      }
  
      dispatch({
        type: COMMENT_LIST_SUCCESS,
        payload: {
          comments: comments,
          nextPageToken: relevanceResponse.data.items ? relevanceResponse.data.nextPageToken : "stop",
          videoId: id,
          time:order === "time" ? true:false,
        },
      });
    } catch (error) {
        console.log(error.response.data)
        dispatch({
            type: COMMENT_LIST_FAIL,
            payload: error.response.data.error,
        })
    }
}
export const addComment = (id, text) => async (dispatch, getState) => {
    try {
        const obj = {
            snippet: {
                videoId: id,
                topLevelComment: {
                    snippet: {
                        textOriginal: text,
                    },
                },
            },
        }

        await request.post('/commentThreads', obj, {
            params: {
                part: 'snippet',
            },
            headers: {
                Authorization: `Bearer ${getState().auth.accessToken}`,
            },
        })
        dispatch({
            type: CREATE_COMMENT_SUCCESS,
        })
        setTimeout(() => {
            
            dispatch(getCommentsOfVideoById(id,null,'time'))
        }, 3000);

    } catch (error) {
        console.log(error.response.data)
        dispatch({
            type: CREATE_COMMENT_FAIL,
            payload: error.response.data.error,
        })
    }
}




export const getShortsChannel = (id, nextPageToken = null) => async (dispatch, getState) => {
    try{
        dispatch({
            type:GET_SHORTS_REQUEST,
        })

        var response = null
        nextPageToken===null ? response = await axios.get(`https://yt.lemnoslife.com/channels?part=status,shorts&id=${id}&handle=HANDLE`) : response = await axios.get(`https://yt.lemnoslife.com/channels?part=status,shorts&id=${id}&pageToken=${nextPageToken}`)
        const shorts = response.data.items[0].shorts.length!=0 ?  response.data.items[0].shorts : []
        // console.log(response)
        dispatch({
            type:GET_SHORTS_SUCCESS,
            payload:{

                shorts:shorts,
                nextPageToken:response.data.items[0].shorts.length!=0 ? response.data.items[0].nextPageToken :"stop",
                channelId:id,
                

            }
        })
        
        

    }catch(error){
        console.log(error)
        dispatch({
            type:GET_SHORTS_FAIL,
            payload:error
        })
            
    }
}