import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";

import { rootSaga } from "./sagas";
import { rootReducer } from './reducers';

const sagaMiddleware = createSagaMiddleware();
configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);

createRoot(document.getElementById("root")).render(<StrictMode />);
