import { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Alert, Pagination, Form, Button } from "react-bootstrap";
import GameCard from "../../components/GameCard";
import { useSearchParams } from "react-router-dom";

const Games = () => {
  const [games, setGames] = useState([]);
  const [totalPages] = useState(10);
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1", 10);
  const search = searchParams.get("search") || "";
  const [searchInput, setSearchInput] = useState(search);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    const params = new URLSearchParams({ page: String(page), size: "20" });
    if (search) params.set("search", search);

    fetch(`/api/games?${params}`)
      .then((res) => {
        if (!res.ok) throw new Error("Fetch failed");
        return res.json();
      })
      .then((data) => {
        setGames(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load games.");
        setGames([]);
      })
      .finally(() => setLoading(false));
  }, [page, search]);

  const handleSearch = (e) => {
    e.preventDefault();
    const q = searchInput.trim();
    setSearchParams({ page: "1", ...(q ? { search: q } : {}) });
  };

  const goToPage = (n) => {
    setSearchParams({ page: String(n), ...(search ? { search } : {}) });
  };

  return (
    <Container className="mt-5" data-bs-theme="dark">
      <Form className="my-5" onSubmit={handleSearch}>
        <Row>
          <Col md={10}>
            <Form.Control
              type="text"
              placeholder="Search for games..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
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

      <h2 className="mb-4">Games</h2>
      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {games.map((game) => (
          <Col key={game.id}>
            <GameCard game={game} />
          </Col>
        ))}
      </Row>

      <Pagination className="justify-content-center mt-5">
        <Pagination.First onClick={() => goToPage(1)} disabled={page === 1} />
        <Pagination.Prev onClick={() => goToPage((p) => Math.max(1, p - 1))} disabled={page === 1} />
        {[...Array(totalPages)].map((_, i) => (
          <Pagination.Item key={i + 1} active={i + 1 === page} onClick={() => goToPage(i + 1)}>
            {i + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => goToPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} />
        <Pagination.Last onClick={() => goToPage(totalPages)} disabled={page === totalPages} />
      </Pagination>
    </Container>
  );
};

export default Games;
