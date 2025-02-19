/**
 *  Conclusion:
 *   - "*" passed to `take` catches all messages put to channel.
 *   - pattern passed to `take` catches messages whose `type` is pattern.
 */

import { multicastChannel } from "redux-saga";
import { take, fork, call, put, delay } from "redux-saga/effects";

const ACTION_TO_A_AND_B = "ACTION_TO_A_AND_B";
const ACTION_TO_A_ONLY = "ACTION_TO_A_ONLY";

export function* multicastChannelTakePattern() {
  const channel = yield call(multicastChannel);

  yield fork(logWorkerA, channel);
  yield fork(logWorkerB, channel);

  let count = 0;
  while (count <= 5) {
    console.log("put", count);
    yield put(channel, { type: ACTION_TO_A_AND_B, count });
    yield put(channel, { type: ACTION_TO_A_ONLY, count });
    yield put(channel, `${count} to A only`);
    yield delay(1000);
    count++;
  }
}

function* logWorkerA(channel) {
  while (true) {
    const payload = yield take(channel, "*");
    console.log("logWorkerA:", payload);
  }
}

function* logWorkerB(channel) {
  while (true) {
    const payload = yield take(channel, ACTION_TO_A_AND_B);
    console.log("logWorkerB:", payload);
  }
}
