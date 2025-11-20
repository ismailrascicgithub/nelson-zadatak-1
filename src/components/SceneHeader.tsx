"use client";

import React from "react";
import ViewToggle, { ViewMode } from "./ViewToggle";

interface SceneHeaderProps {
  viewMode: ViewMode;
  onChangeViewMode: (mode: ViewMode) => void;
}

const SceneHeader: React.FC<SceneHeaderProps> = ({
  viewMode,
  onChangeViewMode,
}) => {
  return (
    <>
      <h1 className="text-center text-2xl font-semibold tracking-tight">
        3D Model Editor
      </h1>

      <div className="flex flex-col items-center justify-between gap-4 md:flex-row md:items-end">
        <ViewToggle mode={viewMode} onChange={onChangeViewMode} />
        <p className="text-xs text-slate-400">
          Drag models on the grid • Rotate them with sliders
        </p>
      </div>
    </>
  );
};

export default SceneHeader;
