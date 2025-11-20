"use client";

import type { ModelState, Vec3 } from "./types";

const API_BASE = "/api/models";

export async function loadInitialModels(): Promise<ModelState[]> {
  const res = await fetch(API_BASE, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to load models from API");
  }

  const data = (await res.json()) as ModelState[];
  return data;
}

export async function saveModelState(model: {
  id: string;
  position: Vec3;
  rotation: Vec3;
}) {
  const res = await fetch(API_BASE, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(model),
  });

  if (!res.ok) {
    throw new Error("Failed to save model via API");
  }
}
