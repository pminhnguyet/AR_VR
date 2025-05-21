import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { RGBELoader } from 'three-stdlib';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as THREE from 'three';
import "../styles/Room.scss";



function HDRBackground({ hdrPath }) {
    const texture = useLoader(RGBELoader, hdrPath);

    useEffect(() => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
    }, [texture]);

    return <primitive attach="background" object={texture} />;
}

function Room() {
    const { id } = useParams();
    const hdrPath = `/textures/hdri${id}.hdr`;
    return (
        <div className="test-container">
            <div className="block_1">
                {/* <Canvas camera={{ position: [0, 0, 5] }}> */}
                 <Canvas>
                    {/* <ambientLight intensity={3} /> */}
                    <HDRBackground hdrPath={hdrPath} />
                    <OrbitControls  />
                </Canvas>

            </div>
        </div>
    );
}

export default Room;
