import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reduxThunk from "redux-thunk";
import reducers from "./reducers/index";

const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(reduxThunk)
    // other store enhancers if any
  )
);

export default store;