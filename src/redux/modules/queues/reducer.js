/* @flow */
import Immutable, { type Immutable as ImmutableType } from 'seamless-immutable';
import { FETCH_QUEUES_FULFILLED, NEXT_QUEUE } from './actions';

export type Queue = {
  workspace: string,
  annotations: Array<string>,
  id: number,
  name: string,
  rirUrl: string,
  sessionTimeout: number,
  url: string,
  users: Array<string>,
  counts: Object
}

type State = ImmutableType<{
  queues: Array<Queue>,
  currentQueueIndex: ?number,
}>;
const initialState: State = Immutable({
  queues: [],
  currentQueueIndex: null,
});

function reducer(state: State = initialState, action: Object) {
  switch (action.type) {
    case FETCH_QUEUES_FULFILLED: {
      const { results } = action.payload;
      return state
        .set('currentQueueIndex', 0)
        .set('queues', results);
    }

    case NEXT_QUEUE:
      return state.set('currentQueueIndex', action.payload.index);


    default: {
      return state;
    }
  }
}

export default reducer;
