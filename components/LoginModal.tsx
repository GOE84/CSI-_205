'use client';

import { useRef, useState } from 'react';
import { Envelope1, Eye, EyeDisabled } from '@tailgrids/icons';
import { Button } from '@/components/tailgrids/core/button';
import { useAppContext } from '@/context/AppContext';

export default function LoginModal() {
  const { user, authReady, login } = useAppContext();
  const [userInput, setUserInput] = useState('');
  const [passInput, setPassInput] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const userRef = useRef<HTMLInputElement>(null);

  if (!authReady || user) return null;

  const submitLogin = () => {
    const matched = login(userInput, passInput);
    if (!matched) {
      setError('Invalid username or password');
      setPassInput('');
      userRef.current?.focus();
    } else {
      setError('');
      setUserInput('');
      setPassInput('');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    submitLogin();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
        <h2 className="text-center text-base font-bold text-gray-900 mb-4">
          Who are you?
        </h2>

        <form onSubmit={handleLogin} className="space-y-3">
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 gap-2 focus-within:border-blue-500">
            <Envelope1 className="size-4 text-gray-500 shrink-0" />
            <input
              ref={userRef}
              type="text"
              value={userInput}
              onChange={(e) => {
                setUserInput(e.target.value);
                if (error) setError('');
              }}
              placeholder="user | admin | manager"
              className="w-full border-none p-0 text-sm text-gray-800 placeholder-gray-400 focus:ring-0 outline-none"
              autoFocus
            />
            <span className="text-xs sm:text-sm text-gray-700 shrink-0">
              @company.com
            </span>
          </div>

          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 gap-2 focus-within:border-blue-500">
            <button
              type="button"
              onClick={() => setShowPass((prev) => !prev)}
              aria-label={showPass ? 'Hide password' : 'Show password'}
              className="text-gray-500 hover:text-gray-700 shrink-0"
            >
              {showPass ? (
                <Eye className="size-4" />
              ) : (
                <EyeDisabled className="size-4" />
              )}
            </button>
            <input
              type={showPass ? 'text' : 'password'}
              value={passInput}
              onChange={(e) => {
                setPassInput(e.target.value);
                if (error) setError('');
              }}
              placeholder="pass"
              className="w-full border-none p-0 text-sm text-gray-800 placeholder-gray-400 focus:ring-0 outline-none"
            />
          </div>

          {error && (
            <p role="alert" className="text-xs text-red-600 text-center">
              {error}
            </p>
          )}

          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              appearance="outline"
              variant="primary"
              size="sm"
              onPress={submitLogin}
            >
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
