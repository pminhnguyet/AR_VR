import "../styles/Footer.scss";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaClock } from "react-icons/fa";

function Footer() {
    return (
        <>
            <footer className="footer">
                <div className="footer__content">
                    <div className="footer__section brand">
                        <h2>GreenSoul</h2>
                        <p>Năng lượng xanh - Cảm hứng sống</p>
                    </div>

                    <div className="footer__section nav">
                        <h4>Điều hướng</h4>
                        <ul>
                            <li><Link to="/" className="link">Trang chủ</Link></li>
                            <li><Link to="/gioithieu" className="link">Giới thiệu</Link></li>
                            <li><Link to="/display" className="link">Sản phẩm</Link></li>
                            <li><Link to="/lienhe" className="link">Liên hệ</Link></li>
                        </ul>
                       
                    </div>

                    <div className="footer__section about">
                        <h4>Về chúng tôi</h4>
                        <p>
                            GreenSoul là cửa hàng cây xanh thực tế với đa dạng các loại cây tươi, được chăm sóc kỹ lưỡng và trưng bày đẹp mắt.
                        </p>
                        <p>
                            Website này giúp bạn khám phá và trải nghiệm mô hình 3D của từng chậu cây, để bạn dễ dàng chọn lựa trước khi đến cửa hàng mua trực tiếp.
                        </p>
                    </div>

                    <div className="footer__section contact">
                        <h4>Hỗ trợ</h4>
                        <p>Email: support@greensoul.vn</p>
                        <p>Hotline: 0901 234 567</p>
                        <p>Hãy liên hệ với chúng tôi để được tư vấn chọn cây phù hợp cho không gian của bạn.</p>
                        <p><FaMapMarkerAlt /> Số 15, ngõ 22 đường An Huy, Nam Từ Liêm</p>
                        <p><FaClock /> Thứ hai - thứ bảy: 08:00 - 18:00</p>
                    </div>
                </div>
            </footer>
        </>
    )
}
export default Footer;