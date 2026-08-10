import { configureStore } from "@reduxjs/toolkit";
import heroReducer from "./heroSlice";
import landingContentReducer from "./landingContentSlice";

export const store = configureStore({
  reducer: {
    hero: heroReducer,
    landingContent: landingContentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
