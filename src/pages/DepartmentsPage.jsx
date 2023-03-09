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
  const [areNoDepartmants, setAreNoDeaprtmants] = useState(false);

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
      setError(null);
      return res.data.data;
    } catch (error) {
      setError("Something went wrong");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setAreNoDeaprtmants(false);
    setPage(1);
    setCityQuery(event.target.elements["input"].value);
    setDepartments([]);
  };

  useEffect(() => {
    if (!cityQuery) {
      return;
    }
    searchDepartments().then((res) => {
      if (!res.length) {
        setAreNoDeaprtmants(true);
      }
      setDepartments((prev) => [...prev, ...res]);
    });
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
              <Form.Control
                required
                type="text"
                placeholder="Enter city name"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Search
            </Button>
          </Form>
          {areNoDepartmants && <p>There are no departments</p>}
          {departments.length !== 0 && (
            <>
              <ListGroup>
                {departments.map(({ SiteKey, Description }) => (
                  <ListGroup.Item key={SiteKey}>
                    <p>{Description}</p>
                  </ListGroup.Item>
                ))}
              </ListGroup>

              <Button
                onClick={() => setPage((prev) => prev + 1)}
                className="mt-2"
                variant="primary"
                type="button"
              >
                See more
              </Button>
            </>
          )}
        </>
      )}
    </Container>
  );
}
