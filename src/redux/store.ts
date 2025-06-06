import {
  Action,
  configureStore,
  ThunkAction,
  combineReducers,
} from "@reduxjs/toolkit";
import authSlice from "./reducers/authSlice";
import customerSlice from "./reducers/customerSlice";
import branchReducer from "./reducers/branchSlice";
import tableReducer from "./reducers/tableSlice";
import categoryReducer from "./reducers/categorySlice";

const appReducer = combineReducers({
  auth: authSlice,
  customer: customerSlice,
  branch: branchReducer,
  table: tableReducer,
  category: categoryReducer,
});

// Root reducer with RESET_STATE functionality
const rootReducer = (
  state: ReturnType<typeof appReducer> | undefined,
  action: Action
) => {
  if (action.type === "RESET_STATE") {
    state = undefined; // Clear the entire state by setting it to undefined
  }
  return appReducer(state, action);
};

// Configure the store
const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
