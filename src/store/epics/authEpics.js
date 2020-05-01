import { map } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { LOGIN_USER, SIGNUP_USER } from '../actionCreators/authActions';

export const loginUser = (action$, state, dependencies) => action$.pipe(
  ofType(LOGIN_USER),
  map(() => console.log({state, dependencies}))
);

export const signupUser = action$ => action$.pipe(
  ofType(SIGNUP_USER),
  map(() => console.log('User signup action called.'))
);
