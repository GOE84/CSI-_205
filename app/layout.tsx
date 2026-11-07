'use client';
import "./globals.css";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoginModal from "@/components/LoginModal";
import { Button, buttonStyles } from "@/components/tailgrids/core/button";
import { AppProvider, useAppContext } from "@/context/AppContext";

function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { products, carts, user, logout } = useAppContext();

  return (
    <>
      <LoginModal />
      <Header />
      <nav className="mt-4 flex flex-wrap justify-center items-center gap-2">
        <Link
          href="/"
          className={buttonStyles({ appearance: pathname === '/' ? 'fill' : 'outline', variant: 'primary', size: 'sm' })}
        >
          Home
        </Link>
        <Link
          href="/animation"
          className={buttonStyles({ appearance: pathname === '/animation' ? 'fill' : 'outline', variant: 'primary', size: 'sm' })}
        >
          Animation
        </Link>
        <Link
          href="/calculator"
          className={buttonStyles({ appearance: pathname === '/calculator' ? 'fill' : 'outline', variant: 'primary', size: 'sm' })}
        >
          Calculator
        </Link>
        <Link
          href="/todos"
          className={buttonStyles({ appearance: pathname === '/todos' ? 'fill' : 'outline', variant: 'primary', size: 'sm' })}
        >
          Todos
        </Link>
        <Link
          href="/products"
          className={buttonStyles({ appearance: pathname === '/products' ? 'fill' : 'outline', variant: 'primary', size: 'sm' })}
        >
          Products ({products.length})
        </Link>
        <Link
          href="/carts"
          className={`relative ${buttonStyles({ appearance: pathname === '/carts' ? 'fill' : 'outline', variant: 'primary', size: 'sm' })}`}
        >
          Carts
          <span className="absolute -top-2 -right-2 inline-flex items-center justify-center rounded-full bg-red-500 text-white text-xs font-bold min-w-5 h-5 px-1">
            {carts.length}
          </span>
        </Link>
        {user && (
          <Button appearance="outline" variant="danger" size="sm" onPress={logout}>
            Logout
          </Button>
        )}
      </nav>
      <main className="min-h-[200px]">
        {children}
      </main>
      <Footer />
    </>
  );
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html>
      <body>
        <AppProvider>
          <LayoutContent>{children}</LayoutContent>
        </AppProvider>
      </body>
    </html>
  );
}
