import {
    GETPOST,
    FAILEDTOLOADPOST,
    REMOVEPOST,
    FAILEDTOREMOVEPOST,
} from '../actions/post';

const initialState = {
    currentPost: {},
    failedToLoadPost: false,
    failedToRemoveUser: false,
    loadingPost: true,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GETPOST: {
            return { ...state, currentPost: action.post, loadingPost: false };
        }
        case REMOVEPOST: {
            return { ...state, currentPost: {} }
        }
        case FAILEDTOLOADPOST: {
            return { ...state, failedToLoadPost: true }
        }
        case FAILEDTOREMOVEPOST: {
            return { ...state, failedToRemoveUser: true }
        }
        default:
            return state
    }
};
