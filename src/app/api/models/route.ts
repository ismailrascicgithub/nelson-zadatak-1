import { NextResponse } from "next/server";
import {
  loadInitialModelsAdmin,
  saveModelStateAdmin,
} from "@/lib/models/repository";
import type { Vec3 } from "@/lib/models/types";

export async function GET() {
  try {
    const models = await loadInitialModelsAdmin();
    return NextResponse.json(models);
  } catch (err) {
    console.error("GET /api/models error:", err);
    return NextResponse.json(
      { error: "Failed to load models" },
      { status: 500 }
    );
  }
}

type SaveModelBody = {
  id: string;
  position: Vec3;
  rotation: Vec3;
};

export async function PATCH(request: Request) {
  try {
    const body = (await request.json()) as SaveModelBody;

    if (
      !body ||
      typeof body.id !== "string" ||
      !body.position ||
      !body.rotation
    ) {
      return NextResponse.json(
        { error: "Invalid payload" },
        { status: 400 }
      );
    }

    await saveModelStateAdmin(body);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("PATCH /api/models error:", err);
    return NextResponse.json(
      { error: "Failed to save model" },
      { status: 500 }
    );
  }
}
