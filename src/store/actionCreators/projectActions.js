export const FETCH_PROJECT_REQUEST = 'FETCH_PROJECT_REQUEST';
export const FETCH_PROJECT_FULLFILLED = 'FETCH_PROJECT_FULLFILLED';
export const FETCH_PROJECT_SUCCESS = 'FETCH_PROJECT_SUCCESS';
export const FETCH_PROJECT_FAILURE = 'FETCH_PROJECT_FAILURE';
export const FETCH_PROJECT_CANCELLED = 'FETCH_PROJECT_CANCELLED';

export const fetchProject = (userId) => ({ type: FETCH_PROJECT_REQUEST, payload: userId });

export const fetchProjectCancel = () => ({ type: FETCH_PROJECT_CANCELLED });

export const fetchProjectFulfilled = (payload) => ({ type: FETCH_PROJECT_FULLFILLED, payload });

export const fetchProjectSuccess = () => ({ type: FETCH_PROJECT_SUCCESS });

export const fetchProjectFailure = () => ({ type: FETCH_PROJECT_FAILURE });

export default {
  FETCH_PROJECT_REQUEST,
  FETCH_PROJECT_FULLFILLED,
  FETCH_PROJECT_SUCCESS,
  FETCH_PROJECT_FAILURE,
  FETCH_PROJECT_CANCELLED
};
