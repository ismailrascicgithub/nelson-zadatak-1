"use client";

import React, { useRef, useState } from "react";
import { useFrame, ThreeEvent } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import type { ModelState, Vec3 } from "@/lib/models/types";
import { clampToBounds } from "@/lib/scene/bounds";
import { projectRayToPlane } from "@/lib/scene/dragPlane";

interface ModelMeshProps {
  model: ModelState;
  allModels: ModelState[];
  onPositionChange: (id: string, position: Vec3) => void;
  onDragChange?: (dragging: boolean) => void;
  onDragEnd?: (id: string, position: Vec3) => void;
}

const ModelMesh: React.FC<ModelMeshProps> = ({
  model,
  onPositionChange,
  onDragChange,
  onDragEnd,
}) => {
  const groupRef = useRef<THREE.Group | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const dragPositionRef = useRef<THREE.Vector3 | null>(null);
  const dragOffsetRef = useRef<THREE.Vector3 | null>(null);

  const { scene } = useGLTF(model.file);

  useFrame(() => {
    const group = groupRef.current;
    if (!group) return;

    if (!dragPositionRef.current) {
      dragPositionRef.current = new THREE.Vector3(
        model.position.x,
        model.position.y,
        model.position.z
      );
    }

    group.position.copy(dragPositionRef.current);
    group.rotation.set(model.rotation.x, model.rotation.y, model.rotation.z);

    const scale = isDragging ? 1.05 : 1;
    group.scale.set(scale, scale, scale);
  });

  const startDrag = (e: ThreeEvent<PointerEvent>) => {
    if (e.button !== 0) return;

    e.stopPropagation();
    (e.target as any).setPointerCapture(e.pointerId);

    const projected = projectRayToPlane(e.ray);
    if (!projected) return;

    const basePos =
      dragPositionRef.current?.clone() ??
      groupRef.current?.position.clone() ??
      new THREE.Vector3(
        model.position.x,
        model.position.y,
        model.position.z
      );

    dragOffsetRef.current = new THREE.Vector3(
      projected.x - basePos.x,
      0,
      projected.z - basePos.z
    );

    dragPositionRef.current = basePos.clone();

    setIsDragging(true);
    onDragChange?.(true);
  };

  const stopDrag = (e?: ThreeEvent<PointerEvent>) => {
    if (e) {
      e.stopPropagation();
      try {
        (e.target as any).releasePointerCapture(e.pointerId);
      } catch {}
    }

    if (!isDragging) return;

    setIsDragging(false);
    onDragChange?.(false);

    const finalPos =
      dragPositionRef.current ??
      groupRef.current?.position.clone() ??
      new THREE.Vector3(
        model.position.x,
        model.position.y,
        model.position.z
      );

    const finalVec: Vec3 = {
      x: finalPos.x,
      y: finalPos.y,
      z: finalPos.z,
    };

    onPositionChange(model.id, finalVec);
    onDragEnd?.(model.id, finalVec);
  };

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (!isDragging) return;

    if (e.buttons === 0) {
      stopDrag(e);
      return;
    }

    e.stopPropagation();

    const projected = projectRayToPlane(e.ray);
    if (!projected) return;

    const offset = dragOffsetRef.current ?? new THREE.Vector3(0, 0, 0);

    const baseY =
      dragPositionRef.current?.y ??
      groupRef.current?.position.y ??
      model.position.y;

    let nextPos = new THREE.Vector3(
      projected.x - offset.x,
      baseY,
      projected.z - offset.z
    );

    const clamped = clampToBounds({
      x: nextPos.x,
      y: nextPos.y,
      z: nextPos.z,
    });
    nextPos.set(clamped.x, clamped.y, clamped.z);

    dragPositionRef.current = nextPos;
  };

  return (
    <group
      ref={groupRef}
      onPointerDown={startDrag}
      onPointerUp={stopDrag}
      onPointerMove={handlePointerMove}
    >
      <primitive object={scene} />
    </group>
  );
};

export default ModelMesh;