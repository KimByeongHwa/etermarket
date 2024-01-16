import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Home from './pages/Home';
import '@/global.css';
import ItemSearchPage from './pages/ItemSearchPage';
import TradeHistoryPage from './pages/TradeHistoryPage';
import SingUpPage from './pages/SignUpPage';
import LogInPage from './pages/LogInPage';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/itemSearch' element={<ItemSearchPage />} />
        <Route path='/tradeHistory' element={<TradeHistoryPage />} />
        <Route path='/signUp' element={<SingUpPage />} />
        <Route path='/logIn' element={<LogInPage />} />
      </Routes>
    </BrowserRouter>
  );
}
