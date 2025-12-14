import handler from "./index"

let reducer = (state = {...handler.state},action:{type:string})=>{
    //调用dispatch执行这个函数
    console.log("执行了reducer");
    let newState = JSON.parse(JSON.stringify(state))
    for(let keys in handler.actionNames){
        
        if(action.type === handler.actionNames[keys]){
            handler.actions[handler.actionNames[keys]](newState,action);
            break;
        }
    }
    //
    return newState
}
export default reducer