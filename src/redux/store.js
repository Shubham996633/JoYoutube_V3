import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { authReducer } from "./reducers/auth.reducer";
import { channelDetailReducer, channelGetReducer, channelPlaylistGetReducer, communityGetReducer, getChannelPlaylistReducer, makeLikeReducer, playlistReducer, rateVideoReducer } from "./reducers/channel.reducer";
import {
    channelVideosReducer,
    getVideoKeywordReducer,
    homeVideoReducer, likedVideos, playlistVideoReducer, relatedVideoReducer, searchedVideosReducer, subscriptionsChannelReducer,
} from './reducers/videos.reducer'
import { selectedVideoReducer } from './reducers/videos.reducer'
import { commentListReducer, shortsGetReducer } from './reducers/comments.reducer'
import { getVideoRating } from "./actions/channel.action";
const rootReducer = combineReducers({
    auth: authReducer,
    playlistItems: playlistReducer,

    homeVideos: homeVideoReducer,
    selectedVideo: selectedVideoReducer,
    channelDetails: channelDetailReducer,
    commentList: commentListReducer,
    relatedVideos: relatedVideoReducer,
    searchedVideos: searchedVideosReducer,
    subscriptionsChannel: subscriptionsChannelReducer,
    channelVideos: channelVideosReducer,
    likedVideos: likedVideos,
    playlistVideos: playlistVideoReducer,
    likecheck: makeLikeReducer,
    ratecheck: rateVideoReducer,
    getchannel: channelGetReducer,
    getCommunity: communityGetReducer,
    getShorts:shortsGetReducer,
    getChannelPlaylist: channelPlaylistGetReducer,
    getChannelPlaylistDetails: getChannelPlaylistReducer,
    getKeywordVid:getVideoKeywordReducer,

})

const store = createStore(
    rootReducer,
    {},

    composeWithDevTools(applyMiddleware(thunk)))

export default store
