'use client';
import { useSession, signOut } from 'next-auth/react';
import Header from '@/components/Header';
import Link from 'next/link';

export default function Home() {
  const { data: session, status } = useSession();
  console.log(session, status);
  return (
    <div className="flex h-screen flex-col items-center gap-12 bg-gray-950">
      <Header />
      <main className="flex h-screen flex-col items-center justify-center gap-4">
        {status === 'authenticated' ? (
          <button
            onClick={() => {
              signOut();
            }}
            className="rounded-2xl bg-indigo-400 px-6 py-4 hover:bg-indigo-500"
          >
            Sair
          </button>
        ) : (
          <>
            <Link
              className="min-w-3xs rounded-2xl bg-indigo-400 px-6 py-4 text-center hover:bg-indigo-500"
              href="/login"
            >
              Entrar
            </Link>
            <Link
              className="min-w-3xs rounded-2xl bg-indigo-400 px-6 py-4 text-center hover:bg-indigo-500"
              href="/register"
            >
              Registrar-se
            </Link>
          </>
        )}
      </main>
    </div>
  );
}
