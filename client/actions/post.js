// Action Types
export const LOADPOST = 'LOADPOST';
export const LOADPOSTS = 'LOADPOSTS';
export const FAILEDTOLOADPOST = 'FAILEDTOLOADPOST';
export const REMOVEPOST = 'REMOVEPOST';
export const FAILEDTOREMOVEPOST = 'FAILEDTOREMOVEPOST';
export const CREATEPOST = 'CREATEPOST';

// Actions
export const _loadPost = (post) => ({
    type: LOADPOST,
    post,
});

export const _loadPosts = (posts) => ({
    type: LOADPOSTS,
    posts
})

const _failedtoRemovePost = () => ({ type: FAILEDTOREMOVEPOST });

const _removePost = (postId) => ({
    type: REMOVEPOST,
    postId
});

const _failedToLoadPost = () => ({ type: FAILEDTOLOADPOST });

const _createPost = (post) => ({ type: CREATEPOST, post })

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
        const { data: deleted } = await axios.delete(`/api/post/deletePost/${postId}`);
        if (deleted) {
            dispatch(_removePost(postId));
        } else {
            dispatch(_failedtoRemovePost())
        }
    } catch (err) {
        dispatch(_failedtoRemovePost());
        console.error(err);
    }
};

export const loadPosts = (id) => async (dispatch, _, axios) => {
  try {
    const {data: posts} = await axios.get(`/api/posts/groupPosts/${id}`);
    if (!posts) {
      dispatch(_failedToLoadPost());
    } else {
      dispatch(_loadPosts(posts));
    }
  } catch (err) {
    console.error(err);
  }
};

export const createPost = (post) => async (dispatch, _, axios) => {
    try {
        const created = await axios.post('/api/posts/createPost', post)
        if (created){
            dispatch(_createPost(created));
        } else {
            dispatch(_failedToLoadPost());
        }
    } catch (err) {
        console.error(err);
    }
};
