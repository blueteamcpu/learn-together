import {
    LOADPOST,
    LOADPOSTS,
    FAILEDTOLOADPOST,
    REMOVEPOST,
    FAILEDTOREMOVEPOST,
    CREATEPOST
} from '../actions/post';

const initialState = {
    currentPost: {},
    posts: [],
    failedToLoadPost: false,
    failedToRemoveUser: false,
    loadingPost: true,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOADPOST: {
            return { ...state, currentPost: action.post, loadingPost: false };
        }
        case LOADPOSTS: {
            return {...state, posts: action.posts, loadingPost: false};
        }
        case REMOVEPOST: {
            const filteredPosts = state.posts.filter(post => post.id !== action.postId)
            return { ...state, currentPost: {}, posts: filteredPosts }
        }
        case FAILEDTOLOADPOST: {
            return { ...state, failedToLoadPost: true, loadingPost: false }
        }
        case FAILEDTOREMOVEPOST: {
            return { ...state, failedToRemoveUser: true }
        }
        case CREATEPOST: {
            return { ...state, posts: [...state.posts, action.post]}
        }
        default:
            return state
    }
};
