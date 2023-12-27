import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Product = ({
  id,
  name,
  price,
  quantity,
  handleRemoveProduct
}) => {
  const navigate = useNavigate();

  return (
    <Card style={{ width: '18rem', margin: 'auto' }} className="product">
      <Card.Body>
        <Card.Title className="product-title">{name}</Card.Title>
        <div className="d-flex-column my-4">
          <div><b>Quantity:</b> {quantity} </div>
          <div><b>Price:</b> ${price} </div>
        </div>
        <Button variant="primary" onClick={() => navigate(`/edit/${id}`)}>
          Edit
        </Button>{' '}
        <Button variant="danger" onClick={() => handleRemoveProduct(id)}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Product;