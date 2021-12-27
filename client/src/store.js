import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
    userLoginReducer,
    userRegisterReducer,
    userUpdateReducer,
} from "./reducers/userReducers";
import {
    noteCreateReducer,
    noteDeleteReducer,
    noteListReducer,
    noteUpdateReducer,
} from "./reducers/notesReducers";

const reducer = combineReducers({
    // Add reducers from userReducers.js:
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userUpdate: userUpdateReducer,
    noteList: noteListReducer,
    noteCreate: noteCreateReducer,
    noteUpdate: noteUpdateReducer,
    noteDelete: noteDeleteReducer,
});

// Fetch User data from localStorage:
const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")) // Convert data string to an object
    : null;

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
