import { SagaIterator } from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';

import { metadataAllTags } from './api/v0';
import { getAllTagsFailure, getAllTagsSuccess } from './reducer';
import { GetAllTags } from './types';

export function* getAllTagsWorker(): SagaIterator {
  try {
    const tags = yield call(metadataAllTags);
    yield put(getAllTagsSuccess(tags));
  } catch (e) {
    yield put(getAllTagsFailure());
  }
}
export function* getAllTagsWatcher(): SagaIterator {
  yield takeEvery(GetAllTags.REQUEST, getAllTagsWorker);
}
