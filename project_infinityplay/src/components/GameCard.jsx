import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const GameCard = ({ game }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/games/${game.id}`);
  };

  return (
    <Card className="h-100 bg-dark border-secondary rounded-4" onClick={handleClick} style={{ cursor: "pointer" }}>
      <Card.Img variant="top" src={game.coverUrl} alt={game.title} className="rounded-top-4 img-fluid" style={{ maxHeight: "250px", objectFit: "cover" }} />
      <Card.Body>
        <Card.Title>{game.title}</Card.Title>
        <Card.Text>{game.releaseDate}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default GameCard;
