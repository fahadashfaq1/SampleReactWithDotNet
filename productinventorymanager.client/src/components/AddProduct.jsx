import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductForm from './ProductForm';

const AddProduct = () => {
  const navigate = useNavigate();
  const handleOnSubmit = async (product) => {
    await axios.post('https://localhost:7015/api/Products', product);
    navigate('/');
  };

  return (
    <ProductForm _handleOnSubmit={handleOnSubmit} fromAddProduct />
  );
};

export default AddProduct;
