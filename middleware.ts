import { updateSession } from "./lib/middleware";

export const runtime = "nodejs";

export async function middleware(request: Request) {
  return updateSession(request as any);
}
