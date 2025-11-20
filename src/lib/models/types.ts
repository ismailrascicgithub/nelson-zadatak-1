export type Vec3 = {
  x: number;
  y: number;
  z: number;
};

export interface ModelState {
  id: string;
  name: string;
  file: string;
  position: Vec3;
  rotation: Vec3;
}
