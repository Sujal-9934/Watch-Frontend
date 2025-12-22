// login page
import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

function Login({ apiUrl = process.env.REACT_APP_LOGIN_API || 'http://localhost:5000/api/auth/login' }) {
    const history = useHistory();
    const [username, setUsername] = useState('');
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
                body: JSON.stringify({ username, password }),
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
            history.push('/Dashboard');
        } catch (err) {
            console.error('Network/login request error:', err);
            setError(err?.message || 'Network error');
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div>
                <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-md w-full space-y-8">
                        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                            {error && (
                                <div className="text-red-600 text-sm">{error}</div>
                            )}
                            <div>
                                <label>
                                    Username
                                </label>
                                <div className="rounded-md shadow-sm -space-y-px">
                                    <input
                                        id="username"
                                        name="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label>
                                    Password
                                </label>
                                <div>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    {loading ? 'Submitting...' : 'Submit'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* <NavLink to="/Dashboard"> Dashboard</NavLink> */}
        </>
    );
}

export default Login;


