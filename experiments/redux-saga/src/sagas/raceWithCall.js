import { race, delay, call } from "redux-saga/effects";

export function* raceWithCall() {
  const { delayFinished, callFinished } = yield race({
    delayFinished: delay(2000),
    callFinished: call(worker)
  });

  delayFinished && console.log("delay won");
  callFinished && console.log("call won");
}

function* worker() {
  console.log("run worker");
  yield call(api);
  return true;
}

function api() {
  console.log("make API");
  return new Promise(function (res, rej) {
    setTimeout(function () {
      res(true);
    }, 3000);
  });
}
