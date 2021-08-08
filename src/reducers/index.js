import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import { encryptTransform } from "redux-persist-transform-encrypt";
import session from "redux-persist/lib/storage/session";
import accessReducer from "./accessReducer";
// import { createSlice} from "@reduxjs/toolkit";
// const rootPersistConfig = {
//     key: "root",
//     storage,
//     whitelist: ["auth"],
// };

const encryptor = encryptTransform({
  secretKey: "myKey",
  onError: function (error) {
    console.log(error);
  },
});

const authPersistConfig = {
  key: "auth",
  storage: session,
  transforms: [encryptor],
  blacklist: ["auth"],
};

const accessPersistConfig = {
  key: "access",
  storage: session,
  transforms: [encryptor],
  blacklist: ["access"],
};

const appReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  access: persistReducer(accessPersistConfig, accessReducer),
  errors: errorReducer,
});

export default appReducer;