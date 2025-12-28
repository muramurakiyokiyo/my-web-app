import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF } from '@react-three/drei';

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
      <div className="w-full h-full flex items-center justify-center bg-slate-100 rounded-lg overflow-hidden">
        {fallbackImage ? (
          <img src={fallbackImage} alt="Fallback" className="max-w-[80%] max-h-[80%] object-contain" />
        ) : (
          <div className="text-slate-400 text-sm">3Dモデルなし</div>
        )}
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[200px] bg-slate-900 rounded-lg overflow-hidden border border-slate-800 shadow-inner">
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
