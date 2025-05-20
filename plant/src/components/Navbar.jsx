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
