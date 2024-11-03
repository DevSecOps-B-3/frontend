import { createRoot } from 'react-dom/client'
import './style/index.css'
import Router from "./provider/router_provider"
import { TanstackProvider } from './provider/tanstack-provider'
createRoot(document.getElementById('root')!).render(
  <TanstackProvider>
    <Router />
  </TanstackProvider>
)
