import { delay, fork } from 'redux-saga/effects';

export function* forkProcess() {
  for (let i = 1; i <= 5; i++) {
    yield fork(process, i);
    yield delay(1000 * i);
  }
}

function* process(processId) {
  console.log(`Start process ${processId}`);
  yield delay(2000);
  console.log(`end process ${processId}`);
}
