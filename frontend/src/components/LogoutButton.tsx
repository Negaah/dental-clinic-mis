'use client';

import { useRouter } from 'next/navigation';

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = () => {
        // حذف توکن از localStorage
        localStorage.removeItem('accessToken');

        // حذف توکن از کوکی (اختیاری)
        document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';

        // انتقال به صفحه ورود
        router.push('/login');
    };

    return (
        <button onClick={handleLogout} className="logout-button">
            خروج
        </button>
    );
}
