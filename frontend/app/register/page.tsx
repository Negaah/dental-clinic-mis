"use client";
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Create() {
    const [full_name, setFull_name] = useState('');
    const [phone, setPhone] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');

    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/api/patient/', { full_name, phone, dob, gender })
            .then(() => router.push('/pages/home'))
            .catch(error => console.error(error));
    };

    return (
        <form onSubmit={handleSubmit} className='border grid grid-cols-1 gap-10 p-20 w-[50%] mx-auto shadow-2xl rounded-2xl mt-20'>
            <input
                type="text"
                value={full_name}
                onChange={(e) => setFull_name(e.target.value)}
                placeholder="full_name"
                className='border p-2 rounded-2xl'
            />
            <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="phone  "
                className='border p-2 rounded-2xl'
            />
            <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                placeholder="dob    "
                className='border p-2 rounded-2xl'
            />
            <input
                type="text"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                placeholder="gender     "
                className='border p-2 rounded-2xl'
            />

            <button type="submit" className='bg-green-500 p-2 rounded-full text-white'>Create Item</button>
        </form>
    );
}
