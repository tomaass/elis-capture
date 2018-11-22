import { map, mergeMap } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';
import { authGetJSON } from '../../../lib/api';

export const FETCH_QUEUES = 'FETCH_QUEUES';
export const FETCH_QUEUES_FULFILLED = 'FETCH_QUEUES_FULFILLED';

export const fetchQueues = () => ({
  type: FETCH_QUEUES,
});

export const fetchQueuesFulfilled = payload => ({
  type: FETCH_QUEUES_FULFILLED,
  payload,
});

const fetchQueuesEpic = action$ =>
  action$.pipe(
    ofType(FETCH_QUEUES),
    mergeMap(() => authGetJSON('/queues')),
    map(fetchQueuesFulfilled),
  );

export default combineEpics(fetchQueuesEpic);
