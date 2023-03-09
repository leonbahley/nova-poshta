import axios from "axios";
import { Container } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";

export default function DepartmentsPage() {
  const [page, setPage] = useState(1);
  const [cityQuery, setCityQuery] = useState("");
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState(null);

  const searchDepartments = async () => {
    try {
      const res = await axios({
        method: "post",
        url: "https://api.novaposhta.ua/v2.0/json/ ",
        data: {
          apiKey: process.env.REACT_APP_API_KEY,
          modelName: "Address",
          calledMethod: "getWarehouses",
          methodProperties: {
            CityName: cityQuery,
            Limit: "10",
            Page: page,
          },
        },
      });
      return res.data.data;
    } catch (error) {
      setError("Something went wrong");
    }
  };

  const handleSubmit = async (event) => {
    setPage(1);
    setCityQuery(event.target.elements["input"].value);
    setDepartments([]);
    event.preventDefault();
  };

  useEffect(() => {
    if (!cityQuery) {
      return;
    }
    searchDepartments().then((res) =>
      setDepartments((prev) => [...prev, ...res])
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, cityQuery]);

  return (
    <Container className="mx-0 mt-4">
      {error ? (
        <p>{error}</p>
      ) : (
        <>
          <Form
            onSubmit={handleSubmit}
            className="p-2"
            style={{ width: "300px" }}
          >
            <Form.Group className="mb-3" controlId="input">
              <Form.Control type="text" placeholder="Enter city name" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Search
            </Button>
          </Form>
          <ListGroup>
            {departments &&
              departments.map(({ SiteKey, Description }) => (
                <ListGroup.Item key={SiteKey}>
                  <p>{Description}</p>
                </ListGroup.Item>
              ))}
          </ListGroup>
          {departments.length !== 0 && (
            <Button
              onClick={() => setPage((prev) => prev + 1)}
              className="mt-2"
              variant="primary"
              type="button"
            >
              See more
            </Button>
          )}
        </>
      )}
    </Container>
  );
}
