import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import AddProduct from '../components/AddProduct';
import ProductsList from '../components/ProductsList';
import EditProduct from '../components/EditProduct';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <div className="main-content">
          <Routes>
            <Route element={<ProductsList />} path="/" exact={true} />
            <Route element={<AddProduct />} path="/add" />
            <Route element={<EditProduct />} path="/edit/:id" />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;