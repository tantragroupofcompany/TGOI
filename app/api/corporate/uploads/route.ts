import { NextRequest, NextResponse } from "next/server";
import { guardModule, actorOf, ok, fail, handleAction } from "@/lib/api/helpers";
import { saveImage } from "@/lib/storage/uploads";
import { recordActivity } from "@/lib/security/activity-log";

export const runtime = "nodejs";

/**
 * POST /api/corporate/uploads
 * Validated image upload (PNG/JPEG/WebP/GIF, ≤2MB, magic-byte checked).
 * Returns a public URL path that management forms store in the database.
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  const guarded = await guardModule("COMPANY_MANAGEMENT");
  if (guarded.response) return guarded.response;

  return handleAction(async () => {
    const formData = await req.formData();
    const file = formData.get("file");
    if (!(file instanceof File)) {
      return fail("No image file was provided.");
    }

    const stored = await saveImage(file);
    const actor = actorOf(guarded.session);
    recordActivity("IMAGE_UPLOADED", actor.userId, {
      userName: actor.name,
      role: actor.role,
      module: "MEDIA",
      target: stored.fileName,
      status: "success",
    });

    return ok({ url: stored.url });
  });
}