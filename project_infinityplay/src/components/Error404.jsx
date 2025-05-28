import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Error404() {
  const navigate = useNavigate();

  return (
    <Container className="bg-logo text-center mt-5 pt-5 d-flex align-items-center justify-content-center">
      <Row>
        <Col>
          <h1 className="display-1 fw-bold text-accent">404</h1>
          <p className="fs-3">
            <span className="text-secondary">Oops!</span> Page not found.
          </p>
          <p className="lead">The page you're looking for doesn't exist or has been moved.</p>
          <Button variant="primary" onClick={() => navigate("/")} className="mt-3 rounded-pill px-4">
            Go to Home
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Error404;
