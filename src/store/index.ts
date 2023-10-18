import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./search";


const makeStore = () => {
  // 미들웨어 추가(필요 없을 경우 생략)
  // const middleware = getDefaultMiddleware();
  // if (process.env.NODE_ENV === "development") {
  //   middleware.push(logger);
  // }

  // 슬라이스 통합 store 생성
  const store = configureStore({
    reducer: {
      search: searchReducer,
    },
  });

  return store;
};

const store = makeStore();

// store 엑스포트
export default store;

// RootState 엑스포트
export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;