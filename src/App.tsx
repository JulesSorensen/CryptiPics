import React, { useEffect } from 'react'
import Router from './Router'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import './assets/css/main.css'
import './assets/css/lnr-icons.css'
import '../node_modules/react-toastify/dist/ReactToastify.css'
import './assets/pcss/index.pcss'
import { StoreProvider } from './stores/index'

const App: React.FC = () => {
  return (
    <>
      <StoreProvider>
        <BrowserRouter>
          <Router />
          <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
        </BrowserRouter>
      </StoreProvider>
    </>
  )
}

export default App
