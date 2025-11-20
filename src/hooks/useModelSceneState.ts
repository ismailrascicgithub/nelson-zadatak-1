"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ModelState, Vec3 } from "@/lib/models/types";
import { loadInitialModels, saveModelState } from "@/lib/models/actions";

type UseModelSceneStateResult = {
  models: ModelState[];
  loading: boolean;
  error: string | null;

  tempRotation: Record<string, Vec3>;
  handleTempRotation: (id: string, rotation: Vec3) => void;
  handleCommitRotation: (id: string) => void;

  handleChangePosition: (id: string, position: Vec3) => void;
  handleDragEnd: (id: string, position: Vec3) => void;
};

export function useModelSceneState(): UseModelSceneStateResult {
  const [models, setModels] = useState<ModelState[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [tempRotation, setTempRotation] = useState<Record<string, Vec3>>({});

  const lastSavedRotation = useRef<Record<string, Vec3>>({});
  const lastSavedPosition = useRef<Record<string, Vec3>>({});

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const data = await loadInitialModels();
        if (cancelled) return;

        setModels(data);
        setLoading(false);

        lastSavedRotation.current = data.reduce((acc, model) => {
          acc[model.id] = model.rotation;
          return acc;
        }, {} as Record<string, Vec3>);

        lastSavedPosition.current = data.reduce((acc, model) => {
          acc[model.id] = model.position;
          return acc;
        }, {} as Record<string, Vec3>);
      } catch {
        if (!cancelled) {
          setError("Failed to load models.");
          setLoading(false);
        }
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleChangePosition = useCallback((id: string, position: Vec3) => {
    setModels(prev =>
      prev.map(m => (m.id === id ? { ...m, position } : m))
    );
  }, []);

  const handleDragEnd = useCallback(
    (id: string, position: Vec3) => {
      const last = lastSavedPosition.current[id];
      if (
        last &&
        last.x === position.x &&
        last.y === position.y &&
        last.z === position.z
      ) {
        return;
      }

      lastSavedPosition.current[id] = position;

      const model = models.find(m => m.id === id);
      if (!model) return;

      const updatedModel: ModelState = {
        ...model,
        position,
      };

      void saveModelState(updatedModel);
    },
    [models]
  );

  const handleTempRotation = useCallback((id: string, rotation: Vec3) => {
    setTempRotation(prev => ({ ...prev, [id]: rotation }));
  }, []);

  const handleCommitRotation = useCallback(
    (id: string) => {
      const rotation = tempRotation[id];
      if (!rotation) return;

      const last = lastSavedRotation.current[id];
      if (
        last &&
        last.x === rotation.x &&
        last.y === rotation.y &&
        last.z === rotation.z
      ) {
        return;
      }

      lastSavedRotation.current[id] = rotation;

      setModels(prev =>
        prev.map(m => (m.id === id ? { ...m, rotation } : m))
      );

      const model = models.find(m => m.id === id);
      if (model) {
        void saveModelState({ ...model, rotation });
      }

      setTempRotation(prev => {
        const { [id]: _, ...rest } = prev;
        return rest;
      });
    },
    [tempRotation, models]
  );

  return {
    models,
    loading,
    error,
    tempRotation,
    handleTempRotation,
    handleCommitRotation,
    handleChangePosition,
    handleDragEnd,
  };
}
