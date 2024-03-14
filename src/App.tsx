import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '@/Layout';
import Home from '@/pages/Home';
import ItemSearchPage from '@/pages/ItemSearchPage';
import SellRegistrationPage from '@/pages/SellRegistrationPage';
import BuyRegistrationPage from '@/pages/BuyRegistrationPage';
import TradeHistoryPage from '@/pages/TradeHistoryPage';
import SingUpPage from '@/pages/SignUpPage';
import MyPage from '@/pages/MyPage';
import TradePostDetailsPage from '@/pages/TradePostDetailsPage';
import PrivateRoute from './utils/PrivateRoute';
import '@/global.css';

const router = createBrowserRouter([
  {
    path: '/etermarket/',
    element: <Layout />,
    children: [
      { path: '', element: <Home /> },
      {
        path: 'search-item',
        element: <ItemSearchPage />,
      },
      {
        path: 'sell-item',
        element: <SellRegistrationPage />,
      },
      {
        path: 'buy-item',
        element: <BuyRegistrationPage />,
      },
      {
        element: <PrivateRoute isRequiredAuthentication={true} />,
        children: [
          {
            path: 'mypage',
            element: <MyPage />,
          },
          {
            path: 'trade-post/:id',
            element: <TradePostDetailsPage />,
          },
          {
            path: 'trade-history',
            element: <TradeHistoryPage />,
          },
        ],
      },
      {
        element: <PrivateRoute isRequiredAuthentication={false} />,
        children: [
          {
            path: 'signup',
            element: <SingUpPage />,
          },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
