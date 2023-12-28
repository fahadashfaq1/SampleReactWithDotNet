import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductForm from './ProductForm';

const EditProduct = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`https://localhost:7015/api/Products/${id}`).then((response) => {
      setProduct(response.data);
    });
  }, []);
  const handleOnSubmit = async (product) => {
    await axios.put(`https://localhost:7015/api/Products/${product.productID}`, product);
    navigate('/');
  };

  return (
    <div>
      <ProductForm
        name={product?.prodName}
        quantity={product?.quantity}
        price={product?.price}
        id={product?.productID}
        code={product?.productCode}
        _handleOnSubmit={handleOnSubmit}
      />
    </div>
  );
};

export default EditProduct;
