import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function Header() {
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <Shield className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">ScamWays</span>
          </Link>
          
          <nav className="flex items-center gap-4">
            <Link 
              to="/new" 
              className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
            >
              New Article
            </Link>
            <button
              onClick={handleSignOut}
              className="text-gray-500 hover:text-gray-700"
            >
              Sign Out
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}