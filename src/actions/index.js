import jsonPlaceHolder from '../api/jsonPlaceHolder';
import _ from 'lodash';

export const fetchPostsAndUser = () => async (dispatch, getState) => {
    await dispatch(fetchPosts());
    // const usrIds = _.uniq(_.map(getState().posts, 'userId'));

    // usrIds.forEach(usrId => dispatch(fetchUser(usrId)));

    _.chain(getState().posts)
        .map('userId')
        .uniq()
        .forEach(id => dispatch(fetchUser(id)))
        .value()
}

// index.jsでmiddleware(redux-thunk)の定義をしている
export const fetchPosts = () => async (dispatch /* ,getState */) => {
    const response =  await jsonPlaceHolder.get('/posts');
    dispatch({ type: 'FETCH_POSTS', payload: response.data })
};


// 同じユーザーの情報に対して、1回だけリクエストを投げる方法1(lodashのmemizeを使う)
// export const fetchUser = (id) => dispatch => {
//    _fetchUser(id, dispatch);
// };

// const _fetchUser = _.memoize(async (id, dispatch) => {
//     const response = await jsonPlaceHolder.get(`/users/${id}`);
//     dispatch({ type: 'FETCH_USER', payload: response.data})
// });

export const fetchUser = id => async dispatch => {
    const response = await jsonPlaceHolder.get(`/users/${id}`);
    dispatch({ type: 'FETCH_USER', payload: response.data});
};