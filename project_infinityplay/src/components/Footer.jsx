import { Container } from "react-bootstrap";

function Footer() {
  return (
    <footer className="text-light py-4 mt-auto">
      <Container>
        <p className="text-center m-0">&copy; {new Date().getFullYear()} InfinityPlay. All rights reserved.</p>
      </Container>
    </footer>
  );
}

export default Footer;
