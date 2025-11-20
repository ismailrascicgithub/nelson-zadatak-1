"use client";

import React, { useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  Grid,
  PerspectiveCamera,
  Environment,
} from "@react-three/drei";
import * as THREE from "three";
import type { ModelState, Vec3 } from "@/lib/models/types";
import type { ViewMode } from "./ViewToggle";
import ModelMesh from "./ModelMesh";

type CameraVec = [number, number, number];

const CameraLookAt: React.FC<{ target: CameraVec }> = ({ target }) => {
  const { camera } = useThree();
  React.useEffect(() => {
    camera.lookAt(...target);
  }, [camera, target]);
  return null;
};

interface SceneViewportProps {
  models: ModelState[];
  tempRotation: Record<string, Vec3>;
  viewMode: ViewMode;
  onChangePosition: (id: string, position: Vec3) => void;
  onDragEnd: (id: string, position: Vec3) => void;
}

const SceneViewport: React.FC<SceneViewportProps> = ({
  models,
  tempRotation,
  viewMode,
  onChangePosition,
  onDragEnd,
}) => {
  const [isModelDragging, setIsModelDragging] = useState(false);
  const controlsRef = useRef<any>(null);

  const cameraPosition: CameraVec =
    viewMode === "3d" ? [6, 4, 6] : [0, 8, 0];
  const cameraTarget: CameraVec = [0, 0, 0];

  const handleDragChange = (dragging: boolean) => {
    setIsModelDragging(dragging);
    if (controlsRef.current) {
      controlsRef.current.enabled = !dragging;
    }
  };

  return (
    <div className="flex-1 h-full min-h-[400px] overflow-hidden rounded-xl border border-slate-700 bg-slate-900">
      <Canvas camera={{ position: cameraPosition, fov: 50 }} shadows>
        <PerspectiveCamera makeDefault position={cameraPosition} fov={50} />
        <CameraLookAt target={cameraTarget} />

        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1.2} castShadow />

        <Grid args={[10, 10]} cellSize={1} cellThickness={0.5} />

        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -0.001, 0]}
          receiveShadow
        >
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial transparent opacity={0} />
        </mesh>

        <Environment preset="warehouse" />

        <OrbitControls
          ref={controlsRef}
          enableRotate={viewMode === "3d"}
          enablePan
          enableZoom
          maxPolarAngle={viewMode === "3d" ? Math.PI / 2.2 : 0.01}
          minPolarAngle={0.1}
          enabled={!isModelDragging}
          mouseButtons={{
            LEFT: THREE.MOUSE.ROTATE,
            RIGHT: THREE.MOUSE.PAN,
            MIDDLE: THREE.MOUSE.DOLLY,
          }}
        />

        {models.map(model => {
          const rotation = tempRotation[model.id] ?? model.rotation;
          return (
            <ModelMesh
              key={model.id}
              model={{ ...model, rotation }}
              allModels={models}
              onPositionChange={onChangePosition}
              onDragChange={handleDragChange}
              onDragEnd={onDragEnd}
            />
          );
        })}
      </Canvas>
    </div>
  );
};

export default SceneViewport;
