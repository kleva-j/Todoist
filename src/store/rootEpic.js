import { combineEpics } from 'redux-observable';
import { fetchProjectEpic, loginUser } from './epics';
import { catchError } from 'rxjs/operators';

const epics = [fetchProjectEpic, loginUser];

export const rootEpic = (action$, store$, dependencies) =>
  combineEpics(...epics)(action$, store$, dependencies).pipe(
    catchError((error, source) => {
      console.error(error);
      return source;
    })
  );
