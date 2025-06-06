import { useState, useContext } from "react";
import { Form, Button, Container, Row, Col, Alert, Spinner } from "react-bootstrap";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, loadingUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(username, password);
      const waitForUser = setInterval(() => {
        if (!loadingUser) {
          clearInterval(waitForUser);
          navigate("/");
        }
      }, 100);
    } catch (err) {
      setError(err.message || "Invalid credentials");
      setSubmitting(false);
    }
  };

  return (
    <Container className="bg-logo mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6} lg={5}>
          <h2 className="mb-4 text-center">Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
                className="border-secondary rounded-pill"
                disabled={submitting || loadingUser}
              />
            </Form.Group>
            <Form.Group controlId="password" className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                className="border-secondary rounded-pill"
                disabled={submitting || loadingUser}
              />
            </Form.Group>

            <p className="text-center">
              Don't have an account?{" "}
              <a href="/register" className="text-accent">
                Sign In
              </a>
            </p>

            <div className="d-grid">
              <Button type="submit" className="rounded-pill" disabled={submitting || loadingUser}>
                {submitting || loadingUser ? (
                  <>
                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> Logging in…
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
