import {
  delay,
  fork,
  take,
  race,
  put,
  actionChannel,
} from "redux-saga/effects";

const ACTION_NAME_1 = "MULTIPLE_PUT_TAKE_1";
const ACTION_NAME_2 = "MULTIPLE_PUT_TAKE_2";

export function* multiplePutTake() {
  const x = yield actionChannel("SOME_CHANNEL");
  console.log(x);
  yield fork(listenActionsWithTake);
  // yield fork(listenActionsWithActionChannel);
  // yield fork(listenActionsWithActionChannelWithRace);
  yield fork(putActions);
}

function* listenActionsWithTake() {
  while (true) {
    const { payload } = yield take(ACTION_NAME_1);
    console.log("received payload", payload);
    yield delay(3000);
  }
}

function* listenActionsWithActionChannel() {
  const requestChan = yield actionChannel(ACTION_NAME_1);
  while (true) {
    const { payload } = yield take(requestChan);
    console.log("received payload", payload);
    yield delay(3000);
  }
}

function* listenActionsWithActionChannelWithRace() {
  const requestChan1 = yield actionChannel(ACTION_NAME_1);
  const requestChan2 = yield actionChannel(ACTION_NAME_1);
  while (true) {
    const { request1, request2 } = yield race({
      request1: take(requestChan1),
      request2: take(requestChan2),
    });
    console.log(`received payload ${ACTION_NAME_1}`, request1?.payload);
    console.log(`received payload ${ACTION_NAME_2}`, request2?.payload);
    yield delay(3000);
  }
}

function* putActions() {
  let i = 1;
  while (i <= 5) {
    console.log("sent payload", i);
    yield put({ type: ACTION_NAME_1, payload: i });
    yield delay(1000);
    yield put({ type: ACTION_NAME_2, payload: i });
    i++;
  }
}
