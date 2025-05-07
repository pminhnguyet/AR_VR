import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.scss"

function NavbarComponent() {
    return (
        <>
            <Navbar expand="lg" className="custom-navbar">
                <Container className="justify-content-center">
                    <Nav className="nav-center">
                       
                        <NavLink to="/" className="nav-item">Dashboard</NavLink>
                        <NavLink to="/display" className="nav-item">Display</NavLink>
                        <NavLink to="/admin" className="nav-item">Admin</NavLink>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default NavbarComponent;