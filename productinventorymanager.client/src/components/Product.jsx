import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Product = ({
  id,
  name,
  price,
  code,
  quantity,
  handleRemoveProduct
}) => {
  const navigate = useNavigate();

  return (
    <Card style={{ width: '18rem', margin: 'auto', marginBottom: '20px' }}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <div className="d-flex-column my-4">
          <div><b>Code:</b> {code} </div>
          <div><b>Quantity:</b> {quantity} </div>
          <div><b>Price:</b> ${price} </div>
        </div>
        <Button variant="primary" onClick={() => navigate(`/edit/${code}`)}>
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