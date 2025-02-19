/**
 *  Conclusion: multicastChannel cannot buffer messages.
 */

import { multicastChannel } from "redux-saga";
import { take, fork, call, put, delay } from "redux-saga/effects";

export function* multicastChannelBuffer() {
  const channel = yield call(multicastChannel);

  yield fork(logWorkerA, channel);
  yield fork(logWorkerB, channel);

  let count = 0;
  while (count <= 5) {
    console.log("put", count);
    yield put(channel, count++);
    yield delay(100);
  }
}

function* logWorkerA(channel) {
  while (true) {
    const payload = yield take(channel, "*");
    console.log("logWorkerA", payload);
    yield delay(2000);
  }
}

function* logWorkerB(channel) {
  while (true) {
    const payload = yield take(channel, "*");
    console.log("logWorkerB", payload);
    yield delay(2000);
  }
}
