import React from 'react';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { componentFromStreamWithConfig } from 'recompose';

const componentFromStream = componentFromStreamWithConfig({
  fromESObservable: from,
  toESObservable: stream => stream
});

export const ComponentFromStreamWrapper = (Component) => {
  return componentFromStream(props$ => props$.pipe(map(props => <Component {...props} />)))
}
