import axios from 'axios';
import { translate } from 'react-jhipster';
import { FAILURE, REQUEST, SUCCESS } from 'app/shared/reducers/action-type.util';
import { defaultValue, IPost } from 'app/shared/model/post.model';

export const ACTION_TYPES = {
  GET_POST: 'details/GET_POST',
  GET_POSTS: 'details/GET_POSTS',
  SAVE_POST: 'details/SAVE_POST',
  UPDATE_POST: 'details/UPDATE_POST',
  DELETE_POST: 'details/DELETE_POST'
};

const initialState = {
  loading: false,
  errorMessage: null,
  post: defaultValue,
  posts: []
};

export type PostState = Readonly<typeof initialState>;

export default (state: PostState = initialState, action): PostState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.GET_POST):
    case REQUEST(ACTION_TYPES.GET_POSTS):
    case REQUEST(ACTION_TYPES.SAVE_POST):
    case REQUEST(ACTION_TYPES.UPDATE_POST):
    case REQUEST(ACTION_TYPES.DELETE_POST):
      return {
        ...state,
        errorMessage: null,
        loading: true
      };
    case FAILURE(ACTION_TYPES.GET_POST):
    case FAILURE(ACTION_TYPES.GET_POSTS):
    case FAILURE(ACTION_TYPES.SAVE_POST):
    case FAILURE(ACTION_TYPES.UPDATE_POST):
    case FAILURE(ACTION_TYPES.DELETE_POST):
      return {
        ...state,
        loading: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.GET_POST):
      return {
        ...state,
        loading: false,
        post: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.GET_POSTS):
      return {
        ...state,
        loading: false,
        posts: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.SAVE_POST):
    case SUCCESS(ACTION_TYPES.UPDATE_POST):
    case SUCCESS(ACTION_TYPES.DELETE_POST):
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};

const apiUrl = 'services/posts/api/post';

export const getCurrentPosts = () => {
  return {
    type: ACTION_TYPES.GET_POSTS,
    payload: axios.get<IPost[]>(apiUrl)
  };
};

export const getPostByLogin = login => {
  return {
    type: ACTION_TYPES.GET_POSTS,
    payload: axios.get<IPost[]>(`${apiUrl}/login/${login}`)
  };
};

export const getPostById = id => {
  return {
    type: ACTION_TYPES.GET_POST,
    payload: axios.get<IPost>(`${apiUrl}/id/${id}`)
  };
};

export const savePost = (post: IPost) => async dispatch => {
  await dispatch({
    type: ACTION_TYPES.SAVE_POST,
    payload: axios.post(`${apiUrl}`, post),
    meta: {
      successMessage: translate('post.messages.success')
    }
  });
};

export const updatePost = (post: IPost) => async dispatch => {
  await dispatch({
    type: ACTION_TYPES.UPDATE_POST,
    payload: axios.put(`${apiUrl}`, post),
    meta: {
      successMessage: translate('post.messages.success')
    }
  });
};

export const deletePost = id => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_POST,
    payload: axios.delete(`${apiUrl}/${id}`)
  });

  dispatch(getCurrentPosts());

  return result;
};
