import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// مسیرهای محافظت‌شده
const protectedRoutes = ['/', '/Appointments', '/Patients'];

export function middleware(req: NextRequest) {
    const token = req.cookies.get('accessToken')?.value;

    if (!token && protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
        if (req.nextUrl.pathname.startsWith('/login')) {
            return NextResponse.next(); // اجازه دسترسی به صفحات ورود و ثبت‌نام
        }
        const loginUrl = new URL('/login', req.url);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

// تعریف مسیرهایی که Middleware بر روی آنها اجرا می‌شود
export const config = {
    matcher: ['/Dashboard/:path*', '/Appointments/:path*', '/Patients/:path*'],
};
