import { RouterProvider } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { router } from './router';
import './assets/variables.css';
import './App.css';

function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}

export default App;
