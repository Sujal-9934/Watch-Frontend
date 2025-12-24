// login page
import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import bgImage from '../../assets/img/background-1920x1280.jpg';
import Card from '../card/Card';

function Login({ apiUrl = process.env.REACT_APP_LOGIN_API || 'http://localhost:5000/api/harsh/login' }) {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError(null);
        
        try {
            const res = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                const data = await res.json().catch(() => null);
                console.error('Login failed:', res.status, data);
                setError(data?.message || `Login failed (${res.status})`);
                setLoading(false);
                return;
            }

            const data = await res.json().catch(() => null);
            if (data?.token) {
                localStorage.setItem('token', data.token);
            }
            // Redirect to dashboard only after successful login
            history.push('/Dashboard');
        } catch (err) {
            console.error('Network/login request error:', err);
            setError(err?.message || 'Network error');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div
            className="min-h-screen flex items-center justify-center relative"
            style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            <div className="absolute inset-0 bg-black opacity-50"></div>

            <div className="relative z-10 max-w-md w-full mx-4">
                <Card className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl">
                    <div className="text-center mb-6 p-2">
                        <h2 className="text-2xl font-semibold text-gray-800">Welcome back</h2>
                        <p className="text-sm text-gray-600">Sign in to your account to continue</p>
                    </div>

                    <form className="space-y-5 p-2" onSubmit={handleSubmit}>
                        {error && (
                            <div className="text-red-600 text-sm">{error}</div>
                        )}

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <NavLink to="/register" className="text-sm text-indigo-600 hover:underline">Create account</NavLink>
                            <button
                                type="submit"
                                disabled={loading}
                                className="ml-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                {loading ? 'Login...' : 'Login'}
                            </button>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
}

export default Login;


