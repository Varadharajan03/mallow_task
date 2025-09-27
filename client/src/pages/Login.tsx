import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { login } from '../features/auth/authSlice';
import Loader from '../components/common/Loader';

const Login = () => {
    const [email, setEmail] = useState('eve.holt@reqres.in');
    const [password, setPassword] = useState('cityslicka');
    const [isVisible, setIsVisible] = useState(false);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { isAuthenticated, isLoading, error } = useAppSelector((state) => state.auth);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/users');
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(login({ email, password }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 flex items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-amber-300 to-orange-400 rounded-full opacity-30 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-yellow-300 to-amber-400 rounded-full opacity-30 animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-orange-200 to-amber-300 rounded-full opacity-20 animate-spin" style={{animationDuration: '20s'}}></div>
            </div>

            <div className={`relative z-10 w-full max-w-md transform transition-all duration-1000 ease-out ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-amber-200 p-8 space-y-8">
                    <div className="text-center space-y-4">
                        <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl shadow-lg transform transition-all duration-700 delay-300 ${
                            isVisible ? 'rotate-0 scale-100' : 'rotate-180 scale-0'
                        }`}>
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <div className={`space-y-2 transform transition-all duration-700 delay-500 ${
                            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                        }`}>
                            <h2 className="text-3xl font-bold text-gray-800">
                                Welcome Back
                            </h2>
                            <p className="text-gray-600">Sign in to your account to continue</p>
                        </div>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className={`space-y-1 transform transition-all duration-700 delay-700 ${
                            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                        }`}>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                    </svg>
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 hover:border-gray-400 placeholder-gray-500 text-gray-900"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        <div className={`space-y-1 transform transition-all duration-700 delay-900 ${
                            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                        }`}>
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 hover:border-gray-400 placeholder-gray-500 text-gray-900"
                                    placeholder="Enter your password"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="transform transition-all duration-500 animate-in slide-in-from-top-2">
                                <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center space-x-2">
                                    <svg className="h-5 w-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p className="text-sm text-red-700 font-medium">{error}</p>
                                </div>
                            </div>
                        )}

                        <div className={`transform transition-all duration-700 delay-1100 ${
                            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                        }`}>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="group w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg"
                            >
                                {isLoading ? (
                                    <div className="flex items-center space-x-2">
                                        <Loader />
                                        <span>Signing in...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center space-x-2">
                                        <span>Sign In</span>
                                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                )}
                            </button>
                        </div>
                    </form>

                    <div className={`text-center pt-4 border-t border-gray-200 transform transition-all duration-700 delay-1300 ${
                        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                    }`}>
                        <p className="text-xs text-gray-600">
                            Secure login powered by Varadharajan
                        </p>
                    </div>
                </div>

                <div className="absolute -top-2 -right-2 w-4 h-4 bg-amber-400 rounded-full opacity-60 animate-bounce delay-500"></div>
                <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-orange-400 rounded-full opacity-60 animate-bounce delay-1000"></div>
            </div>
        </div>
    );
};

export default Login;