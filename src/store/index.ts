import {legacy_createStore, combineReducers,compose,applyMiddleware} from "redux"
import reduxThunk from "redux-thunk"
import handleNum from "./NumStatus/reducer"
import handleArr from "./ArrStatus/reducer"

//组合各个模块的reducer
const reducers = combineReducers({
    handleNum,
    handleArr
})

// 创建数据仓库
// window.__REDUX_DEVTOOLS_EXTENSION__  ： 支持Redux_Tools插件能观察状态的变化
// const store = legacy_createStore(reducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// 插件支持异步redux-thunk
let composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}):compose
const store = legacy_createStore(reducers,composeEnhancers(applyMiddleware(reduxThunk)));
export default store