import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-violet-100 via-white to-purple-50 pt-6 sm:justify-center sm:pt-0">
            <div>
                <Link href="/" className="flex flex-col items-center gap-1">
                    <img
                        src="/images/raia-logo.webp"
                        alt="RaiaFood Logo"
                        className="h-56 w-auto object-contain transition-transform duration-350 hover:scale-105"
                    />
                </Link>
            </div>

            <div className="mt-8 w-full overflow-hidden bg-white px-8 py-8 shadow-xl shadow-violet-100/50 sm:max-w-md sm:rounded-2xl border border-violet-100/50">
                {children}
            </div>
        </div>
    );
}
