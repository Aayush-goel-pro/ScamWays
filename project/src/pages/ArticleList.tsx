import React, { useEffect, useState } from 'react';
import { ArticleCard } from '../components/ArticleCard';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import type { Article } from '../types/article';

export function ArticleList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    loadArticles();
  }, []);

  async function loadArticles() {
    const { data } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) {
      setArticles(data);
    }
  }

  async function handleDelete(id: string) {
    const { error } = await supabase
      .from('articles')
      .delete()
      .eq('id', id);
    
    if (!error) {
      setArticles(articles.filter(article => article.id !== id));
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Latest Articles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map(article => (
          <ArticleCard
            key={article.id}
            article={article}
            onDelete={handleDelete}
            isOwner={user?.id === article.user_id}
          />
        ))}
      </div>
    </div>
  );
}