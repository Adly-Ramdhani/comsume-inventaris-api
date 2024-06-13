import React, { useState } from "react";
import Case from "../components/Case";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function Login() {
    const [values, setValues] = useState({ email: '', password: '' });
    const [error, setError] = useState({ email: '', password: '', general: '' });

    const navigate = useNavigate();
    const location = useLocation();
    const errorMessage = new URLSearchParams(location.search).get('message');

    const handleLogin = (event) => {
        event.preventDefault();
        axios.post(`http://localhost:8000/login`, values)
            .then((res) => {
                if (res.status === 200 && res.data.data.access_token) {
                    localStorage.setItem("access_token", res.data.data.access_token);
                    navigate('/profile');
                } else {
                    setError({ ...error, general: 'Login failed. Please try again.' });
                }
            })
            .catch(err => {
                const errorData = err.response ? err.response.data : { message: 'An error occurred' };
                setError({
                    email: errorData.email || '',
                    password: errorData.password || '',
                    general: errorData.message || 'An error occurred'
                });
            });
    };

    return (
        <Case>
            <div className="bg-gray-900 min-h-screen flex items-center justify-center">
                <div className="w-full max-w-md bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-6">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">LOGIN</h1>
                        {errorMessage && (
                            <div className="bg-red-100 border border-red-500 text-red-700 p-4 rounded" role="alert">
                                <p className="font-bold">Gagal memproses halaman</p>
                                <p>{errorMessage}</p>
                            </div>
                        )}
                        {error.general && (
                            <div className="bg-red-500 text-white p-4 rounded" role="alert">
                                <p className="font-bold">Gagal!</p>
                                <p>{error.general}</p>
                            </div>
                        )}
                        <form className="space-y-4" onSubmit={handleLogin}>
                            <div className="relative">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="name@company.com"
                                    required
                                    onChange={e => setValues({ ...values, email: e.target.value })}
                                />
                                {error.email && (
                                    <span className="absolute right-0 top-0 mt-9 text-xs text-red-500">{error.email}</span>
                                )}
                            </div>
                            <div className="relative">
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="••••••••"
                                    required
                                    onChange={e => setValues({ ...values, password: e.target.value })}
                                />
                                {error.password && (
                                    <span className="absolute right-0 top-0 mt-9 text-xs text-red-500">{error.password}</span>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="w-full py-2.5 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Case>
    );
}