import { updateSession } from "./lib/middleware";

// Força o ambiente Node.js para compatibilidade com o Supabase SSR
export const runtime = "nodejs";

// O Next.js executa esta função automaticamente em cada requisição
export async function middleware(request: Request) {
  return updateSession(request as any);
}
