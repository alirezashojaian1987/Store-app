import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { router } from './Routes/Routes';
import { RouterProvider } from 'react-router-dom';
import { CartProvider } from './Context/CartContext';

import './styles/globals.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={router}/>
    </CartProvider>
  </StrictMode>,
);