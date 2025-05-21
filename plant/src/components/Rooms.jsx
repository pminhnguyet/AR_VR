import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import "../styles/Rooms.scss";
import img1 from "../assets/images/360_1.png";
import img2 from "../assets/images/360_2.png";
import img3 from "../assets/images/360_3.png";
import img4 from "../assets/images/360_4.png";

const rooms = [
    { id: 1, img: img1, title: "Không gian mẫu 1" },
    { id: 2, img: img2, title: "Không gian mẫu 2" },
    { id: 3, img: img3, title: "Không gian mẫu 3" },
    { id: 4, img: img4, title: "Không gian mẫu 4" },
];

function Rooms() {
    return (
        <>
            <div className="rooms-wrapper">
                <div className="rooms-intro">
                    {/* <div className="content">
                        <h2>Khám phá không gian xanh</h2>
                        <p>
                            Với các <strong>không gian mẫu thực tế qua ảnh 360°</strong>, bạn sẽ được <strong>trải nghiệm như đang thực sự bước vào bên trong căn phòng</strong> với tương tác xoay nhìn toàn cảnh, cảm nhận ánh sáng, bố cục và cách cây xanh hòa quyện với nội thất xung quanh.
                        </p>
                        <p>
                            Trải nghiệm này sẽ giúp bạn cảm nhận sâu sắc không gian xung quanh, để bạn dễ dàng tìm ra cách bài trí tinh tế và phù hợp nhất cho tổ ấm của mình.
                        </p>
                      
                        <p><em>Chọn một không gian bên dưới và bắt đầu hành trình khám phá 360° ngay bây giờ.</em></p>
                    </div> */}
                    <motion.div
                        className="content"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            visible: {
                                transition: {
                                    staggerChildren: 0.5, // delay giữa các phần tử con
                                },
                            },
                        }}
                    >
                        <motion.h2
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            transition={{ duration: 1}}
                        >
                            Khám phá không gian xanh
                        </motion.h2>

                        <motion.p
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            transition={{ duration: 1}}
                        >
                            Với các <strong>không gian mẫu thực tế qua ảnh 360°</strong>, bạn sẽ được{" "}
                            <strong>trải nghiệm như đang thực sự bước vào bên trong căn phòng</strong> với tương tác xoay nhìn toàn cảnh, cảm nhận ánh sáng, bố cục và cách cây xanh hòa quyện với nội thất xung quanh.
                        </motion.p>

                        <motion.p
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            transition={{ duration:1 }}
                        >
                            Trải nghiệm này sẽ giúp bạn cảm nhận sâu sắc không gian xung quanh, để bạn dễ dàng tìm ra cách bài trí tinh tế và phù hợp nhất cho tổ ấm của mình.
                        </motion.p>

                        <motion.p
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            transition={{ duration: 1 }}
                        >
                            <em>Chọn một không gian bên dưới và bắt đầu hành trình khám phá 360° ngay bây giờ.</em>
                        </motion.p>
                    </motion.div>
                </div>

                <div className="rooms-container">
                    {rooms.map(room => (
                        <Link to={`/room/${room.id}`} className="room-card" key={room.id}>
                            <img src={room.img} alt={room.title} />
                            <h3>{room.title}</h3>
                        </Link>
                    ))}
                </div>
            </div>

        </>

    );
}

export default Rooms;
