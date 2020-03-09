import { mergeMap, map, catchError, takeUntil } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { collectionData } from 'rxfire/firestore'; 

import { fetchProjectFulfilled } from '../actionCreators'
import ProjectActions from '../actionCreators/projectActions';
import { FirebaseApp } from '../../services'

const {
  FETCH_PROJECT_REQUEST,
  FETCH_PROJECT_FAILURE,
  FETCH_PROJECT_CANCELLED
} = ProjectActions

export const fetchProjectEpic = action$ => action$.pipe(
  ofType(FETCH_PROJECT_REQUEST),
  mergeMap(({ payload }) => {
    const query = FirebaseApp.fetchProjects()
      .where('creatorId', '==', payload);
    return collectionData(query)
      .pipe(
        map(response => fetchProjectFulfilled(response)),
        takeUntil(action$.pipe(
          ofType(FETCH_PROJECT_CANCELLED)
        )),
        catchError(error => of({
          type: FETCH_PROJECT_FAILURE,
          payload: error,
          error: true
        }))
      )
  })
);

