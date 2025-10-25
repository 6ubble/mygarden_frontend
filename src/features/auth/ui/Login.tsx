import { Leaf } from 'lucide-react';
import { useLoginForm } from '../model/hooks/useLoginForm';

interface LoginProps {
  onSwitchToRegister: () => void;
}

export const Login = ({ onSwitchToRegister }: LoginProps) => {
  const { register, handleSubmit, errors, isLoading, error, onSubmit } = useLoginForm();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-md p-8 max-w-sm w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Leaf className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold">Мой Сад</h1>
          <p className="text-gray-600">Войдите в аккаунт</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error.message || 'Произошла ошибка'}
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="Email"
              {...register('email', { required: 'Email обязателен' })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              disabled={isLoading}
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Пароль</label>
            <input
              type="password"
              placeholder="Пароль"
              {...register('password', { required: 'Пароль обязателен' })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              disabled={isLoading}
            />
            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {isLoading ? 'Вход...' : 'Войти'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Нет аккаунта?{' '}
          <button
            onClick={onSwitchToRegister}
            className="text-green-600 font-semibold hover:underline"
          >
            Зарегистрироваться
          </button>
        </div>
      </div>
    </div>
  );
};
