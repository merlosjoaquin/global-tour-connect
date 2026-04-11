import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-xl text-muted-foreground">Página no encontrada</p>
      <Link href="/" className="underline text-primary hover:opacity-80">
        Volver al inicio
      </Link>
    </div>
  )
}
