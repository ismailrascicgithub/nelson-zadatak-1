import { adminDb } from "@/lib/firebase/admin";
import type { ModelState, Vec3 } from "./types";
import { MODEL_COLLECTION, modelConfigs } from "./config";

export async function loadInitialModelsAdmin(): Promise<ModelState[]> {
  const models: ModelState[] = [];

  for (const cfg of modelConfigs) {
    const ref = adminDb.collection(MODEL_COLLECTION).doc(cfg.id);
    const snap = await ref.get();

    if (snap.exists) {
      const data = snap.data() as any;
      models.push({
        id: cfg.id,
        name: cfg.name,
        file: cfg.file,
        position: data.position ?? cfg.defaultPosition,
        rotation: data.rotation ?? cfg.defaultRotation,
      });
    } else {
      const newDoc = {
        position: cfg.defaultPosition,
        rotation: cfg.defaultRotation,
        updatedAt: new Date(),
      };

      await ref.set(newDoc);

      models.push({
        id: cfg.id,
        name: cfg.name,
        file: cfg.file,
        position: cfg.defaultPosition,
        rotation: cfg.defaultRotation,
      });
    }
  }

  return models;
}

export async function saveModelStateAdmin(model: {
  id: string;
  position: Vec3;
  rotation: Vec3;
}) {
  const ref = adminDb.collection(MODEL_COLLECTION).doc(model.id);

  await ref.set(
    {
      position: model.position,
      rotation: model.rotation,
      updatedAt: new Date(),
    },
    { merge: true }
  );
}
