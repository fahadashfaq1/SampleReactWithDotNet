import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import Product from './Product';
import axios from 'axios';

const ProductsList = () => {
  const [products, setBooks] = useState([
    {
      id: 2,
      name: 'LED TV',
      quantity: 5,
      price: '450',
    },
  ]);

  useEffect(() => {
    // Make a GET request when the component mounts
    axios.get('https://localhost:7015/api/Products')
      .then(response => {
        // Handle successful response
        // test commit
        console.log(response.data);
      })
      .catch(error => {
        // Handle error
        console.log(error.message);
      });
  }, []);

  const handleRemoveProduct = (id) => {
    setBooks(products.filter((product) => product.id !== id));
  };

  return (
    <React.Fragment>
      <div className='mt-4'>
        {!_.isEmpty(products) ? (
          products.map((product) => (
            <Product
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
              handleRemoveProduct={handleRemoveProduct}
            />
          ))
        ) : (
          <h5 className='text-start'>
            No products available. Please add some products.
          </h5>
        )}
      </div>
    </React.Fragment>
  );
};

export default ProductsList;
