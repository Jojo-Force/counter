import { createRoot } from 'react-dom/client'
// 全局样式
import '@/assets/styles/global.scss'
// 组件的样式
import App from './App.tsx'
//import Router from './router/index copy'
import { BrowserRouter } from 'react-router-dom'

//状态管理
import {Provider} from 'react-redux'
import store from "@/store"

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
    <App/>
    </BrowserRouter>
  </Provider>
)
