import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import "../styles/Detail.scss";

// Component tải mô hình GLB
function Model({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={50} />;
}

function Detail() {
  const { id } = useParams();
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("info");

  useEffect(() => {
    fetch("http://localhost:8080/api/plant")
      .then((res) => res.json())
      .then((data) => {
        const modelDetail = data.content.find((item) => item.id === parseInt(id));
        setModel(modelDetail);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi khi fetch model:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="detail-loading">Đang tải mô hình...</div>;
  }

  if (!model) {
    return <div className="detail-error">Không tìm thấy mô hình.</div>;
  }

  return (
    <div className="detail-container">
      <div className="model-container">
        {/* Vùng hiển thị mô hình 3D */}
        <div className="model-display">
          <Canvas camera={{ position: [0, 0, 80] }}>
            <ambientLight intensity={2} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <Model url={model.model3D} />
            <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
          </Canvas>
        </div>

        {/* Vùng hiển thị thông tin cây */}
        <div className="model-info">
          <div className="tab-buttons">
            <button
              className={`tab-button ${selectedTab === "info" ? "active" : ""}`}
              onClick={() => setSelectedTab("info")}>
              Thông tin
            </button>

            <button
              className={`tab-button ${selectedTab === "chat" ? "active" : ""}`}
              onClick={() => setSelectedTab("chat")}>
              Chat AI
            </button>
          </div>

          <div className="tab-content">
            {selectedTab === "info" && (
              <div className="information">
                <div className="text-information">
                  <h2>{model.title}</h2>
                  {model.description.split('\n').map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
                <div className="AR-area">
                  <button className="AR_button">Trải nghiệm AR</button>
                </div>

              </div>

            )}
            {selectedTab === "chat" && (
              <div className="chat-box">
                <p>Chat với AI về cây này (chức năng đang phát triển).</p>
              </div>
            )}


          </div>


        </div>
      </div>
    </div>
  );
}

export default Detail;
