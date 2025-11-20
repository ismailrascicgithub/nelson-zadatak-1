"use client";

import React from "react";
import type { ModelState, Vec3 } from "@/lib/models/types";
import { radToDeg, degToRad } from "@/lib/utils/angle";

const AXES: (keyof Vec3)[] = ["x", "y", "z"];
const DEG_MIN = -180;
const DEG_MAX = 180;

interface ModelRotationCardProps {
  model: ModelState;
  tempRotation: Vec3 | null;
  onTempRotation: (rotation: Vec3) => void;
  onCommitRotation: () => void;
}

const ModelRotationCard: React.FC<ModelRotationCardProps> = ({
  model,
  tempRotation,
  onTempRotation,
  onCommitRotation,
}) => {
  const currentRot = tempRotation ?? model.rotation;

  const handleAxisChange =
    (axis: keyof Vec3) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const deg = Number(e.target.value);
      if (Number.isNaN(deg)) return;

      const updated: Vec3 = {
        ...currentRot,
        [axis]: degToRad(deg),
      };

      onTempRotation(updated);
    };

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-slate-700/60 bg-slate-900/80 p-3">
      <h3 className="text-sm font-medium text-slate-100">{model.name}</h3>

      {AXES.map((axis) => {
        const degValue = radToDeg(currentRot[axis]);

        return (
          <label key={axis} className="flex flex-col gap-1 text-xs">
            <span>{`Rot ${axis.toUpperCase()}`}</span>

            <input
              type="range"
              min={DEG_MIN}
              max={DEG_MAX}
              value={degValue}
              onChange={handleAxisChange(axis)}
              onMouseUp={onCommitRotation}
              className="w-full accent-blue-500"
            />

            <span className="self-end text-[10px] text-slate-400">
              {degValue.toFixed(0)}°
            </span>
          </label>
        );
      })}
    </div>
  );
};

export default ModelRotationCard;
