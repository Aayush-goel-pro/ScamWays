import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import { Edit, Trash2 } from 'lucide-react';
import type { Article } from '../types/article';

export function ArticleDetail() {
  const [article, setArticle] = useState<Article | null>(null);
  const [error, setError] = useState('');
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (id) {
      loadArticle(id);
    }
  }, [id]);

  async function loadArticle(articleId: string) {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('id', articleId)
      .single();

    if (error) {
      setError('Article not found');
      return;
    }

    setArticle(data);
  }

  async function handleDelete() {
    if (!article) return;

    const { error: deleteError } = await supabase
      .from('articles')
      .delete()
      .eq('id', article.id);

    if (!deleteError) {
      navigate('/');
    }
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  if (!article) {
    return <div>Loading...</div>;
  }

  const isOwner = user?.id === article.user_id;

  return (
    <article className="max-w-4xl mx-auto">
      {article.image_url && (
        <img
          src={article.image_url}
          alt={article.title}
          className="w-full h-96 object-cover rounded-lg shadow-lg mb-8"
        />
      )}

      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-4xl font-bold text-gray-900">{article.title}</h1>
          {isOwner && (
            <div className="flex gap-4">
              <button
                onClick={() => navigate(`/edit/${article.id}`)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <Edit className="w-5 h-5" />
              </button>
              <button
                onClick={handleDelete}
                className="p-2 hover:bg-gray-100 rounded-full text-red-500"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        <div className="prose max-w-none">
          {article.content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4 text-gray-700">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-8 text-sm text-gray-500">
          Published on {new Date(article.created_at).toLocaleDateString()}
        </div>
      </div>
    </article>
  );
}