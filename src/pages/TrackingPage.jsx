import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import { useState } from "react";

export default function TrackingPage() {
  const [error, setError] = useState(null);
  const [packageInfo, setPackageInfo] = useState();
  const [isSpinnerVisible, setIsSpinnerVisible] = useState(false);

  const trackPackage = async (num) => {
    setIsSpinnerVisible(true);
    try {
      const res = await axios({
        method: "post",
        url: "https://api.novaposhta.ua/v2.0/json/ ",
        data: {
          apiKey: process.env.REACT_APP_API_KEY,
          modelName: "TrackingDocument",
          calledMethod: "getStatusDocuments",
          methodProperties: {
            Documents: [
              {
                DocumentNumber: num,
              },
            ],
          },
        },
      });
      setError(null);
      const { SenderAddress, RecipientAddress, Status, StatusCode } =
        res.data.data[0];

      setPackageInfo({ SenderAddress, RecipientAddress, Status, StatusCode });
    } catch (error) {
      setError("Something went wrong");
    } finally {
      setIsSpinnerVisible(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const num = e.target.elements["input"].value;
    trackPackage(num);
  };

  return (
    <Container className="d-flex px-10px mx-0 mt-4 flex-wrap">
      <Container style={{ maxWidth: "500px" }} className="d-flex  mx-0 p-0">
        <Container className="d-flex flex-column p-0">
          <Form
            onSubmit={handleSubmit}
            className="p-2"
            style={{ width: "300px" }}
          >
            <Form.Group className="mb-3" controlId="input">
              <Form.Control
                pattern="[0-9]{14}"
                type="text"
                placeholder="Enter TTH"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Search
            </Button>
          </Form>
          {isSpinnerVisible && <ClipLoader />}
          {packageInfo && (
            <Container className="mx-0">
              {error ? (
                <p>{error}</p>
              ) : (
                <>
                  {packageInfo?.StatusCode === "3" ? (
                    <p>{packageInfo?.Status}</p>
                  ) : (
                    <>
                      <p>
                        Delivery status: <span>{packageInfo?.Status}</span>
                      </p>
                      <p>
                        Sent: <span>{packageInfo?.SenderAddress}</span>
                      </p>
                      <p>
                        Delivered: <span>{packageInfo?.RecipientAddress}</span>
                      </p>
                    </>
                  )}
                </>
              )}
            </Container>
          )}
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
