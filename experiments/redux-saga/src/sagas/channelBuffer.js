import { channel } from 'redux-saga';
import { delay, call, take, put, fork } from 'redux-saga/effects';

export function* channelBuffer() {
  const chan = yield call(channel);
  yield fork(workerA, chan);
  yield fork(workerB, chan);
}

function* workerA(output) {
  let count = 0;
  while (count < 5) {
    count++;
    console.log(`Worker A is cooking count ${count}...`);
    yield delay(1000);

    console.log(`Worker A passed count ${count}`);
    yield put(output, { count });
  }
  console.log(`Worker A finished passing count`);
  console.log(`-------------------------------`);
}

function* workerB(input) {
  while (true) {
    const message = yield take(input);
    console.log(`Worker B received count ${message.count} from Worker A`);

    console.log(`Worker B is cooking count ${message.count}...`);
    yield delay(5000);
  }
}
