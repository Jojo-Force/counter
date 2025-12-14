import handleNum from "./NumStatus"
import handleArr from "./ArrStatus"
const defaultState = {
    // num:handleNum.state.num
    ...handleNum.state, //解构的写法
    ...handleArr.state
}

let reducer = (state = defaultState,action:{type:string,val:number})=>{
    //调用dispatch执行这个函数
    console.log("执行了reducer");
    let newState = JSON.parse(JSON.stringify(state))
    switch(action.type){
        case handleNum.add1:
            handleNum.actions[handleNum.add1](newState,action);
            break;
        case handleNum.add2:
            handleNum.actions[handleNum.add2](newState,action);
            break;
        default:
            break;
    }
    return newState
}
export default reducer