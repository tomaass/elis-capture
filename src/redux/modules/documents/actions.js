import { pluck, map, mergeMap } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';
import { authPost } from '../../../lib/api';

const UPLOAD_DOCUMENTS = 'UPLOAD_DOCUMENTS';
const UPLOAD_DOCUMENTS_FULFILLED = 'UPLOAD_DOCUMENTS_FULFILLED';

export const uploadDocuments = files => ({
  type: UPLOAD_DOCUMENTS,
  payload: { files },
});

export const uploadDocumentsFulffilled = () => ({
  type: UPLOAD_DOCUMENTS_FULFILLED,
});

const uploadDocumentsEpic = (action$, state) =>
  action$.pipe(
    ofType(UPLOAD_DOCUMENTS),
    pluck('payload', 'files'),
    map(files => files.map(file => ({
      uri: file.uri,
      name: `capture_${Date.now()}`,
      type: 'image/jpg',
    }))),
    map((files) => {
      const { queues: { currentQueueIndex, queues } } = state.value;
      const { url } = queues[currentQueueIndex];
      // eslint-disable-next-line no-undef
      const data = new FormData();
      files.forEach(file => data.append('content', file));
      return [url, data];
    }),
    mergeMap(([url, data]) =>
      authPost(`${url}/upload?join=true`, data, { 'Content-Type': undefined })),
    map(uploadDocumentsFulffilled),
  );

export default combineEpics(uploadDocumentsEpic);
