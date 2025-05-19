import "../styles/About.scss";
import block2Img from "../assets/images/about_block2.png";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoTime } from "react-icons/io5";
import { HiOutlineMailOpen } from "react-icons/hi";
import { FaHeadset } from "react-icons/fa";

function About() {
    return (
        <>
            <div className="about">
                <div className="block_1">
                    <div className="content">
                        <h1>Chúng tôi là GreenSoul</h1>
                        <p>Chúng tôi tin rằng mỗi chậu cây nhỏ có thể mang lại một nguồn cảm hứng lớn.</p>
                        <p>GreenSoul không chỉ bán cây – chúng tôi mang đến một cách sống: nhẹ nhàng, xanh mát và đầy năng lượng tích cực.</p>
                    </div>
                </div>

                <div className="block_2">
                    <div className="content">
                        <div className="text-wrapper">
                            <h1>Xanh từ suy nghĩ – <br></br><span>Xanh đến từng góc nhỏ</span></h1>
                            <p><strong className="strong_1">GreenSoul</strong> ra đời với mong muốn kết nối con người với thiên nhiên một cách gần gũi và hiện đại.</p>
                            <p>Chúng tôi tạo ra không gian khám phá nơi bạn có thể <strong className="strong_2">trải nghiệm cây xanh bằng công nghệ 3D</strong>, đồng thời lựa chọn được chậu cây phù hợp nhất trước khi đến cửa hàng.</p>
                        </div>
                    </div>
                    <div className="images">
                        <img src={block2Img} />
                    </div>
                </div>

                <div className="block_3">
                    <div className="content">
                        <div className="first_content">
                            <h1>Ghé thăm <span>không gian xanh</span> của chúng tôi</h1>

                            <div className="description">
                                <p>Hãy đến cửa hàng để cảm nhận trọn vẹn vẻ đẹp của từng chậu cây – từ hình dáng, sắc lá đến năng lượng mà mỗi loài cây mang lại.</p>
                                <p>Chúng tôi luôn sẵn sàng chào đón bạn với những gợi ý chân thành để cùng tạo nên một không gian sống đầy cảm hứng và thư thái.</p>
                            </div>
                        </div>
                        <div className="second_content">
                            <div className="address">
                                <div className="icon"><FaMapMarkerAlt size={30} /></div>
                                <p>Số 15, ngõ 22 đường An Huy, Nam Từ Liêm</p>
                            </div>
                            <div className="time">
                                <div className="icon"> <IoTime size={30} /></div>
                                <p>Thứ hai - thứ bảy: 08:00 - 18:00</p>
                            </div>
                        </div>

                    </div>
                    <div className="map">
                        <iframe className="iframe" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.1286429226843!2d105.78991285174318!3d20.98747981525358!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135acc864fe969b%3A0xf7cb3c594e67f57d!2zMTUgTmcuIDczIMSQLiBQaMO5bmcgS2hvYW5nLCBUcnVuZyBWxINuLCBOYW0gVOG7qyBMacOqbSwgSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1747583408412!5m2!1svi!2s"></iframe>
                    </div>

                </div>

                <div className="block_4">
                    <div className="email">
                        <div className="email-icon">
                            <HiOutlineMailOpen size={80}/>
                        </div>
                        <p className="title">Email</p>
                        <p className="subtitle">support@greensoul.vn</p>
                        <div className="description">
                            <p>Hãy liên hệ với chúng tôi qua email nếu bạn có bất kỳ thắc mắc nào về sản phẩm, đơn hàng hoặc cần được tư vấn chăm sóc cây.</p>
                            <p>Thời gian phản hồi: Trong vòng 24 giờ làm việc.</p>
                        </div>
                    </div>
                    <div className="hotline">
                        <div className="hotline-icon"><FaHeadset size={80}/></div>
                        <p className="title">Hỗ trợ</p>
                        <p className="subtitle">0901 234 567</p>
                        <div className="description">
                            <p>Đội ngũ GreenSoul luôn sẵn sàng lắng nghe và hỗ trợ bạn từ 8:00 đến 18:00 mỗi ngày (trừ Chủ Nhật).</p>
                            <p>Gọi cho chúng tôi nếu bạn cần tư vấn chọn cây, hướng dẫn chăm sóc hoặc hỗ trợ đơn hàng.</p>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}
export default About;