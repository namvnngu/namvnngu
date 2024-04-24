import { race, delay, call } from "redux-saga/effects";

export function* raceResult() {
  const { delay2000, delay3000, func } = yield race({
    delay2000: delay(2000),
    delay3000: delay(3000),
    // func: call(immediate),
  });
  console.log("delay2000", delay2000);
  console.log("delay3000", delay3000);
  console.log("func", func);
}

function* immediate() {
  return "immediate";
}
