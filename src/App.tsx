import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '@/Layout';
import Home from '@/pages/Home';
import ItemSearchPage from '@/pages/ItemSearchPage';
import SellRegistrationPage from '@/pages/SellRegistrationPage';
import BuyRegistrationPage from '@/pages/BuyRegistrationPage';
import TradeHistoryPage from '@/pages/TradeHistoryPage';
import SingUpPage from '@/pages/SignUpPage';
import MyPage from '@/pages/MyPage';
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
        path: 'trade-history',
        element: <TradeHistoryPage />,
      },
      {
        path: 'signup',
        element: <SingUpPage />,
      },
      {
        path: 'mypage',
        element: <MyPage />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
