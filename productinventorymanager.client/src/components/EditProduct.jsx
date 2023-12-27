import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ProductForm from './ProductForm';

const EditBook = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([
    {
      id: 2,
      name: 'LED TV',
      quantity: 5,
      price: '450',
    },
  ]);
  const { id } = useParams();
  const productToEdit = products.find((product) => product.id === +id);

  const handleOnSubmit = (product) => {
    const filteredProducts = products.filter((product) => product.id !== id);
    setProducts([product, ...filteredProducts]);
    navigate('/');
  };

  return (
    <div>
      <ProductForm
        name={productToEdit.name}
        quantity={productToEdit.quantity}
        price={productToEdit.price}
        handleOnSubmit={handleOnSubmit}
      />
    </div>
  );
};

export default EditBook;
