import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import "../styles/Detail.scss";

function Model({ url }) {
    const { scene } = useGLTF(url);  // Sử dụng useGLTF để load mô hình .glb
  
    return <primitive object={scene} scale={20}  />; // Render mô hình vào scene
  }

function Detail() {
    const { id } = useParams();  // Lấy ID từ URL
    const [model, setModel] = useState(null);

    useEffect(() => {
        fetch(`https://agri-solar-be.onrender.com/models`)
            .then((res) => res.json())
            .then((data) => {
                const modelDetail = data.find((item) => item.id === parseInt(id));
                setModel(modelDetail);
            })
            .catch((err) => console.error("Lỗi khi fetch model:", err));
    }, [id]);

    if (!model) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="detail-container">
                <div className="model-container">
                    {/* Khung bên trái - 3/5 màn hình */}
                    <div className="model-display">
                        <Canvas>
                            <ambientLight intensity={1} />
                            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                            <Model url={model.url} />
                            <OrbitControls/>
                        </Canvas>
                    </div>

                    {/* Khung bên phải - 2/5 màn hình */}
                    <div className="model-info">
                        <h2>{model.title}</h2>
                        <p>{model.description}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Detail;
