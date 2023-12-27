import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

const ProductForm = ({ name, quantity, price, _handleOnSubmit}) => {
  const [product, setProduct] = useState({
    name: name || '',
    quantity: quantity || '',
    price: price || '',
  });

  const [errorMsg, setErrorMsg] = useState('');
  const handleOnSubmit = (event) => {
    event.preventDefault();
    console.log(product);
    const values = [product.name, product.price, product.quantity];
    let errorMsg = '';

    const allFieldsFilled = values.every((field) => {
      const value = `${field}`.trim();
      return value !== '' && value !== '0';
    });

    if (allFieldsFilled) {
      const _product = {
        id: uuidv4(),
        name: product.name,
        price: product.price,
        quantity: product.quantity,
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
            [name]: value
          }));
        }
        break;
      case 'price':
        if (value === '' || value.match(/^\d{1,}(\.\d{0,2})?$/)) {
          setProduct((prevState) => ({
            ...prevState,
            [name]: value
          }));
        }
        break;
      default:
        setProduct((prevState) => ({
          ...prevState,
          [name]: value
        }));
    }
  };

  return (
    <div className="main-form">
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      <Form onSubmit={handleOnSubmit}>
        <Form.Group className="text-start mt-4" controlId="name">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="name"
            value={name}
            placeholder="Enter name of product"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="text-start mt-4" controlId="quantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            className="input-control"
            type="number"
            name="quantity"
            value={quantity}
            placeholder="Enter available quantity"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="text-start mt-4" controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="price"
            value={price}
            placeholder="Enter price of product"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="submit-btn mt-4 text-align-start">
          Add Product
        </Button>
      </Form>
    </div>
  );
};

export default ProductForm;