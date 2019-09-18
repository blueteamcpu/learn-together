import {
    GETPOST,
    FAILEDTOLOADPOST,
} from '../actions/post';

const initialState = {
    currentPost: {},
    failedToLoadPost: false,
    loadingPost: true,
};

export default (state = initialState, action) => {
    switch (action.type){
        case GETPOST:{
            return {...state, currentPost: action.post, loadingPost: false};
        }
        case REMOVEPOST:{
            return {...state, currentPost: {}}
        }
        case FAILEDTOLOADPOST:{
            return {...state, failedToLoadPost: true}
        }
        default:
            return state
    }
};
