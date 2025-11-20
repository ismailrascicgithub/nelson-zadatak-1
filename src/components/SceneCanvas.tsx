"use client";

import React, { useState } from "react";
import { useModelSceneState } from "@/hooks/useModelSceneState";
import type { ViewMode } from "./ViewToggle";
import SceneHeader from "./SceneHeader";
import SceneViewport from "./SceneViewport";
import ControlsPanel from "./ControlsPanel";

const SceneCanvas: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("3d");

  const {
    models,
    loading,
    error,
    tempRotation,
    handleTempRotation,
    handleCommitRotation,
    handleChangePosition,
    handleDragEnd,
  } = useModelSceneState();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-slate-300">
        Loading scene...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center text-red-300">
        {error}
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full flex-col gap-4 p-4">
      <SceneHeader viewMode={viewMode} onChangeViewMode={setViewMode} />

      <div className="flex flex-1 gap-4 md:flex-row">
        <div className="flex-1">
          <SceneViewport
            models={models}
            tempRotation={tempRotation}
            viewMode={viewMode}
            onChangePosition={handleChangePosition}
            onDragEnd={handleDragEnd}
          />
        </div>

        <div className="w-full md:w-80">
          <ControlsPanel
            models={models}
            tempRotation={tempRotation}
            onTempRotation={handleTempRotation}
            onCommitRotation={handleCommitRotation}
          />
        </div>
      </div>
    </div>
  );
};

export default SceneCanvas;
