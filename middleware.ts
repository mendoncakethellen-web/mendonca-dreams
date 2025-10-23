import { updateSession } from "./lib/middleware";

export const runtime = "nodejs";

export async function middleware(request: Request) {
  try {
    return await updateSession(request as any);
  } catch (error) {
    console.error("Middleware error:", error);
    return new Response("Middleware error", { status: 500 });
  }
}
