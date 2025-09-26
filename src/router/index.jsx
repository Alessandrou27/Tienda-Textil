import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Home from '../pages/Home/Home';
import Shop from '../pages/Shop/Shop';
import ProductDetail from '../pages/ProductDetail/ProductDetail';
import CustomOrders from '../pages/CustomOrders/CustomOrders';
import NotFound from '../pages/NotFound/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'shop',
        element: <Shop />
      },
      {
        path: 'product/:id',
        element: <ProductDetail />
      },
      {
        path: 'custom-orders',
        element: <CustomOrders />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
]);
