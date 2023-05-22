import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import CalculogApp from './CalculogApp'
import React from 'react'
import ReactDOM from 'react-dom/client'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CalculogApp />
  </React.StrictMode>,
)
