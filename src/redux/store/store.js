import {combineReducers,createStore} from "redux"
import {listReducer} from "../reducer/reducer"

const reducer = combineReducers({
    listReducer
})

export const store = createStore(
    reducer ,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)