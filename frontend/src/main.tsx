import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { Exit } from './Components/Exit/Exit.tsx'
import './index.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Exit />
  </StrictMode>,
)
