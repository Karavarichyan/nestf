import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.tsx'
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}  >
    <App />
    <ToastContainer  position='bottom-left' autoClose={2000}/>
    </Provider>
)
