import { CHANNEL_VIDEOS_FAIL, CHANNEL_VIDEOS_REQUEST, CHANNEL_VIDEOS_SUCCESS, HOME_VIDEOS_FAIL, HOME_VIDEOS_REQUEST, HOME_VIDEOS_SUCCESS, LIKED_VIDEOS_FAIL, LIKED_VIDEOS_REQUEST, LIKED_VIDEOS_SUCCESS, PLAYLIST_VIDOES_FAIL, PLAYLIST_VIDOES_REQUEST, PLAYLIST_VIDOES_SUCCESS, RELATED_VIDEO_FAIL, RELATED_VIDEO_REQUEST, RELATED_VIDEO_SUCCESS, SEARCHED_VIDEO_FAIL, SEARCHED_VIDEO_REQUEST, SEARCHED_VIDEO_SUCCESS, SELECTED_VIDEO_FAIL, SELECTED_VIDEO_REQUEST, SELECTED_VIDEO_SUCCESS, SUBSCRIPTIONS_CHANNEL_FAIL, SUBSCRIPTIONS_CHANNEL_REQUEST, SUBSCRIPTIONS_CHANNEL_SUCCESS } from "../actionTypes"

export const homeVideoReducer = (
    state = {
        videos: [],
        loading: false,
        nextPageToken: null,
        activeCategory: 'All',
    },
    action
) => {
    const { type, payload } = action

    switch (type) {
        case HOME_VIDEOS_SUCCESS:
            return {
                ...state,
                videos:
                    state.activeCategory === payload.category
                        ? [...state.videos, ...payload.videos]
                        : payload.videos,

                loading: false,
                nextPageToken: payload.nextPageToken,
                activeCategory: payload.category,
            }

        case HOME_VIDEOS_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            }
        case HOME_VIDEOS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        default:
            return state
    }
}

export const selectedVideoReducer = (
    state = {
        loading: true,
        video: null,
    },
    action
) => {
    const { payload, type } = action

    switch (type) {
        case SELECTED_VIDEO_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case SELECTED_VIDEO_SUCCESS:
            return {
                ...state,
                video: payload,
                loading: false,
            }
        case SELECTED_VIDEO_FAIL:
            return {
                ...state,
                video: null,
                loading: false,
                error: payload,
            }

        default:
            return state
    }
}

export const relatedVideoReducer = (
    state = {
        loading: true,
        videos: [],
    },
    action
) => {
    const { payload, type } = action

    switch (type) {
        case RELATED_VIDEO_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case RELATED_VIDEO_SUCCESS:
            return {
                ...state,
                videos: payload,
                loading: false,
            }
        case RELATED_VIDEO_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            }

        default:
            return state
    }
}




export const searchedVideosReducer = (
    state = {
        videos: [],
        loading: false,
        nextPageToken: null,
        searchKeyword: '',
    },
    action
) => {
    const { type, payload } = action

    switch (type) {
        case SEARCHED_VIDEO_SUCCESS:
            return {
                ...state,
                videos: state.searchKeyword === payload.searchKeyword
                    ? [...state.videos, ...payload.videos]
                    : payload.videos,

                loading: false,
                searchKeyword: payload.searchKeyword,
            }

        case SEARCHED_VIDEO_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            }
        case SEARCHED_VIDEO_REQUEST:
            return {
                ...state,
                loading: true,
            }
        default:
            return state
    }
}



export const subscriptionsChannelReducer = (
    state = {
        loading: true,
        videos: [],
    },
    action
) => {
    const { payload, type } = action

    switch (type) {
        case SUBSCRIPTIONS_CHANNEL_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case SUBSCRIPTIONS_CHANNEL_SUCCESS:
            return {
                ...state,
                videos: payload,
                loading: false,
            }
        case SUBSCRIPTIONS_CHANNEL_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            }

        default:
            return state
    }
}

export const channelVideosReducer = (
    state = {
        videos: [],
        loading: false,
        nextPageToken: null,

    },
    action
) => {
    const { payload, type } = action

    switch (type) {
        case CHANNEL_VIDEOS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case CHANNEL_VIDEOS_SUCCESS:
            return {
                ...state,
                videos: [...state.videos, ...payload.videos],
                loading: false,
                nextPageToken: payload.nextPageToken,
            }
        case CHANNEL_VIDEOS_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            }

        default:
            return state
    }
}


export const likedVideos = (
    state = {
        loading: true,
        videos: [],
    },
    action
) => {
    const { payload, type } = action

    switch (type) {
        case LIKED_VIDEOS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case LIKED_VIDEOS_SUCCESS:
            return {
                ...state,
                videos: [...state.videos, ...payload.videos],
                nextPageToken: payload.nextPageToken,

                loading: false,
            }
        case LIKED_VIDEOS_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            }

        default:
            return state
    }
}


export const playlistVideoReducer = (
    state = {
        videos: [],
        loading: false,
        nextPageToken: null,
        playlistid: null,

    },
    action
) => {
    const { payload, type } = action

    switch (type) {
        case PLAYLIST_VIDOES_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case PLAYLIST_VIDOES_SUCCESS:
            return {
                ...state,
                videos: state.playlistid === payload.playlistid
                    ? [...state.videos, ...payload.videos]
                    : payload.videos,
                loading: false,
                playlistid: payload.playlistid,


            }
        case PLAYLIST_VIDOES_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            }

        default:
            return state
    }
}