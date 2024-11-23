// pages/login.tsx
"use client";
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8000/api/token/', { username, password })
      .then((response) => {
        console.log(response)
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        router.push('/home');
      })
      .catch((error) => {
        setError('Invalid credentials');
      });
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center bg-gray-50 justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

        <form onSubmit={handleLogin} className='border p-10 rounded-2xl bg-white shadow-2xl grid grid-cols-1 gap-5'>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className='border p-2 rounded-xl'
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='border p-2 rounded-xl'
          />
          {error && <div className="error">{error}</div>}
          <button type="submit"
            className='border p-2 rounded-xl bg-green-500 mt-3'

          >Login</button>
        </form>
      </main >
    </div >
  );
}
