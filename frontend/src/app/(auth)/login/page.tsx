'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';

// تعریف اسکیمای اعتبارسنجی Zod
const schema = z.object({
    username: z.string().nonempty({ message: 'نام کاربری نمی‌تواند خالی باشد' }),
    password: z.string().nonempty({ message: 'رمز عبور نمی‌تواند خالی باشد' }),
});

export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });
    const router = useRouter();
    const onSubmit = async (data: any) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/token/', data);
            localStorage.setItem('accessToken', response.data.access);
            localStorage.setItem('refreshToken', response.data.refresh);
            document.cookie = `accessToken=${response.data.access}; path=/;`; // ذخیره در کوکی



            router.push('/');
        } catch (error) {
            alert('نام کاربری یا رمز عبور اشتباه است');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>نام کاربری:</label>
                <input {...register('username')} placeholder="نام کاربری" />
                {errors.username && <p>{errors.username.message}</p>}
            </div>
            <div>
                <label>رمز عبور:</label>
                <input {...register('password')} type="password" placeholder="رمز عبور" />
                {errors.password && <p>{errors.password.message}</p>}
            </div>
            <button type="submit">ورود</button>
        </form>
    );
}
