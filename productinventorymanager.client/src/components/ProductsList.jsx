import { useState, useEffect } from 'react';
import _ from 'lodash'; // utility library
import Product from './Product';
import axios from 'axios';

const ProductsList = () => {
  // const,let, var
  const [products, setProducts] = useState();

  useEffect(() => {
    // Promises
    axios.get('https://localhost:7015/api/Products').then((response) => {
      setProducts(response.data);
    });
  }, []);

  const handleRemoveProduct = async (id) => {
    await axios.delete(`https://localhost:7015/api/Products/${id}`);
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.productID !== id)
    );
  };

  return (
    <div className='mt-4'>
      {!_.isEmpty(products) ? (
        products.map((product) => (
          <Product
            key={product.productID}
            id={product.productID}
            name={product.prodName}
            price={product.price}
            code={product.productCode}
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
  );
};

export default ProductsList;
