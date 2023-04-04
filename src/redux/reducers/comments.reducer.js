import { COMMENT_LIST_FAIL, COMMENT_LIST_REQUEST, COMMENT_LIST_SUCCESS } from "../actionTypes"
import { GET_SHORTS_FAIL, GET_SHORTS_REQUEST, GET_SHORTS_SUCCESS } from "../actionTypes"
export const commentListReducer = (
    state = {
        loading: true,
        comments: null,
    },
    action
) => {
    const { payload, type } = action

    switch (type) {
        case COMMENT_LIST_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case COMMENT_LIST_SUCCESS:
            return {
                ...state,
                comments: payload,
                loading: false,
            }
        case COMMENT_LIST_FAIL:
            return {
                ...state,
                channel: null,
                loading: false,
                error: payload,
            }


        default:
            return state
    }
}

export const shortsGetReducer = (
    state={
        loading:true,
        shorts : [],
        nextPageToken:null,
        channelId: null,
        
    },
    action
)=> {
    const { type,payload} = action
    switch(type){
        case GET_SHORTS_REQUEST:
            return {
                ...state,
                loading:true,
            };
        case GET_SHORTS_SUCCESS:
            return {
                ...state,
                loading:false,
                shorts: state.channelId === payload.channelId ? [...state.shorts, ...payload.shorts] : payload.shorts,
                nextPageToken:payload.nextPageToken,
                channelId:payload.channelId,
            };
        case GET_SHORTS_FAIL:
            return {
                ...state,
                loading:true,
                error:payload,
            };
        default:
            return state;
    }
}