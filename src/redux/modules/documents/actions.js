import { find } from 'lodash';
import { pluck, map, mergeMap } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';
import { authPost } from '../../../lib/api';

const UPLOAD_DOCUMENT = 'UPLOAD_DOCUMENT';
const UPLOAD_DOCUMENT_FULFILLED = 'UPLOAD_DOCUMENT_FULFILLED';

export const uploadDocument = file => ({
  type: UPLOAD_DOCUMENT,
  payload: { file },
});

export const uploadDocumentFulffilled = () => ({
  type: UPLOAD_DOCUMENT_FULFILLED,
});

const uploadDocumentEpic = (action$, store) =>
  action$.pipe(
    ofType(UPLOAD_DOCUMENT),
    pluck('payload', 'file'),
    map((file) => {
      const { currentQueueId, queues } = store.getState();
      const { url } = find(queues, { id: currentQueueId });
      // eslint-disable-next-line no-undef
      const data = new FormData();
      data.append('content', file);
      return [url, data];
    }),
    mergeMap(([url, data]) =>
      authPost(`${url}/upload`, data, { 'Content-Type': undefined })),
    map(uploadDocumentFulffilled),
  );

export default combineEpics(uploadDocumentEpic);
