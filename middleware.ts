import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

// Força o middleware a rodar em ambiente Node.js (não Edge)
export const runtime = "nodejs";

export async function updateSession(request: NextRequest) {
  const supabaseResponse = NextResponse.next(); // ✅ corrigido

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Obtém o usuário logado
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const isAuthPage = pathname.startsWith("/auth");
  const isProtectedPage = pathname.startsWith("/dashboard");

  // Redireciona se tentar acessar página protegida sem login
  if (isProtectedPage && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  // Redireciona se tentar acessar login/signup já logado
  if (isAuthPage && user) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

// 🔥 Função esperada pelo Next.js
export async function middleware(request: NextRequest) {
  return updateSession(request);
}
