import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.scss'

const NavBar = () => {
    return (
        <>
         <Navbar bg="primary" data-bs-theme="dark" className={styles.NavBar}>
             <Container>
             <Navbar.Brand href="#home">Waiter.app</Navbar.Brand>
             <Nav>
                <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            </Nav>
             </Container>
         </Navbar>
        </>
    );
};

export default NavBar;