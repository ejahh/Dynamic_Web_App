'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  // Hide header on /login or /register
  if (pathname === '/login' || pathname === '/register' || pathname === '/') {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 w-full bg-white/50 shadow-md z-10">
      <nav className="container mx-auto px-6 py-4 flex justify-center items-center space-x-6">
        {pathname === '/myposts' ? (
          // Show only logout if on /myposts
          user && (
            <button
              onClick={handleLogout}
              className="text-red-600 hover:text-red-800 font-medium"
            >
              Logout
            </button>
          )
        ) : (
          // Show full header on all other pages (including /posts)
          <>

            <Link href="/users" className="text-gray-800 hover:text-blue-600">Users</Link>
            <Link href="/posts" className="text-gray-800 hover:text-blue-600">Posts</Link>
            <Link href="/chart" className="text-gray-800 hover:text-blue-600">Dashboard</Link>

            {user && (
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-800 font-medium"
              >
                Logout
              </button>
            )}
          </>
        )}
      </nav>
    </header>
  );
  
}
