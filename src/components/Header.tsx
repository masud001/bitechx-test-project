"use client";
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/features/auth/authSlice';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const token = useAppSelector((s) => s.auth.token);
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Product Manager';

  const handleLogout = () => {
    document.cookie = 'auth_token=; Max-Age=0; Path=/';
    dispatch(logout());
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b-[.5px] bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold text-foreground cursor-pointer">
          {siteName}
        </Link>
        <nav className="flex items-center gap-3">
          <Link href="/products" className="text-sm text-primary hover:underline cursor-pointer">Products</Link>
          {token ? (
            <button onClick={handleLogout} className="text-sm text-accent hover:underline cursor-pointer">Logout</button>
          ) : (
            <Link href="/login" className="text-sm text-primary hover:underline cursor-pointer">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
}