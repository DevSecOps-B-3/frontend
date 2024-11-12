import { createRoot } from 'react-dom/client'
import './style/index.css'
import Router from "./provider/router_provider"
import { TanstackProvider } from './provider/tanstack-provider'
import UserContextProvider from './provider/user_context_provider'
createRoot(document.getElementById('root')!).render(
  <TanstackProvider>
    <UserContextProvider>
      <Router />
    </UserContextProvider>
  </TanstackProvider>
)
