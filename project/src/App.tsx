import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { AuthForm } from './components/AuthForm';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ArticleList } from './pages/ArticleList';
import { ArticleCreate } from './pages/ArticleCreate';
import { ArticleEdit } from './pages/ArticleEdit';
import { ArticleDetail } from './pages/ArticleDetail';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/auth" element={<AuthForm />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <ArticleList />
                  </main>
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/new"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <ArticleCreate />
                  </main>
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <ArticleEdit />
                  </main>
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/article/:id"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <ArticleDetail />
                  </main>
                </>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}