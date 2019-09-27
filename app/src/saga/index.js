import {takeLatest, put, call} from 'redux-saga/effects'

export default function* onFetchRecords() {
  yield takeLatest('GET_KEY', function* fetchAPIKey() {
    try {
        const response = yield fetch("http://localhost:3030/session");
        
        const responseBody = yield response.json();
        
        yield put({ type: "KEY_RECEIVED", data: responseBody });
    } catch (e) {
        console.log(e);
        yield put({ type: "KEY_RECIEVE_FAILED", data: e });
        return;
    }

  });

  yield takeLatest('KEY_RECEIVED', function* fetchRecords() {
    try {
        const response = yield fetch("http://localhost:3030/flight");
        
        const responseBody = yield response.json();
        console.log(responseBody);
        
        yield put({ type: "PRICES_RECEIVED", data: responseBody });
    } catch (e) {
        console.log(e);
        yield put({ type: "PRICES_FAILED", data: e });
        return;
    }

  });
}

