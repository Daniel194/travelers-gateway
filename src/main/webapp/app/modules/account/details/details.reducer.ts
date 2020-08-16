import axios from 'axios';
import { translate } from 'react-jhipster';
import { FAILURE, REQUEST, SUCCESS } from 'app/shared/reducers/action-type.util';
import { defaultValue, IUserDetails } from 'app/shared/model/user-details.model';

export const ACTION_TYPES = {
  GET_DETAILS: 'details/GET_DETAILS',
  SAVE_DETAILS: 'details/SAVE_DETAILS'
};

const initialState = {
  loading: false,
  errorMessage: null,
  userDetails: defaultValue
};

export type DetailsState = Readonly<typeof initialState>;

export default (state: DetailsState = initialState, action): DetailsState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.GET_DETAILS):
    case REQUEST(ACTION_TYPES.SAVE_DETAILS):
      return {
        ...state,
        errorMessage: null,
        loading: true
      };
    case FAILURE(ACTION_TYPES.GET_DETAILS):
    case FAILURE(ACTION_TYPES.SAVE_DETAILS):
      return {
        ...state,
        loading: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.GET_DETAILS):
      return {
        ...state,
        loading: false,
        userDetails: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.SAVE_DETAILS):
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};

const apiUrl = 'services/users/api/user';

export const getUserDetails = () => {
  return {
    type: ACTION_TYPES.GET_DETAILS,
    payload: axios.get<IUserDetails>(apiUrl)
  };
};

export const getUserDetailsByLogin = (login: string) => {
  return {
    type: ACTION_TYPES.GET_DETAILS,
    payload: axios.get<IUserDetails>(`${apiUrl}/${login}`)
  };
};

export const saveUserDetails = (userDetails: IUserDetails) => async dispatch => {
  await dispatch({
    type: ACTION_TYPES.SAVE_DETAILS,
    payload: axios.put(`${apiUrl}/details`, userDetails),
    meta: {
      successMessage: translate('details.messages.success')
    }
  });
};
