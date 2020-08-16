import axios from 'axios';
import { FAILURE, REQUEST, SUCCESS } from 'app/shared/reducers/action-type.util';

export const ACTION_TYPES = {
  GET_USER_STATISTICS: 'statistics/GET_USER_STATISTICS',
  GET_COUNTRY_STATISTICS: 'statistics/GET_COUNTRY_STATISTICS'
};

const initialState = {
  loading: false,
  errorMessage: null,
  countryStatistics: [],
  userStatistics: []
};

export type StatisticsState = Readonly<typeof initialState>;

export default (state: StatisticsState = initialState, action): StatisticsState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.GET_USER_STATISTICS):
    case REQUEST(ACTION_TYPES.GET_COUNTRY_STATISTICS):
      return {
        ...state,
        errorMessage: null,
        loading: true
      };
    case FAILURE(ACTION_TYPES.GET_USER_STATISTICS):
    case FAILURE(ACTION_TYPES.GET_COUNTRY_STATISTICS):
      return {
        ...state,
        loading: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.GET_USER_STATISTICS):
      return {
        ...state,
        loading: false,
        userStatistics: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.GET_COUNTRY_STATISTICS):
      return {
        ...state,
        loading: false,
        countryStatistics: action.payload.data
      };
    default:
      return state;
  }
};

const apiUrl = 'services/statistics/api/statistic';

export const getUserStatistics = () => {
  return {
    type: ACTION_TYPES.GET_USER_STATISTICS,
    payload: axios.get<any[]>(`${apiUrl}/user?begin=1990-01-01&end=2100-01-01`)
  };
};

export const getCountryStatistics = () => {
  return {
    type: ACTION_TYPES.GET_COUNTRY_STATISTICS,
    payload: axios.get<any[]>(`${apiUrl}/country?begin=1990-01-01&end=2100-01-01`)
  };
};
