/* @flow */
import { AsyncStorage } from 'react-native';
import { from } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { mergeMap, first } from 'rxjs/operators';
import { apiUrl } from '../constants/config';


const authDefaultSettings = (token: string, settings: HeadersInit = {}) => ({
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: `Token ${token}`,
  ...settings,
});

const withToken = (fn: Function) =>
  from(AsyncStorage.getItem('TOKEN')).pipe(mergeMap(fn), first());

export const authPost = (endpoint: string, body: any, settings: HeadersInit) =>
  withToken((token: string) =>
    ajax.post(
      `${apiUrl}${endpoint}`,
      body,
      authDefaultSettings(token, settings),
    ));

export const authGetJSON = (endpoint: string, settings: HeadersInit) =>
  withToken((token: string) =>
    ajax.getJSON(
      `${apiUrl}${endpoint}`,
      authDefaultSettings(token, settings),
    ));
