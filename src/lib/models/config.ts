import type { Vec3 } from "./types";

export type ModelConfig = {
  id: string;
  name: string;
  file: string;
  defaultPosition: Vec3;
  defaultRotation: Vec3;
};

export const MODEL_COLLECTION = "models";

export const modelConfigs: ModelConfig[] = [
  {
    id: "model1",
    name: "Model 1",
    file: "/models/model1.glb",
    defaultPosition: { x: -1.5, y: 0, z: 0 },
    defaultRotation: { x: 0, y: 0, z: 0 },
  },
  {
    id: "model2",
    name: "Model 2",
    file: "/models/model2.glb",
    defaultPosition: { x: 1.5, y: 0, z: 0 },
    defaultRotation: { x: 0, y: 0, z: 0 },
  },
];
