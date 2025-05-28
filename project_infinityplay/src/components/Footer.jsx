import { Container } from "react-bootstrap";

function Footer() {
  return (
    <footer className="text-light pt-5 my-5">
      <Container>
        <p className="text-center">&copy; {new Date().getFullYear()} InfinityPlay. All rights reserved.</p>
      </Container>
    </footer>
  );
}

export default Footer;
