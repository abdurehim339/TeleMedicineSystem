import { Card, Button, Col } from "react-bootstrap";
import "./card.scss";
import { BASE_URL } from "../../../services/api_endpoint";
const card = (props) => {
  return props.args.map((value, k) => (
    <Col key={k} lg={3} md={4} sm={12}>
      <Card className="customCard shadow-lg">
        <Card.Img
          variant="top"
          src={`${BASE_URL}/${value.userDoctor.imagePath}`}
          alt="header pic"
          width={200}
          height={200}
        
        />
        <Card.Body>
          <Card.Title>{value.firstName +" "+ value.lastName } </Card.Title>
          <Card.Text>{value.userDoctor.specialization + " specialist"}</Card.Text>
          <Card.Text>phone:{value.phone}</Card.Text>
          <Card.Text>id:{value.id}</Card.Text>
          <Button variant="primary" className="view-button">
            view
          </Button>
        </Card.Body>
      </Card>
    </Col>
  ));
};
export default card;
