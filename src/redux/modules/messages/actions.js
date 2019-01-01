import {
  pluck,
  map,
  tap,
} from 'rxjs/operators';
import { ofType, combineEpics } from 'redux-observable';
import showMessage from '../../../lib/message';

const DISPLAY_MESSAGE = 'DISPLAY_MESSAGE';
const DISPLAY_MESSAGE_FULFILLED = 'DISPLAY_MESSAGE_FULFILLED';

export const displayMessage = message => ({
  type: DISPLAY_MESSAGE,
  payload: message,
});

export const displayMessageFulfilled = () => ({
  type: DISPLAY_MESSAGE_FULFILLED,
});

const displayMessageEpic = action$ =>
  action$.pipe(
    ofType(DISPLAY_MESSAGE),
    tap(console.log),
    pluck('payload'),
    tap(console.log),
    tap(showMessage),
    tap(console.log),
    map(displayMessageFulfilled),
    tap(console.log),
  );

export default combineEpics(displayMessageEpic);
