import { LoginForm } from './components/LoginForm';
import Link from 'next/link';
import AnimatedLayout from '@/components/AnimatedLayouts';
import { ArrowLeft } from 'lucide-react';

export default function Login() {
  return (
    <AnimatedLayout>
      <main className="min-h-screen flex flex-col items-center justify-center bg-background p-4 relative overflow-hidden">
        <div className="bg-effect-2"></div>
        <div className="bg-effect-1"></div>
        <div className="absolute inset-0 pointer-events-none z-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full opacity-[0.05]"
            preserveAspectRatio="none"
          >
            <filter id="noiseFilter">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="9.9"
                numOctaves="2"
                stitchTiles="stitch"
              />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
          </svg>
        </div>

        <div className="w-full max-w-2xl mx-auto flex flex-col items-center relative z-10">
          <div className="w-full mb-8">
            <Link
              href="/"
              className="inline-flex group items-center text-sm text-foreground/80 hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
              Volver
            </Link>
          </div>

          <div className="w-full max-w-md bg-zinc-900/50 backdrop-blur-sm rounded-lg shadow-lg border border-foreground/5 p-8">
            <div className="text-center mb-8 border border-foreground/5 rounded-xl bg-zinc-800/40 p-4">
              <h2 className="text-xl font-semibold mb-4">Bienvenido!</h2>
              <p className="text-muted-foreground text-sm mb-4">
                Con esta aplicación, puedes consultar las estadísticas de tu
                cuenta de GitHub, incluyendo quiénes no te siguen de vuelta
                entre otras. Además, puedes compartir opiniones y sugerencias.
                Inicia sesión con tu cuenta de GitHub para participar.
              </p>
            </div>

            <div className="space-y-6">
              <LoginForm />
            </div>

            <div className="mt-8 text-center text-sm text-muted-foreground">
              <p>
                ¿No tienes una cuenta de GitHub?
                <Link
                  href="https://github.com/"
                  className="text-primary hover:text-indigo-400 underline ml-1"
                  target="_blank"
                >
                  Crear una cuenta
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </AnimatedLayout>
  );
}
