import { map } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import ProjectActions from '../actionCreators/projectActions';

const {
  FETCH_PROJECT_REQUEST,
} = ProjectActions

export const fetchProjectEpic = action$ => action$.pipe(
  ofType(FETCH_PROJECT_REQUEST),
  map(() => console.log('User signup action called.'))
);

