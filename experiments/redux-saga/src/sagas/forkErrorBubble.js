import { fork, delay } from 'redux-saga/effects';

export function* forkErrorBubble() {
  try {
    for (let i = 1; i <= 5; i++) {
      yield fork(process, i, i * 1000);
    }
  } catch (error) {
    console.error('Error in forkErrorBubble', error);
  }
}

function* process(processId, processDelay) {
  // try {
  console.log(`Start process ${processId}`);
  yield delay(processDelay);
  if (processId === 3) {
    yield call(throwError, processId);
  }
  console.log(`End process ${processId}`);
  // } catch (error) {
  //   console.error(`Error process ${processId}`);
  // }
}

function* throwError(processId) {
  throw Error(processId);
}
