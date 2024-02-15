import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import '@/global.css';
import Layout from './Layout';
import Home from './pages/Home';
import SearchItemPage from './pages/SearchItemPage';
import SellItemPage from './pages/SellItemPage';
import TradeHistoryPage from './pages/TradeHistoryPage';
import SingUpPage from './pages/SignUpPage';
import LogInPage from './pages/LogInPage';

const router = createBrowserRouter([
  {
    path: '/etermarket/',
    element: <Layout />,
    children: [
      { path: '', element: <Home /> },
      {
        path: 'search-item',
        element: <SearchItemPage />,
      },
      {
        path: 'sell-item',
        element: <SellItemPage />,
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
        path: 'signin',
        element: <LogInPage />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
