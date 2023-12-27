import React from 'react';
import ProductForm from './ProductForm';

const AddProduct = () => {
  const handleOnSubmit = (product) => {
    console.log(product);
  };

  return (
    <React.Fragment>
      <ProductForm _handleOnSubmit={handleOnSubmit} />
    </React.Fragment>
  );
};

export default AddProduct;