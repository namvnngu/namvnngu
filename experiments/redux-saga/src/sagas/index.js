import { fork } from "redux-saga/effects";

import { channelBuffer } from "./channelBuffer";
import { raceWithCall } from "./raceWithCall";
import { forkProcess } from "./forkProcess";
import { forkErrorBubble } from "./forkErrorBubble";
import { raceResult } from "./raceResult";
import { multiplePutTake } from "./multiplePutTake";
import { multicastChannelBuffer } from "./multicastChannelBuffer";
import { multicastChannelTakePattern } from "./multicastChannelTakePattern";

export function* rootSaga() {
  // yield fork(channelBuffer);
  // yield fork(raceWithCall);
  // yield fork(forkProcess);
  // yield fork(forkErrorBubble);
  // yield fork(raceResult);
  // yield fork(multiplePutTake);
  // yield fork(multicastChannelBuffer);
  yield fork(multicastChannelTakePattern);
}
