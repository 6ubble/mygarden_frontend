import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../shared/hooks/useAuth';
import { Leaf } from 'lucide-react';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { loginMutation } = useAuth();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            await loginMutation.mutateAsync({ email, password });
        } catch (err: any) {
            setError(err.message || 'Ошибка входа');
        }
    };

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

                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                        disabled={loginMutation.isPending}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                        disabled={loginMutation.isPending}
                        required
                    />

                    <button
                        type="submit"
                        disabled={loginMutation.isPending}
                        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
                    >
                        {loginMutation.isPending ? 'Вход...' : 'Войти'}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-600">
                    Нет аккаунта? <Link to="/register" className="text-green-600 font-semibold">Зарегистрироваться</Link>
                </div>
            </div>
        </div>
    );
};
