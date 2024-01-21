import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import '@/global.css';
import Layout from './Layout';
import Home from './pages/Home';
import ItemSearchPage from './pages/ItemSearchPage';
import TradeHistoryPage from './pages/TradeHistoryPage';
import SingUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';

const router = createBrowserRouter([
  {
    path: '/etermarket/',
    element: <Layout />,
    children: [
      { path: '', element: <Home /> },
      {
        path: 'itemsearch',
        element: <ItemSearchPage />,
      },
      {
        path: 'tradehistory',
        element: <TradeHistoryPage />,
      },
      {
        path: 'signup',
        element: <SingUpPage />,
      },
      {
        path: 'signin',
        element: <SignInPage />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
