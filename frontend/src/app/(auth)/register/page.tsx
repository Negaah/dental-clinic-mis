'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';

// تعریف اسکیمای اعتبارسنجی Zod
const schema = z.object({
    username: z.string().min(3, { message: 'نام کاربری باید حداقل ۳ حرف باشد' }),
    email: z.string().email({ message: 'ایمیل معتبر وارد کنید' }),
    password: z.string().min(6, { message: 'رمز عبور باید حداقل ۶ حرف باشد' }),
});

export default function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: any) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register/', data);
            alert('ثبت‌نام موفقیت‌آمیز بود!');
        } catch (error) {
            alert('خطایی در ثبت‌نام رخ داد');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>نام کاربری:</label>
                <input {...register('username')} placeholder="نام کاربری" />
                {errors.username && <p className='bg-red-300'>{errors.username.message}</p>}
            </div>
            <div>
                <label>ایمیل:</label>
                <input {...register('email')} placeholder="ایمیل" />
                {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div>
                <label>رمز عبور:</label>
                <input {...register('password')} type="password" placeholder="رمز عبور" />
                {errors.password && <p>{errors.password.message}</p>}
            </div>
            <button type="submit">ثبت‌نام</button>
        </form>
    );
}
