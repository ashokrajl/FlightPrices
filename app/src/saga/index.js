import { takeLatest, put } from 'redux-saga/effects'

export default function* onFetchRecords() {
  yield takeLatest('GET_KEY', function* fetchRecords() {
    try {
      const response = yield fetch("http://localhost:3030/flight");
      if(response.status === 500){
        throw response;
      }
     
      const responseBody = yield response.json();
      yield put({ type: "PRICES_RECEIVED", data: responseBody });
    } catch (e) {
      console.log(e);
      yield put({ type: "PRICES_FAILED", data: e });
      return;
    }

  });

  yield takeLatest('CHANGE_ROUTE', function* fetchRecords(routeData) {
    try {
      yield put({ type: "LOAD_AGAIN" });

      const route = routeData.payload.split('–');
      const response = yield fetch(`http://localhost:3030/flight?origin=${route[0].trim()}&destination=${route[1].trim()}`);
      
      if(response.status === 500){
        throw response;
      }
      const responseBody = yield response.json();
      yield put({ type: "PRICES_RECEIVED", data: responseBody });
    } catch (e) {
      console.log(e);
      yield put({ type: "PRICES_FAILED", data: e });
      return;
    }

  });
}

