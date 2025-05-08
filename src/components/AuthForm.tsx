'use client';
import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useSession, signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

const AuthForm = ({ isLogin = true }) => {
  const { data: session, status } = useSession();
  const [showPassword, setShowPassword] = useState(false);
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    name: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Evita o comportamento padrão do botão
    console.log(formState);
    // Aqui você implementaria a lógica de autenticação
  };

  const handleAuth = (provider: String) => {
    signIn(provider as string, { callbackUrl: '/' });
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-950 text-gray-200">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-gray-900 p-8 shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-indigo-400">
            {isLogin ? 'Entrar' : 'Criar Conta'}
          </h1>
          <p className="mt-2 text-gray-400">
            {isLogin ? 'Acesse sua conta para continuar' : 'Preencha seus dados para se cadastrar'}
          </p>
        </div>

        <div className="mt-8 space-y-6">
          {!isLogin && (
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-300">
                Nome
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <User size={18} className="text-gray-500" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formState.name}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 py-2 pl-10 pr-4 text-gray-200 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Seu nome completo"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-300">
              Email
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Mail size={18} className="text-gray-500" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formState.email}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-700 bg-gray-800 py-2 pl-10 pr-4 text-gray-200 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="seu@email.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-300">
              Senha
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Lock size={18} className="text-gray-500" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={formState.password}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-700 bg-gray-800 py-2 pl-10 pr-12 text-gray-200 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showPassword ? (
                  <EyeOff size={18} className="text-gray-500 hover:text-gray-300" />
                ) : (
                  <Eye size={18} className="text-gray-500 hover:text-gray-300" />
                )}
              </button>
            </div>
          </div>

          {isLogin && (
            <div className="flex items-center justify-end">
              <button
                onClick={() => alert('Função de recuperação de senha não implementada.')}
                className="text-sm font-medium text-indigo-400 hover:text-indigo-300"
              >
                Esqueceu a senha?
              </button>
            </div>
          )}

          <button
            onClick={handleSubmit}
            className="group relative flex w-full cursor-pointer justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            <span className="flex items-center">
              {isLogin ? 'Entrar' : 'Cadastrar'}
              <ArrowRight size={16} className="ml-2" />
            </span>
          </button>

          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-gray-700"></div>
            <span className="mx-4 flex-shrink text-sm text-gray-400">ou</span>
            <div className="flex-grow border-t border-gray-700"></div>
          </div>

          <button
            onClick={() => handleAuth('google')}
            className="group relative flex w-full cursor-pointer justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            <span className="flex items-center">
              {isLogin ? 'Entrar com Google' : 'Cadastrar com Google'}
              <FcGoogle size={16} className="ml-2" />
            </span>
          </button>

          <button
            onClick={() => handleAuth('github')}
            className="group relative flex w-full cursor-pointer justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            <span className="flex items-center">
              {isLogin ? 'Entrar com Github' : 'Cadastrar com Github'}
              <FaGithub size={16} className="ml-2" />
            </span>
          </button>

          <div className="flex justify-center">
            <a
              href={isLogin ? '/register' : '/login'}
              className="text-sm font-medium text-indigo-400 hover:text-indigo-300"
            >
              {isLogin ? 'Criar uma nova conta' : 'Já tem uma conta? Faça login'}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
