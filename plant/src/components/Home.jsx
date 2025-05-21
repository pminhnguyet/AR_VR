import "../styles/Home.scss";
import React, { useState, useEffect, useRef } from "react";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { motion, useInView } from "framer-motion";
import { useFrame } from "@react-three/fiber";
import kimImg from "../assets/images/kim.png";
import mocImg from "../assets/images/moc.png";
import thuyImg from "../assets/images/thuy.png";
import hoaImg from "../assets/images/hoa.png";
import thoImg from "../assets/images/tho.png";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import block3_to from "../assets/images/block3_to.png";
import block3_nho from "../assets/images/block3_nho.png";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoTime } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
// function Model({ url }) {
//     const { scene } = useGLTF(url);

//     return <primitive object={scene} scale={70} rotation={[0, -Math.PI / 3, 0]} position={[0, -25, 0]} />
// }
function Model({ url }) {
    const { scene } = useGLTF(url);
    const ref = useRef();
    const targetY = -25;    // Vị trí Y cuối cùng
    const startY = -50;     // Vị trí Y ban đầu (dưới thấp hơn)
    const speed = 0.5;      // tốc độ đi lên

    // Khởi tạo vị trí dưới
    if (ref.current && ref.current.position.y === 0) {
        ref.current.position.y = startY;
    }

    // Dùng useFrame để tăng dần Y đến targetY
    useFrame(() => {
        if (!ref.current) return;
        if (ref.current.position.y < targetY) {
            ref.current.position.y += speed;
            if (ref.current.position.y > targetY) {
                ref.current.position.y = targetY;
            }
        }
    });

    return (
        <primitive
            ref={ref}
            object={scene}
            scale={70}
            rotation={[0, -Math.PI / 3, 0]}
            position={[0, startY, 0]} // bắt đầu từ dưới
        />
    );
}


