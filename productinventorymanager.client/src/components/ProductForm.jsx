import { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const generateRandomString = () => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';
  for (let i = 0; i < 6; i++) {
    randomString += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return randomString;
};

const ProductForm = ({
  id,
  name,
  quantity,
  price,
  code,
  _handleOnSubmit,
  fromAddProduct,
}) => {
  const [errorMsg, setErrorMsg] = useState('');
  const [product, setProduct] = useState({
    id,
    name,
    quantity,
    price,
  });
  console.log(product)
  useEffect(() => {
    setProduct({ name, quantity, price, id });
  }, [name, quantity, price, id]);
  const handleOnSubmit = (event) => {
    event.preventDefault();
    const values = [product.name, product.price, product.quantity];
    let errorMsg = '';

    const allFieldsFilled = values.every((field) => {
      const value = field ? `${field}`.trim() : '';
      return value !== '' && value !== '0';
    });

    if (allFieldsFilled) {
      const _product = {
        productCode: code || generateRandomString(),
        prodName: product.name,
        price: +product.price,
        quantity: +product.quantity,
        productID: product.id,
      };
      _handleOnSubmit(_product);
    } else {
      errorMsg = 'Please fill out all the fields.';
    }
    setErrorMsg(errorMsg);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'quantity':
        if (value === '' || parseInt(value) === +value) {
          setProduct((prevState) => ({
            ...prevState,
            [name]: value,
          }));
        }
        break;
      case 'price':
        if (value === '' || value.match(/^\d{1,}(\.\d{0,2})?$/)) {
          setProduct((prevState) => ({
            ...prevState,
            [name]: value,
          }));
        }
        break;
      default:
        setProduct((prevState) => ({
          ...prevState,
          [name]: value,
        }));
    }
  };

  return (
    <div>
      {errorMsg && <p className='text-start text-danger'>{errorMsg}</p>}
      <Form onSubmit={handleOnSubmit}>
        <Form.Group className='text-start mt-4' controlId='name'>
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            className='input-control'
            type='text'
            name='name'
            value={product.name}
            placeholder='Enter name of product'
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className='text-start mt-4' controlId='quantity'>
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            className='input-control'
            type='number'
            name='quantity'
            value={product.quantity}
            placeholder='Enter available quantity'
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className='text-start mt-4' controlId='price'>
          <Form.Label>Price</Form.Label>
          <Form.Control
            className='input-control'
            type='text'
            name='price'
            value={product.price}
            placeholder='Enter price of product'
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button
          variant='primary'
          type='submit'
          className='submit-btn mt-4 text-align-start'
        >
          {fromAddProduct ? 'Add Product' : 'Update Product'}
        </Button>
      </Form>
    </div>
  );
};

export default ProductForm;
