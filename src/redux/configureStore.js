import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import userEpic from './modules/user/actions';
import messagesReducer from './modules/messages/reducer';
import documentsEpic from './modules/documents/actions';
import queuesEpic from './modules/queues/actions';
import userReducer from './modules/user/reducer';
import queuesReducer from './modules/queues/reducer';
import routeReducer from './modules/route/reducer';
import documentsReducer from './modules/documents/reducer';

const reducers = {
  user: userReducer,
  documents: documentsReducer,
  messages: messagesReducer,
  route: routeReducer,
  queues: queuesReducer,
};
const epics = combineEpics(
  userEpic,
  queuesEpic,
  documentsEpic,
);

const epicMiddleware = createEpicMiddleware();

const store = createStore(
  combineReducers(reducers),
  applyMiddleware(epicMiddleware),
);

epicMiddleware.run(epics);

export default store;
