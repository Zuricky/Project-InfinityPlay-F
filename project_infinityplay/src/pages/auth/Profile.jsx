import { useState, useContext, useEffect } from "react";
import { Form, Button, Container, Alert, Row, Col } from "react-bootstrap";
import { AuthContext } from "../../contexts/AuthContext";

function Profile() {
  const { token, user } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setUsername(user.username);
      setPassword(user.password);
    }
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ email, username, password }),
    });
    if (res.ok) setMsg("Profile updated");
    else setMsg("Update failed");
  };

  return (
    <Container className="bg-logo mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <h2 className="mb-4">Your Profile</h2>

          {msg.text && <Alert variant={msg.variant}>{msg.text}</Alert>}

          <Form onSubmit={handleSave}>
            <Form.Group className="mb-3" controlId="profileEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-secondary rounded-pill"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="profileUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border-secondary rounded-pill"
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="profilePassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Leave blank to keep current"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-secondary rounded-pill"
              />
              <Form.Text className="text-muted">Enter a new password only if you wish to change it.</Form.Text>
            </Form.Group>

            <div className="d-grid">
              <Button variant="primary" type="submit" className="rounded-pill">
                Save Changes
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
