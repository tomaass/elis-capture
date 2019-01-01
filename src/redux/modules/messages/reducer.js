/* @flow */
import Immutable, { type Immutable as ImmutableType } from 'seamless-immutable';
import { DISPLAY_MESSAGE } from './actions';

export type Message = { show: boolean, text: string }
export type State = ImmutableType<Message>

const initialState: State = Immutable({ show: false, text: '' });

function reducer(state: State = initialState, action: Object) {
  switch (action.type) {
    case DISPLAY_MESSAGE:
      return state.set('show', true);
    default:
      return state;
  }
}

export default reducer;
