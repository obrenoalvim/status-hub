import { NextRequest, NextResponse } from "next/server";
import { getProvider } from "@/lib/providers";
import { fetchProviderStatus } from "@/lib/normalize";

export async function GET(req: NextRequest) {
  const ids = (req.nextUrl.searchParams.get("ids") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const providers = ids.map(getProvider).filter((p) => p !== undefined);

  const results = await Promise.all(providers.map(fetchProviderStatus));

  return NextResponse.json({ results });
}
