/* @flow */
export const CHANGE_ROUTE = 'CHANGE_ROUTE';

export type Route = '/camera' | '/'

export const changeRoute = (route: Route) => ({
  type: CHANGE_ROUTE,
  payload: route,
});
