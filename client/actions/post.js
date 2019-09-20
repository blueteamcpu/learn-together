// Action Types
const LOADPOST = 'LOADPOST';
const LOADPOSTS = 'LOADPOSTS';
const FAILEDTOLOADPOST = 'FAILEDTOLOADPOST';
const REMOVEPOST = 'REMOVEPOST';
const FAILEDTODELETEPOST = 'FAILEDTODELETEPOST';

// Actions
export const _loadPost = (post) => ({
    type: LOADPOST,
    post,
});

export const _loadPosts = (posts) => ({
    type: LOADPOSTS,
    posts
})

const _failedtoDeleteUser = () => ({ type: FAILEDTODELETEPOST });

const _removePost = () => ({ type: REMOVEPOST });

const _failedToLoadPost = () => ({ type: FAILEDTOLOADPOST });

// Thunks
export const loadPost = (postId) => async (dispatch, _, axios) => {
    try {
        const { data: post } = await axios.get(`/api/posts/${postId}`);
        if (post) {
            dispatch(_loadPost(post));
        } else {
            dispatch(_failedToLoadPost());
        }
    } catch (err) {
        dispatch(_failedToLoadPost());
        console.error(err);
    }
};

export const removePost = (postId) => async (dispatch, _, axios) => {
    try {
        const {data: deleted} = await axios.delete(`/api/post/deletePost/${postId}`);
        if (deleted) {
            dispatch(_removePost());
        } else {
            dispatch(_failedtoDeleteUser())
        }
    } catch (err) {
        dispatch(_failedtoDeleteUser());
        console.error(err);
    }
};
