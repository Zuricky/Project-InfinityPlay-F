import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import GameCard from "../components/GameCard";

export default function HomePage() {
  const [featured, setFeatured] = useState([]);
  const [latest, setLatest] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/games?page=1&size=5")
      .then((res) => res.json())
      .then((data) => setFeatured(data))
      .catch(console.error);

    fetch("/api/games?page=1&size=20")
      .then((res) => res.json())
      .then((data) => {
        const sorted = [...data].sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
        setLatest(sorted.slice(0, 8));
      })
      .catch(console.error);
  }, []);

  const onSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    navigate(`/games?search=${encodeURIComponent(search)}`);
  };

  return (
    <>
      <Container className="py-5 my-4 px-5 rounded-pill border border-accent bg-dark text-center">
        <h2>Welcome to Project InfinityPlay</h2>
        <p>Your ultimate playground for discovering new titles!</p>
        <Button variant="primary" onClick={() => navigate("/games")} className="rounded-pill px-5">
          Browse All Games
        </Button>
      </Container>

      <Container>
        <Form className="my-5" onSubmit={onSearch}>
          <Row>
            <Col md={10}>
              <Form.Control
                type="text"
                placeholder="Search for games..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="rounded-pill border border-accent bg-dark"
              />
            </Col>
            <Col md={2}>
              <Button type="submit" className="w-100 rounded-pill">
                Search
              </Button>
            </Col>
          </Row>
        </Form>

        <h2 className="mb-3">Featured</h2>
        <Carousel className="mb-5">
          {featured.map((game) => (
            <Carousel.Item key={game.id}>
              <img className="w-100 rounded-5" src={game.coverUrl} alt={game.title} style={{ maxHeight: "650px" }} />
              <Carousel.Caption className="text-light bg-dark rounded-pill m-5 border border-accent">
                <h3>{game.title}</h3>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>

        <h2 className="mb-3">Latest Releases</h2>
        <Row xs={1} sm={2} md={4} className="g-4 mb-5">
          {latest.map((game) => (
            <Col key={game.id}>
              <GameCard game={game} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
