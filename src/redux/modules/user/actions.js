/* @flow */
import { identity, negate } from 'lodash';
import { from } from 'rxjs';
import { ajax } from 'rxjs/ajax';

import {
  mergeMap,
  pluck,
  map,
  filter,
} from 'rxjs/operators';
import { AsyncStorage } from 'react-native';
import { combineEpics, ofType } from 'redux-observable';
import { apiUrl } from '../../../constants/config';

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
          mergeMap(() => ajax.post(loginUrl, body, settings)),
        )),
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
      from(AsyncStorage.setItem('TOKEN', token))),
    map(loginUserFulfilled),
  );

export default combineEpics(
  loginUserEpic,
  storeTokenEpic,
  loggedInUserEpic,
);
