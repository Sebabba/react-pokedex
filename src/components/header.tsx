import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function Header() {
    return(
        <Navbar expand="lg" className='charcoal-100' data-bs-theme='dark'>
            <Container>
                <Navbar.Brand>Pokedex</Navbar.Brand>
            </Container>
        </Navbar>
    )
}