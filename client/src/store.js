import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer } from "./reducers/userReducers";
import { userRegisterReducer } from "./reducers/userReducers";

const reducer = combineReducers({
    // Add reducers from userReducers.js:
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
});

// Fetch User data from localStorage:
const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")) // Convert data string to an object
    : null;

const initialState = {
    userLogin: { userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
