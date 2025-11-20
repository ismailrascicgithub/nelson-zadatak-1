import type { Vec3 } from "@/lib/models/types";

export const BOUNDS = {
  minX: -5,
  maxX: 5,
  minZ: -5,
  maxZ: 5,
};

export function clampToBounds(pos: Vec3): Vec3 {
  return {
    ...pos,
    x: Math.min(BOUNDS.maxX, Math.max(BOUNDS.minX, pos.x)),
    z: Math.min(BOUNDS.maxZ, Math.max(BOUNDS.minZ, pos.z)),
  };
}
