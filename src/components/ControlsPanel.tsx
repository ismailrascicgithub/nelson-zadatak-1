"use client";

import React from "react";
import type { ModelState, Vec3 } from "@/lib/models/types";
import ModelRotationCard from "@/components/ModelRotationCard";

interface ControlsPanelProps {
  models: ModelState[];
  tempRotation: Record<string, Vec3>;
  onTempRotation: (id: string, rot: Vec3) => void;
  onCommitRotation: (id: string) => void;
}

const ControlsPanel: React.FC<ControlsPanelProps> = ({
  models,
  tempRotation,
  onTempRotation,
  onCommitRotation,
}) => {
  return (
    <aside className="flex w-full flex-col gap-4 rounded-xl border border-slate-700 bg-slate-900/70 p-4 md:w-80">
      <h2 className="text-lg font-semibold">Model rotation</h2>

      {models.map((m) => (
        <ModelRotationCard
          key={m.id}
          model={m}
          tempRotation={tempRotation[m.id] ?? null}
          onTempRotation={(rot) => onTempRotation(m.id, rot)}
          onCommitRotation={() => onCommitRotation(m.id)}
        />
      ))}
    </aside>
  );
};

export default ControlsPanel;
