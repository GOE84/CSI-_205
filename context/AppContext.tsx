'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchProducts, type Product } from '@/data/products';
import { verifyUser, type User } from '@/data/users';

type AppContextType = {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  carts: Product[];
  setCarts: React.Dispatch<React.SetStateAction<Product[]>>;
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  authReady: boolean;
  login: (userInput: string, passInput: string) => User | null;
  logout: () => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

const USER_STORAGE_KEY = 'csi205_user';
const CARTS_STORAGE_KEY = 'csi205_carts';

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [carts, setCarts] = useState<Product[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    let savedCarts: Product[] = [];
    try {
      const savedUserStr = localStorage.getItem(USER_STORAGE_KEY);
      if (savedUserStr) {
        const parsedUser = JSON.parse(savedUserStr) as User;
        if (parsedUser && parsedUser.email) {
          setUser(parsedUser);
        }
      }
      const savedCartsStr = localStorage.getItem(CARTS_STORAGE_KEY);
      if (savedCartsStr) {
        const parsedCarts = JSON.parse(savedCartsStr);
        if (Array.isArray(parsedCarts)) {
          savedCarts = parsedCarts;
          setCarts(savedCarts);
        }
      }
    } catch {
      // ignore localStorage read errors
    } finally {
      setAuthReady(true);
    }

    fetchProducts().then((data) => {
      const cartIds = new Set(savedCarts.map((item) => item.id));
      setProducts(data.filter((item) => !cartIds.has(item.id)));
    });
  }, []);

  useEffect(() => {
    if (!authReady) return;
    try {
      if (user) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    } catch {
      // ignore localStorage write errors
    }
  }, [user, authReady]);

  useEffect(() => {
    if (!authReady) return;
    try {
      localStorage.setItem(CARTS_STORAGE_KEY, JSON.stringify(carts));
    } catch {
      // ignore localStorage write errors
    }
  }, [carts, authReady]);

  const addToCart = (product: Product) => {
    setCarts((prev) => [...prev, product]);
    setProducts((prev) => prev.filter((item) => item.id !== product.id));
  };

  const removeFromCart = (product: Product) => {
    setCarts((prev) => prev.filter((item) => item.id !== product.id));
    setProducts((prev) => [...prev, product].sort((a, b) => a.id - b.id));
  };

  const login = (userInput: string, passInput: string): User | null => {
    const matched = verifyUser(userInput, passInput);
    if (matched) {
      setUser(matched);
      try {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(matched));
      } catch {
        // ignore
      }
      return matched;
    }
    return null;
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(USER_STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  return (
    <AppContext.Provider
      value={{
        products,
        setProducts,
        carts,
        setCarts,
        addToCart,
        removeFromCart,
        user,
        setUser,
        authReady,
        login,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
