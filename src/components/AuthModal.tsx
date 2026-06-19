import React, { useState } from 'react';
import { Plane, X, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialMode?: 'login' | 'signup';
}

export function AuthModal({ isOpen, onClose, onSuccess, initialMode = 'signup' }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    // Simulate network request
    setTimeout(() => {
      setIsLoading(false);
      onSuccess();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/40 dark:bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <div className="relative bg-white dark:bg-[#111827] w-full max-w-md rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="p-8">
          <div className="flex justify-center mb-6">
            <div className="bg-[#3b82f6] text-white p-2 rounded-xl">
              <Plane className="w-6 h-6" />
            </div>
          </div>
          
          <h2 className="text-2xl font-display font-bold text-center text-slate-900 dark:text-white mb-2">
            {mode === 'login' ? 'Welcome back' : 'Create an account'}
          </h2>
          <p className="text-center text-slate-500 dark:text-slate-400 text-sm mb-8">
            {mode === 'login' 
              ? 'Enter your credentials to access your account' 
              : 'Sign up to start documenting your projects'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm rounded-lg border border-red-100 dark:border-red-900/50">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-[#0B1121] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-[#0B1121] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="••••••••"
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#3b82f6] hover:bg-blue-600 text-white font-medium py-2.5 rounded-lg flex items-center justify-center transition-colors mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {mode === 'login' ? 'Sign in' : 'Create account'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
            >
              {mode === 'login' 
                ? "Don't have an account? Sign up" 
                : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
