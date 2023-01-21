import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { authReducer } from "./reducers/auth.reducer";
import { channelDetailReducer } from "./reducers/channel.reducer";
import {
    homeVideoReducer, relatedVideoReducer,
} from './reducers/videos.reducer'
import { selectedVideoReducer } from './reducers/videos.reducer'
import { commentListReducer } from './reducers/comments.reducer'
const rootReducer = combineReducers({
    auth: authReducer,
    homeVideos: homeVideoReducer,
    selectedVideo: selectedVideoReducer,
    channelDetails: channelDetailReducer,
    commentList: commentListReducer,
    relatedVideos: relatedVideoReducer

})

const store = createStore(
    rootReducer,
    {},

    composeWithDevTools(applyMiddleware(thunk)))

export default store
