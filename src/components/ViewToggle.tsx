"use client";

import React from "react";
import { ToggleGroup, type ToggleOption } from "./ToggleGroup";

export type ViewMode = "3d" | "2d";

interface ViewToggleProps {
  mode: ViewMode;
  onChange: (mode: ViewMode) => void;
}

const options: ToggleOption<ViewMode>[] = [
  { value: "3d", label: "3D View" },
  { value: "2d", label: "Top View" },
];

const ViewToggle: React.FC<ViewToggleProps> = ({ mode, onChange }) => {
  return <ToggleGroup value={mode} options={options} onChange={onChange} />;
};

export default ViewToggle;
