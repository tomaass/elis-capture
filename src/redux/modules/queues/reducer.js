/* @flow */
import Immutable, { type Immutable as ImmutableType } from 'seamless-immutable';
import { first, findIndex, last } from 'lodash';
import { FETCH_QUEUES_FULFILLED, NEXT_QUEUE, PREVIOUS_QUEUE } from './actions';

type Queue = {
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
  currentQueueId: ?number,
}>;
const initialState: State = Immutable({
  queues: [],
  currentQueueId: null,
});

function reducer(state: State = initialState, action: Object) {
  switch (action.type) {
    case FETCH_QUEUES_FULFILLED: {
      const { results } = action.payload;
      return state
        .set('currentQueueId', first(results).id)
        .set('queues', results);
    }

    case NEXT_QUEUE: {
      const { currentQueueId } = state;
      const currentQueueIndex = findIndex(state.queues, { id: currentQueueId });
      const { id } = state.queues[currentQueueIndex + 1] || first(state.queues);
      return state.set('currentQueueId', id);
    }

    case PREVIOUS_QUEUE: {
      const { currentQueueId } = state;
      const currentQueueIndex = findIndex(state.queues, { id: currentQueueId });
      const { id } = state.queues[currentQueueIndex - 1] || last(state.queues);
      return state.set('currentQueueId', id);
    }

    default: {
      return state;
    }
  }
}

export default reducer;
