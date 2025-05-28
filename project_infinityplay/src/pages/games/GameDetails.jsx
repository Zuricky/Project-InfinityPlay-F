import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Image, Spinner, Alert, Badge } from "react-bootstrap";

const GameDetail = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(`/api/games/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Game not found");
        return res.json();
      })
      .then((data) => {
        setGame(data);
        setError("");
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load game details.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Spinner animation="border" className="m-5" />;
  if (error)
    return (
      <Alert variant="danger" className="m-5">
        {error}
      </Alert>
    );
  if (!game) return null;

  return (
    <Container className="mt-5">
      <Row className="mb-4">
        <Col md={6}>
          <Image src={game.coverUrl} fluid rounded />
        </Col>
        <Col md={6}>
          <h2>{game.title}</h2>
          <p>
            <strong>Released:</strong> {game.releaseDate}
          </p>
          {game.rating && (
            <p>
              <strong>Rating:</strong> {game.rating}/5
            </p>
          )}
          {game.metacritic && (
            <p>
              <strong>Metacritic:</strong> <Badge bg="success">{game.metacritic}</Badge>
            </p>
          )}
          <p>
            <strong>Platforms:</strong> {game.platforms?.join(", ") || "N/A"}
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h4>Description</h4>
          <p>{game.description || "No description available."}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default GameDetail;
