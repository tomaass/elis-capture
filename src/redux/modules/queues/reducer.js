/* @flow */
import Immutable, { type Immutable as ImmutableType } from 'seamless-immutable';
import { first } from 'lodash';
import { FETCH_QUEUES_FULFILLED } from './actions';

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
    default: {
      return state;
    }
  }
}

export default reducer;
