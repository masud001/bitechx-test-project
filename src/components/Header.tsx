"use client";
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/features/auth/authSlice';
import { useRouter } from 'next/navigation';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { toast } from 'sonner';

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

  const handleProductsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!token) {
      e.preventDefault();
      toast.error('Please login to view products');
      router.push('/login');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b-[.5px] bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold text-foreground cursor-pointer">
          {siteName}
        </Link>
        <nav className="relative">
          <NavigationMenu>
            <NavigationMenuList className="flex items-center gap-3">
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href="/products" onClick={handleProductsClick}>Products</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                {token ? (
                  <button onClick={handleLogout} className="rounded-md px-3 py-1.5 text-sm text-accent hover:bg-accent hover:text-white cursor-pointer">Logout</button>
                ) : (
                  <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <Link href="/login">Login</Link>
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
      </div>
    </header>
  );
}