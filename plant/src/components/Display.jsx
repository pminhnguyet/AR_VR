import React from "react";
import "../styles/Display.scss"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


// const plants = [
//     { name: "Cây Lưỡi Hổ", image: "/public/images/cay_luoi_ho.png" },
//     { name: "Cây Trầu Bà", image: "/public/images/cay_trau_ba.jpg" },
//     { name: "Cây Kim Tiền", image: "/public/images/cay_kim_tien.jpeg" },
//     { name: "Cây Xương Rồng", image:"/public/images/cay_trau_ba.jpg" },
//     { name: "Cây Bàng Singapore", image: "/public/images/cay_kim_tien.jpeg" },
//     { name: "Cây Hồng Môn", image:  "/public/images/cay_luoi_ho.png" },
// ];


// function Display() {
//     return (
//         <>
//             <div className="gallery-container">

//                 <div className="card-grid">
//                     {plants.map((plant, index) => (
//                         <div key={index} className="plant-card">
//                             <div className="image-wrapper">
//                                 <img src={plant.image} alt={plant.name} className="plant-image" />
//                             </div>
//                             <p className="plant-name">{plant.name}</p>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Display;






// Bảng ánh xạ tạm thời từ id -> hình ảnh
const imageMap = {
    1: "/public/images/cay_luoi_ho.png",
    2: "/public/images/cay_trau_ba.jpg",
    3: "/public/images/cay_kim_tien.jpeg",
    4: "/public/images/cay_luoi_ho.png",
    5: "/public/images/cay_kim_tien.jpeg",
    6: "/public/images/cay_trau_ba.jpg",
    7: "/public/images/cay_kim_tien.jpeg",
    8: "/public/images/cay_trau_ba.jpg",
    9: "/public/images/cay_luoi_ho.png",
    10: "/public/images/cay_kim_tien.jpeg",
};

function Display() {
    const [models, setModels] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://agri-solar-be.onrender.com/models")
            .then((res) => res.json())
            .then((data) => setModels(data))
            .catch((err) => console.error("Lỗi khi fetch models:", err));
    }, []);

    const handleClick = (id) => {
        // Chuyển hướng tới trang chi tiết
        navigate(`/detail/${id}`);
    };
    return (
        <div className="gallery-container">


            <div className="card-grid">
                {models.map((model) => (
                    <div
                        key={model.id}
                        className="plant-card"
                        onClick={() => handleClick(model.id)}
                    >
                        <div className="image-wrapper">
                            <img
                                src={imageMap[model.id]}
                                alt={model.title}
                                className="plant-image"
                            />
                        </div>
                        <p className="plant-name">{model.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Display;
