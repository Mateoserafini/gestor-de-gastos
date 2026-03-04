import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import api from '../api/api';

export const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await api.post('/auth/register', data);
            login(response.data.token, response.data.user);
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Error occurred during registration. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md p-8 bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 transition-all duration-300 hover:shadow-brand-accent/20">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold text-brand-text mb-2 tracking-tight">Create an Account</h2>
                    <p className="text-brand-text/70 text-sm">Join us to manage your expenses</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                        <p className="text-sm text-red-700 font-medium">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                        <label htmlFor="username" className="block text-sm font-semibold text-brand-text mb-2">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            className="w-full px-5 py-3 rounded-xl border border-brand-accent/30 bg-white/50 text-brand-text placeholder-brand-text/40 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all duration-200"
                            placeholder="your_username"
                            {...register('username', { required: 'Username is required' })}
                        />
                        {errors.username && (
                            <p className="mt-2 text-sm text-red-600 animate-pulse">{String(errors.username.message)}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-brand-text mb-2">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="w-full px-5 py-3 rounded-xl border border-brand-accent/30 bg-white/50 text-brand-text placeholder-brand-text/40 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all duration-200"
                            placeholder="you@email.com"
                            {...register('email', { required: 'Email is required' })}
                        />
                        {errors.email && (
                            <p className="mt-2 text-sm text-red-600 animate-pulse">{String(errors.email.message)}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-semibold text-brand-text mb-2">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            className="w-full px-5 py-3 rounded-xl border border-brand-accent/30 bg-white/50 text-brand-text placeholder-brand-text/40 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all duration-200"
                            placeholder="••••••••"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: { value: 6, message: 'Password must be at least 6 characters long' }
                            })}
                        />
                        {errors.password && (
                            <p className="mt-2 text-sm text-red-600 animate-pulse">{String(errors.password.message)}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-3.5 px-4 mt-8 rounded-xl text-white font-bold text-lg shadow-lg shadow-brand-primary/30 transform transition-all duration-200 
                            ${isLoading
                                ? 'bg-brand-primary/70 cursor-not-allowed'
                                : 'bg-brand-primary hover:bg-brand-primary-dark hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-primary/40 active:translate-y-0'
                            }`}
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Registering...
                            </span>
                        ) : 'Create Account'}
                    </button>

                    <div className="text-center mt-6">
                        <p className="text-sm text-brand-text/70">
                            Already have an account?{' '}
                            <button
                                type="button"
                                onClick={() => navigate('/login')}
                                className="font-bold text-brand-primary hover:text-brand-primary-dark underline-offset-4 hover:underline transition-all"
                            >
                                Sign in here
                            </button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
