export const LOGIN_USER = 'LOGIN_USER';
export const SIGNUP_USER = 'SIGNUP_USER';

export const SIGNUP_USER_SUCCESS = 'SIGNUP_USER_SUCCESS';
export const SIGNUP_USER_FAILURE = 'SIGNUP_USER_FAILURE';
export const SIGNUP_USER_CANCELLED = 'SIGNUP_USER_CANCELLED';

export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export const LOGIN_USER_CANCELLED = 'LOGIN_USER_CANCELLED';

export const signup = userData => ({ type: SIGNUP_USER, payload: userData });
export const login = () => ({ type: LOGIN_USER });
