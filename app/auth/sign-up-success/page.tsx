import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10" style={{ background: "#f5f5f5" }}>
      <div className="w-full max-w-sm text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold" style={{ color: "#001F3F" }}>
            Cadastro Realizado!
          </h1>
          <p className="text-gray-600">Verifique seu email para confirmar sua conta</p>
        </div>
        <Link href="/auth/login">
          <Button className="w-full text-white" style={{ background: "#001F3F" }}>
            Voltar ao Login
          </Button>
        </Link>
      </div>
    </div>
  )
}
