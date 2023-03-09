import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

export default function TrackingPage() {
  return (
    <Container className="d-flex px-10px mx-0 mt-4 flex-wrap">
      <Container style={{ maxWidth: "500px" }} className="d-flex  mx-0 p-0">
        <Container className="d-flex flex-column p-0">
          <Form className="p-2" style={{ width: "300px" }}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Enter TTH" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Search
            </Button>
          </Form>
          <Container className=" mx-0">
            <p>
              Delivery status: <span>Recieved</span>
            </p>

            <p>
              вул. Розумовська, 29 Отримано: Відділення №13 (до 30 кг): просп.
              Гагаріна, 43
            </p>
          </Container>
        </Container>
      </Container>
      <Container style={{ width: "300px" }} className="d-flex flex-column mx-0">
        <h3>History</h3>
        <ListGroup>
          <ListGroup.Item>Cras justo odio</ListGroup.Item>
          <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
          <ListGroup.Item>Morbi leo risus</ListGroup.Item>
          <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
          <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
        </ListGroup>
      </Container>
    </Container>
  );
}
