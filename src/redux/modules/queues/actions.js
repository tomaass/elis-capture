import { map, mergeMap } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';
import { authGetJSON } from '../../../lib/api';
import { apiUrl } from '../../../constants/config';

export const FETCH_QUEUES = 'FETCH_QUEUES';
export const FETCH_QUEUES_FULFILLED = 'FETCH_QUEUES_FULFILLED';
export const NEXT_QUEUE = 'NEXT_QUEUE';
export const PREVIOUS_QUEUE = 'PREVIOUS_QUEUE';

export const fetchQueues = () => ({
  type: FETCH_QUEUES,
});

export const nextQueue = () => ({
  type: NEXT_QUEUE,
});

export const previousQueue = () => ({
  type: PREVIOUS_QUEUE,
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
