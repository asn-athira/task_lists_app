import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, NavbarBrand, Container } from 'react-bootstrap';

function Navmenu() {
  return (
   
    <Navbar bg="dark" variant="dark">
      <Container>
        <NavbarBrand href="tasks">ToodleDo</NavbarBrand>
        
      </Container>
    </Navbar>
  );
}

export default Navmenu;
