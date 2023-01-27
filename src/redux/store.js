import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { authReducer } from "./reducers/auth.reducer";
import { channelDetailReducer, playlistReducer } from "./reducers/channel.reducer";
import {
    channelVideosReducer,
    homeVideoReducer, likedVideos, relatedVideoReducer, searchedVideosReducer, subscriptionsChannelReducer,
} from './reducers/videos.reducer'
import { selectedVideoReducer } from './reducers/videos.reducer'
import { commentListReducer } from './reducers/comments.reducer'
const rootReducer = combineReducers({
    auth: authReducer,
    homeVideos: homeVideoReducer,
    selectedVideo: selectedVideoReducer,
    channelDetails: channelDetailReducer,
    commentList: commentListReducer,
    relatedVideos: relatedVideoReducer,
    searchedVideos: searchedVideosReducer,
    subscriptionsChannel: subscriptionsChannelReducer,
    channelVideos: channelVideosReducer,
    likedVideos: likedVideos,
    playlistItems: playlistReducer,

})

const store = createStore(
    rootReducer,
    {},

    composeWithDevTools(applyMiddleware(thunk)))

export default store
