import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../shared/hooks/useAuth';
import { Leaf } from 'lucide-react';

export const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [error, setError] = useState('');
    const { registerMutation } = useAuth();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirm) {
            setError('Пароли не совпадают');
            return;
        }
        if (password.length < 6) {
            setError('Минимум 6 символов');
            return;
        }

        try {
            await registerMutation.mutateAsync({ email, password, name });
        } catch (err: any) {
            setError(err.message || 'Ошибка регистрации');
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
                    <p className="text-gray-600">Создайте аккаунт</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <input type="text" placeholder="Имя" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none" disabled={registerMutation.isPending} required />
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none" disabled={registerMutation.isPending} required />
                    <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none" disabled={registerMutation.isPending} required />
                    <input type="password" placeholder="Подтвердите пароль" value={confirm} onChange={(e) => setConfirm(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none" disabled={registerMutation.isPending} required />

                    <button type="submit" disabled={registerMutation.isPending} className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50">
                        {registerMutation.isPending ? 'Регистрация...' : 'Зарегистрироваться'}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-600">
                    Есть аккаунт? <Link to="/login" className="text-green-600 font-semibold">Войти</Link>
                </div>
            </div>
        </div>
    );
};