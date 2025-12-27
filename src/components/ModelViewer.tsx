import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF } from '@react-three/drei';
import styles from './ModelViewer.module.css';

interface ModelProps {
  url: string;
}

const Model: React.FC<ModelProps> = ({ url }) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
};

interface ModelViewerProps {
  modelUrl: string | undefined;
  fallbackImage?: string;
}

export const ModelViewer: React.FC<ModelViewerProps> = ({ modelUrl, fallbackImage }) => {
  if (!modelUrl) {
    return (
      <div className={styles.container}>
        {fallbackImage ? (
          <img src={fallbackImage} alt="Fallback" className={styles.fallbackImage} />
        ) : (
          <div className={styles.placeholder}>3Dモデルなし</div>
        )}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Canvas shadows camera={{ position: [0, 0, 150], fov: 40 }}>
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.6}>
            <Model url={modelUrl} />
          </Stage>
        </Suspense>
        <OrbitControls autoRotate autoRotateSpeed={4} enableZoom={false} makeDefault />
      </Canvas>
    </div>
  );
};


