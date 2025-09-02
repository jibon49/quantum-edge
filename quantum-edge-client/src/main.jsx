import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { 
  RouterProvider,
} from "react-router-dom";
import { router } from './Routes/Routes';
import AuthProviders from './Authproviders/Authproviders';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProviders>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </AuthProviders>
  </StrictMode>,
)
