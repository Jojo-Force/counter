
import Home from '../views'

// Navigatec重定向组件
// 懒加载的模式需要我们给他添加一个Loading组件
import {Navigate} from 'react-router-dom'



const routes = [
    // 嵌套路由开始
    {
        path:"/",
        element: <Home/>
    },
    // 嵌套路由结束
    // 访问其余路径的时候直接跳到首页
    {
        path:"*",
        element: <Navigate to="/"/>
    }
]

export default routes