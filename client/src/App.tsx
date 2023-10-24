import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import { Home } from './pages/Home/Home.tsx';
import { Search } from './pages/Search/Search.tsx';
import { ProductDetail } from './pages/ProductDetail/ProductDetail.tsx';
import { Cart } from './pages/Cart/Cart.tsx';
import Layout from './components/Layout';

function App() {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  })

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route element={<Layout />} >
            <Route path='/' element={<Home />} />
            <Route path='/search' element={<Search />} />
            <Route path='/products/:id' element={<ProductDetail />} />
            <Route path='/cart' element={<Cart />} />
          </Route>
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App;
