import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, useGLTF } from '@react-three/drei';

function Model({ url }) {
    const { scene } = useGLTF(url);
    return <primitive object={scene}  />;
}

export default function GLBViewer({ url }) {
    if (!url) return <p>Đang tải mô hình</p>;
    return (
        <div style={{ width: '70%', height: '400px', marginTop: '15px' }}>
            <Canvas camera={{ position: [0, 0, 5] }}>
                <ambientLight intensity={3} />
                <directionalLight position={[0, 5, 5]} />
                {/* <Environment preset="sunset"/> */}
                {/* <Environment preset="sunset" background /> */}
                <Model url={url} />
                <OrbitControls enablePan={true} />
            </Canvas>
        </div>
    );
}
