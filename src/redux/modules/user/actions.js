/* @flow */
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
import { displayMessage } from '../messages/actions';
import { fetchQueues } from '../queues/actions';
import { apiUrl, TOKEN } from '../../../constants/config';

type CredentialsBody = { username: string, password: string };
opaque type Token = string;

const loginUrl = `${apiUrl}/auth/login`;
const settings = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const LOGIN_USER_FULFILLED = 'LOGIN_USER_FULFILLED';
export const VALIDATE_CREDENTIALS = 'VALIDATE_CREDENTIALS';

export const loginUser = (body: CredentialsBody) => ({
  type: LOGIN_USER,
  payload: body,
});
export const logoutUser = () => ({
  type: LOGOUT_USER,
});

export const loginUserFulfilled = (token: Token) => ({
  type: LOGIN_USER_FULFILLED,
  payload: token,
});

export const validateCredentials = (body: CredentialsBody) => ({
  type: VALIDATE_CREDENTIALS,
  payload: body,
});


const authentificationEpic = action$ =>
  action$.pipe(
    ofType(LOGIN_USER),
    pluck('payload'),
    mergeMap(body =>
      from(AsyncStorage.getItem('TOKEN')).pipe(
        map(token => ({ token, body })),
      )),
    filter(({ token, body }) => token || body),
    map(({ token, body }) => token
      ? loginUserFulfilled(token)
      : validateCredentials(body)),
  );
const validateCredentialsEpic = action$ =>
  action$.pipe(
    ofType(VALIDATE_CREDENTIALS),
    pluck('payload'),
    mergeMap(body => ajax.post(loginUrl, body, settings).pipe(
      map(({ response: { key } }) => loginUserFulfilled(key)),
      catchError(() => _of(displayMessage('Incorrect credentials provided'))),
    )),
  );

const loginUserFulfilledEpic = action$ =>
  action$.pipe(
    ofType(LOGIN_USER_FULFILLED),
    pluck('payload'),
    mergeMap(token => AsyncStorage.setItem(TOKEN, token)),
    mergeMap(() => _of(
      changeRoute('/camera'),
      fetchQueues(),
    )),
  );

const logoutUserEpic = action$ =>
  action$.pipe(
    ofType(LOGOUT_USER),
    mergeMap(() => from(AsyncStorage.removeItem(TOKEN))),
    map(() => changeRoute('/')),
  );


export default combineEpics(
  authentificationEpic,
  validateCredentialsEpic,
  loginUserFulfilledEpic,
  logoutUserEpic,
);