function Home() {
    const plantData = [
        {
            name: "Kim",
            description: "Tinh tế & thanh lọc",
            image: kimImg
        },
        {
            name: "Mộc",
            description: "Sinh trưởng & sáng tạo",
            image: mocImg
        },
        {
            name: "Thủy",
            description: "Dịu dàng & linh hoạt",
            image: thuyImg
        },
        {
            name: "Hỏa",
            description: "Nhiệt huyết & năng lượng",
            image: hoaImg
        },
        {
            name: "Thổ",
            description: "Vững vàng & ổn định",
            image: thoImg
        }
    ];
    const [currentIndex, setCurrentIndex] = useState(0);
    const visiblePlants = plantData.slice(currentIndex, currentIndex + 4);

    const handleNext = () => {
        if (currentIndex + 4 < plantData.length) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };



    const [model, setModel] = useState(null);
    const [latests, setLatests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasAnimated, setHasAnimated] = useState(false);



    useEffect(() => {
        fetch("http://localhost:8080/api/plant/6")
            .then((res) => res.json())
            .then((data) => {
                console.log("Fetch data:", data);
                setModel(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Lỗi khi fetch model:", error);
                setLoading(false);
            });
        setHasAnimated(true);
    }, []);


    useEffect(() => {
        fetch("http://localhost:8080/api/plant")
            .then((res) => res.json())
            .then((data) => {
                const sorted = [...data.content].sort((a, b) => b.id - a.id);
                const ten_latest = sorted.slice(0, 6);
                setLatests(ten_latest);
            })
            .catch((err) => console.error("Lỗi khi fetch models:", err));
    }, []);

    const [currentIdx, setCurrentIdx] = useState(0);
    const Products = latests.slice(currentIdx, currentIdx + 4);
    const handleNextProducts = () => {
        if (currentIdx + 4 < latests.length) {
            setCurrentIdx(currentIdx + 1);
        }
    }
    const handlePrevProducts = () => {
        if (currentIdx > 0) {
            setCurrentIdx(currentIdx - 1);
        }
    }

    console.log("Latest:", latests);
    const navigate = useNavigate();

    const handleClickProduct = (id) => {
        navigate(`/detail/${id}`);
    };



    const handleClickCategory = (categoryName) => {
        navigate(`/display?category=${encodeURIComponent(categoryName)}`);
    };



    if (loading) {
        return <div >Đang tải mô hình...</div>;
    }

    if (!model) {
        return <div>Không tìm thấy mô hình.</div>;
    }




    return (
        <>
            <div className="home">
                <div className="block_1" >
                    <div className="content">
                        <div className="text" >
                            {/* <h1>
                                Mang hơi thở thiên nhiên<br />
                                <span>vào từng góc nhỏ</span>
                            </h1> */}
                            <motion.h1
                                initial={{ opacity: 0, y: 100 }}
                                animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.5 }}
                            >
                                Mang hơi thở thiên nhiên<br />
                                <span>vào từng góc nhỏ</span>
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 30 }}
                                animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: 1 }}>
                                Khám phá những chậu cây được tuyển chọn tinh tế – để chăm sóc, tươi mát và hài hòa với mọi góc nhỏ trong ngôi nhà hay văn phòng của bạn.
                                Đưa thiên nhiên đến gần hơn, một cách nhẹ nhàng và đầy cảm hứng.
                            </motion.p>
                            {/* <button><span className="blinking">Khám phá ngay →</span></button> */}
                            <motion.button
                                initial={{ opacity: 0, y: 30 }}
                                animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: 1.5 }}
                            >
                                <Link className="link" to="/display"><span className="blinking"> Khám phá ngay →</span></Link>
                            </motion.button>
                        </div>
                        <div className="model">
                            <Canvas camera={{ position: [0, 10, 80], fov: 45 }}>
                                <ambientLight intensity={3} />
                                <Model url={model.model3D} />
                                <OrbitControls maxDistance={200} />
                            </Canvas>
                        </div>
                    </div>
                </div>

                <div className="block_2">
                    <div className="title_wrapper">
                        <h1>Bộ sưu tập <span>Ngũ hành</span></h1>
                        <h2 className="blink">Hòa quyện cá tính và năng lượng thiên nhiên</h2>

                    </div>
                    <div className="slider">
                        <button className="nav left" onClick={handlePrev}><GrPrevious /></button>
                        <div className="plant-cards">
                            {/* {visiblePlants.map((plant, idx) => (
                                <div key={idx} className="plant-card">
                                    <h3>{plant.name}</h3>
                                    <img src={plant.image} alt={plant.name} />
                                    <p>{plant.description}</p>
                                </div>
                            ))} */}
                            {visiblePlants.map((plant, idx) => (
                                <div key={idx} className="plant-card" onClick={() => handleClickCategory(plant.name)}>
                                    <h3>{plant.name}</h3>
                                    <img src={plant.image} alt={plant.name} />
                                    <p>{plant.description}</p>
                                </div>
                            ))}
                        </div>
                        <button className="nav right" onClick={handleNext}><GrNext /></button>
                    </div>
                </div>

                <div className="block_3">
                    <div className="content">
                        <h1>Góc nhỏ xanh - <span>Cảm hứng lớn</span></h1>
                        <div className="description">
                            <p>Một chậu cây nhỏ cũng đủ mang đến sự tươi mới, cân bằng và nhẹ nhàng cho không gian sống. </p>
                            <p>Góc xanh nhỏ bé ấy trao gửi nguồn năng lượng trong lành, giúp tâm hồn thư thái và gợi mở ra những cảm hứng lớn.</p>
                            <p>Đó không chỉ là trang trí – mà là cách bạn nuôi dưỡng cảm xúc tích cực mỗi ngày.</p>
                        </div>
                        <button className="experience-btn" onClick={() => navigate("/room")}>
                            Trải nghiệm 360°→
                        </button>
                    </div>
                    <div className="images">
                        <img src={block3_nho} alt="Ảnh cây" className="img-front"></img>
                        <img src={block3_to} alt="Ảnh cây" className="img-back"></img>
                    </div>
                </div>

                <div className="block_4">
                    <div className="title_wrapper">
                        <h1>Sản phẩm <span>mới nhất</span></h1>
                    </div>
                    <div className="slider">
                        <button className="nav left" onClick={handlePrevProducts}><GrPrevious /></button>
                        <div className="product-cards">
                            {Products.map((product, idx) => (
                                <div key={idx} className="product-card" onClick={() => handleClickProduct(product.id)}>
                                    <div className="image-wrapper">  <img src={product.image} alt={product.title}></img></div>
                                    <p>{product.title}</p>
                                </div>
                            ))}
                        </div>
                        <button className="nav right" onClick={handleNextProducts}><GrNext /></button>
                    </div>
                </div>

                <div className="block_5">
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


            </div>

        </>
    )
}
export default Home;