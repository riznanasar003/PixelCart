import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer from "./slices/wishlistSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage
import { combineReducers } from "@reduxjs/toolkit";


const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  wishlist: wishlistReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;