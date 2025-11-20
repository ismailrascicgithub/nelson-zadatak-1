import * as THREE from "three";
import type { Vec3 } from "@/lib/models/types";

const DRAG_PLANE = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
const DRAG_INTERSECTION = new THREE.Vector3();

export function projectRayToPlane(ray: THREE.Ray): Vec3 | null {
  const intersection = ray.intersectPlane(DRAG_PLANE, DRAG_INTERSECTION);
  if (!intersection) return null;

  return {
    x: intersection.x,
    y: 0,
    z: intersection.z,
  };
}
