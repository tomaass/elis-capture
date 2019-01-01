/* @flow */
import { identity, negate } from 'lodash';
import { from, of as _of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import {
  mergeMap,
  pluck,
  map,
  filter,
  catchError,
} from 'rxjs/operators';
import { AsyncStorage } from 'react-native';
import { combineEpics, ofType } from 'redux-observable';
import { changeRoute } from '../route/actions';
import makeMessage from '../messages/actions';
import { fetchQueues } from '../queues/actions';
import { apiUrl, TOKEN } from '../../../constants/config';

const loginUrl = `${apiUrl}/auth/login`;
const settings = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_FULFILLED = 'LOGIN_USER_FULFILLED';
export const STORE_TOKEN = 'STORE_TOKEN';

type loginUserPayload = { username: string, password: string };
export const loginUser = (payload: loginUserPayload) => ({
  type: LOGIN_USER,
  payload,
});

export const loginUserFulfilled = () => ({
  type: LOGIN_USER_FULFILLED,
});

export const storeToken = (token: string) => ({
  type: STORE_TOKEN,
  payload: { token },
});

const loginUserEpic = action$ =>
  action$.pipe(
    ofType(LOGIN_USER),
    pluck('payload'),
    mergeMap(body =>
      from(AsyncStorage.getItem('TOKEN'))
        .pipe(
          filter(negate(identity)),
          filter(() => body),
          mergeMap(() => ajax.post(loginUrl, body, settings)),
        )),
    catchError(() => makeMessage('Incorrect credentials provided')),
    map(({ response: { key } }) => storeToken(key)),
  );


const loggedInUserEpic = action$ =>
  action$.pipe(
    ofType(LOGIN_USER),
    mergeMap(() =>
      from(AsyncStorage.getItem('TOKEN'))
        .pipe(filter(identity))),
    map(loginUserFulfilled),
  );

const storeTokenEpic = action$ =>
  action$.pipe(
    ofType(STORE_TOKEN),
    pluck('payload', 'token'),
    mergeMap((token: string) =>
      from(AsyncStorage.setItem(TOKEN, token))),
    map(loginUserFulfilled),
  );

const loginUserFulfilledEpic = action$ =>
  action$.pipe(
    ofType(LOGIN_USER_FULFILLED),
    mergeMap(() => _of(
      changeRoute('/camera'),
      fetchQueues(),
    )),
  );

export default combineEpics(
  loginUserEpic,
  storeTokenEpic,
  loggedInUserEpic,
  loginUserFulfilledEpic,
);
