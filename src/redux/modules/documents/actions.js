import { ajax } from 'rxjs/ajax';
import { from } from 'rxjs';
import {
  pluck, map, mergeMap, tap, catchError,
} from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';
import { authPost } from '../../../lib/api';

const UPLOAD_DOCUMENT = 'UPLOAD_DOCUMENT';
const PREPROCESS_DOCUMENT_FULFILLED = 'PREPROCESS_DOCUMENT_FULFILLED';
const UPLOAD_DOCUMENT_FULFILLED = 'UPLOAD_DOCUMENT_FULFILLED';

export const uploadDocument = file => ({
  type: UPLOAD_DOCUMENT,
  payload: { file },
});
export const uploadPreprocessDocument = file => ({
  type: PREPROCESS_DOCUMENT_FULFILLED,
  payload: { file },
});

export const uploadDocumentFulffilled = () => ({
  type: UPLOAD_DOCUMENT_FULFILLED,
});

const preprocessDocumentEpic = action$ =>
  action$.pipe(
    ofType(UPLOAD_DOCUMENT),
    pluck('payload', 'file'),
    map((file) => {
      // eslint-disable-next-line no-undef
      const data = new FormData();
      file.forEach((f) => {
        data.append('images[]', {
          uri: f.uri,
          name: `EC_${Date.now()}`,
          type: 'image/jpeg',
        });
      });
      return data;
    }),
    mergeMap(body =>
      ajax.post('http://34.245.42.78:8608/to_pdf', body, {
        'Content-Type': 'multipart/form-data',
      })),
    tap(console.log),
    map(file => ({
      uri: file.uri,
      name: `EC_${Date.now()}`,
      type: 'application/pdf',
    })),
    map(uploadPreprocessDocument),
  );

const uploadDocumentEpic = (action$, state) =>
  action$.pipe(
    ofType(PREPROCESS_DOCUMENT_FULFILLED),
    pluck('payload', 'file'),
    map((file) => {
      const { queues: { currentQueueIndex, queues } } = state.value;
      const { url } = queues[currentQueueIndex];
      // eslint-disable-next-line no-undef
      const data = new FormData();
      data.append('content', file);
      return [url, data];
    }),
    mergeMap(([url, data]) =>
      authPost(`${url}/upload`, data, { 'Content-Type': 'application/pdf' })),
    catchError(console.log),
    map(uploadDocumentFulffilled),
  );

export default combineEpics(uploadDocumentEpic, preprocessDocumentEpic);
