// import { Navbar, Nav, Container, Modal, Button, Form, InputGroup } from "react-bootstrap";
// import { NavLink } from "react-router-dom";
// import { FaUserCircle } from "react-icons/fa";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaEye, FaEyeSlash } from 'react-icons/fa';
// // import 'bootstrap/dist/css/bootstrap.min.css';

// import "../styles/Navbar.scss";

// function NavbarComponent({ isAdminLoggedIn, setIsAdminLoggedIn }) {
//     const [showLogin, setShowLogin] = useState(false);
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const [showPassword, setShowPassword] = useState(false);
//     const navigate = useNavigate();

//     const handleLogin = () => {
//         if (username === "admin" && password == "12345678") {
//             setIsAdminLoggedIn(true);
//             setShowLogin(false);
//             setError("");
//             navigate("/admin");
//         } else {
//             setError('Sai tài khoản hoặc mật khẩu');
//         }
//     }

//     return (
//         <>
//             <div className="bs-scope">
//                 <Navbar expand="lg" className="custom-navbar">
//                     <Container className="navbar-wrapper">
//                         <div className="logo">
//                             <NavLink to="/" className="navbar-brand">GreenSoul</NavLink>
//                         </div>
//                         <Nav className="nav-menu">
//                             <NavLink to="/" className="nav-item">Trang chủ</NavLink>
//                             <NavLink to="/gioithieu" className="nav-item">Giới thiệu</NavLink>
//                             <NavLink to="/display" className="nav-item">Sản phẩm</NavLink>
//                             <NavLink to="/360" className="nav-item">Trải nghiệm 360</NavLink>
//                         </Nav>
//                         <div className="user-icon" onClick={() => {
//                             if (isAdminLoggedIn) {
//                                 navigate("/admin");
//                             } else {
//                                 setShowLogin(true);
//                             }
//                         }}>
//                             {/* <NavLink to="/admin"> */}
//                             <FaUserCircle size={35} className="user"></FaUserCircle>
//                             {/* </NavLink> */}
//                         </div>
//                     </Container>
//                 </Navbar>

//                 {/* Modal đăng nhập */}
//                 {/* <Modal show={showLogin} onHide={() => setShowLogin(false)} centered >
//                 <div className="popup">
//                     <h2 >Đăng nhập</h2>
//                     <Form onSubmit={handleLogin}>
//                         <Form.Group controlId="formBasicEmail">
//                             <Form.Label>Tên đăng nhập</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 placeholder="Nhập tên đăng nhập"
//                                 value={username}
//                                 onChange={(e) => setUsername(e.target.value)}
//                                 required
//                                 className="mb-3"
//                             />
//                         </Form.Group>
//                         <Form.Group controlId="formBasicPassword">
//                             <Form.Label>Mật khẩu</Form.Label>
//                             <InputGroup className="mb-3">
//                                 <Form.Control
//                                     type={showPassword ? 'text' : 'password'}
//                                     placeholder="Nhập mật khẩu"
//                                     value={password}
//                                     onChange={(e) => setPassword(e.target.value)}
//                                     required
//                                 />
//                                 <Button
//                                     variant="outline-primary"
//                                     onClick={() => setShowPassword((prev) => !prev)}
//                                     type="button"
//                                 >
//                                     {showPassword ? <FaEyeSlash /> : <FaEye />}
//                                 </Button>
//                             </InputGroup>
//                         </Form.Group>
//                         <div className="d-grid mt-3">

//                             <Button onClick={handleLogin}>Đăng nhập</Button>
//                         </div>

//                     </Form>

//                 </div>
//             </Modal> */}
//                 <Modal className="custom-login-modal" show={showLogin} onHide={() => setShowLogin(false)} centered>
//                     <Modal.Header closeButton>
//                         <Modal.Title >Đăng nhập</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         <Form>
//                             <Form.Group>
//                                 <Form.Label>Tài khoản</Form.Label>
//                                 <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Nhập tài khoản" required />
//                             </Form.Group>
//                             <Form.Group>
//                                 <Form.Label>Mật khẩu</Form.Label>
//                                 <InputGroup>
//                                     <Form.Control type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Nhập mật khẩu" required />
//                                     <Button
//                                         variant="outline-primary"
//                                         onClick={() => setShowPassword((prev) => !prev)}
//                                         type="button"
//                                     >
//                                         {showPassword ? <FaEyeSlash /> : <FaEye />}
//                                     </Button>
//                                 </InputGroup>

//                             </Form.Group>
//                             {error && <p style={{ color: 'red' }}>{error}</p>}
//                         </Form>
//                     </Modal.Body>
//                     <Modal.Footer>
//                         <Button variant="secondary" onClick={() => setShowLogin(false)}>Hủy</Button>
//                         <Button variant="primary" onClick={handleLogin}>Đăng nhập</Button>
//                     </Modal.Footer>
//                 </Modal>
//             </div>
//         </>
//     );
// }

// export default NavbarComponent;



import { NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import "../styles/Navbar.scss";

function NavbarComponent({ isAdminLoggedIn, setIsAdminLoggedIn }) {
    const [showLogin, setShowLogin] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = () => {
        if (username === "admin" && password === "12345678") {
            setIsAdminLoggedIn(true);
            setShowLogin(false);
            setError("");
            navigate("/admin");
        } else {
            setError('Sai tài khoản hoặc mật khẩu');
        }
    };

    return (
        <>
            <div className="bs-scope">
                <nav className="custom-navbar">
                    <div className="navbar-wrapper container">
                        <div className="logo">
                            <NavLink to="/" className="navbar-brand">GreenSoul</NavLink>
                        </div>
                        <div className="nav-menu">
                            <NavLink to="/" className="nav-item">Trang chủ</NavLink>
                            <NavLink to="/gioithieu" className="nav-item">Giới thiệu</NavLink>
                            <NavLink to="/display" className="nav-item">Sản phẩm</NavLink>
                            <NavLink to="/360" className="nav-item">Trải nghiệm 360</NavLink>
                        </div>
                        <div className="user-icon" onClick={() => {
                            if (isAdminLoggedIn) {
                                navigate("/admin");
                            } else {
                                setShowLogin(true);
                            }
                        }}>
                            <FaUserCircle size={35} className="user" />
                        </div>
                    </div>
                </nav>

                {showLogin && (
                    <div className="custom-login-modal modal-overlay">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Đăng nhập</h5>
                                <button className="close-button" onClick={() => setShowLogin(false)}>×</button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label className="form-label">Tài khoản</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="Nhập tài khoản"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Mật khẩu</label>
                                    <div className="input-group">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            className="form-control"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Nhập mật khẩu"
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-outline-primary eye-button"
                                            onClick={() => setShowPassword(prev => !prev)}
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                </div>
                                {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowLogin(false)}>Hủy</button>
                                <button className="btn btn-primary" onClick={handleLogin}>Đăng nhập</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default NavbarComponent;
