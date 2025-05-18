import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "../styles/Navbar.scss"

function NavbarComponent() {
    return (
        <>
            <Navbar expand="lg" className="custom-navbar">
                <Container className="navbar-wrapper">
                    <div className="logo">
                        <NavLink to="/" className="navbar-brand">GreenSoul</NavLink>
                    </div>
                    <Nav className="nav-menu">
                        <NavLink to="/" className="nav-item">Trang chủ</NavLink>
                        <NavLink to="/gioithieu" className="nav-item">Giới thiệu</NavLink>
                        <NavLink to="/display" className="nav-item">Sản phẩm</NavLink>
                        <NavLink to="/360" className="nav-item">Trải nghiệm 360</NavLink>
                    </Nav>
                    <div className="user-icon">
                        <NavLink to="/admin">
                            <FaUserCircle size={35} className="user"></FaUserCircle>
                        </NavLink>
                    </div>
                </Container>
            </Navbar>
        </>
    );
}

export default NavbarComponent;