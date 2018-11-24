import { map, mergeMap } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';
import { authGetJSON } from '../../../lib/api';
import { apiUrl } from '../../../constants/config';

export const FETCH_QUEUES = 'FETCH_QUEUES';
export const FETCH_QUEUES_FULFILLED = 'FETCH_QUEUES_FULFILLED';
export const SELECT_QUEUE = 'SELECT_QUEUE';

export const fetchQueues = () => ({
  type: FETCH_QUEUES,
});

export const selectQueue = index => ({
  type: SELECT_QUEUE,
  payload: { index },
});


export const fetchQueuesFulfilled = payload => ({
  type: FETCH_QUEUES_FULFILLED,
  payload,
});

const fetchQueuesEpic = action$ =>
  action$.pipe(
    ofType(FETCH_QUEUES),
    mergeMap(() => authGetJSON(`${apiUrl}/queues`)),
    map(fetchQueuesFulfilled),
  );

export default combineEpics(fetchQueuesEpic);
