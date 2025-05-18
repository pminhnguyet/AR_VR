// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, useGLTF } from "@react-three/drei";
// import "../styles/Detail.scss";

// function Model({ url }) {
//     const { scene } = useGLTF(url);  // Sử dụng useGLTF để load mô hình .glb

//     return <primitive object={scene} scale={20} />; // Render mô hình vào scene
// }


// function Detail() {
//     const { id } = useParams();  // Lấy ID từ URL
//     const [model, setModel] = useState(null);

//     useEffect(() => {
//         fetch(`http://localhost:8080/api/plant`)
//             .then((res) => res.json())
//             .then((data) => {
//                 const modelDetail = data.find((item) => item.id === parseInt(id));
//                 setModel(modelDetail);
//             })
//             .catch((err) => console.error("Lỗi khi fetch model:", err));
//     }, [id]);

//     if (!model) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <>
//             <div className="detail-container">
//                 <div className="model-container">
//                     {/* Khung bên trái - 3/5 màn hình */}
//                     <div className="model-display">
//                         <Canvas>
//                             <ambientLight intensity={2} />
//                             <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
//                             <Model url={model.model3D} />

//                             <OrbitControls />
//                         </Canvas>
//                     </div>

//                     {/* Khung bên phải - 2/5 màn hình */}
//                     <div className="model-info">
//                         <h2>{model.title}</h2>
//                         <p>{model.description}</p>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default Detail;
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import "../styles/Detail.scss";

// Component tải mô hình GLB
function Model({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={20} position={[0,0, 0]} />;
}

function Detail() {
  const { id } = useParams();
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);

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
          <h2>{model.title}</h2>
          <p>{model.description}</p>
        </div>
      </div>
    </div>
  );
}

export default Detail;
