'use client';
import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';

const Header = () => {
  const { data: session } = useSession();

  return (
    <header className="text-md flex w-full justify-between bg-gray-900 px-6 py-2 font-light text-white">
      <h1 className="text-2xl font-bold">Next Auth</h1>
      <div className="flex items-center gap-4">
        <div className="flex cursor-pointer items-center gap-2">
          <Image
            src={session?.user?.image || '/9334389.jpg'}
            alt="User Image"
            width={30}
            height={30}
            className="rounded-full"
          />
          <span className="text-sm text-gray-400 hover:text-gray-300">{session?.user?.name}</span>
        </div>
        {session ? (
          <button
            className="cursor-pointer rounded-2xl bg-indigo-400 px-6 py-2 text-sm font-light hover:bg-indigo-500"
            onClick={() => signOut()}
          >
            Sair
          </button>
        ) : (
          <button
            className="cursor-pointer rounded-2xl bg-indigo-400 px-6 py-2 text-sm font-light hover:bg-indigo-500"
            onClick={() => signIn('google')}
          >
            Entrar
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
