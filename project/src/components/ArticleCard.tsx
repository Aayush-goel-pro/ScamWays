import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Edit, Trash2 } from 'lucide-react';
import type { Article } from '../types/article';

interface ArticleCardProps {
  article: Article;
  onDelete?: (id: string) => void;
  isOwner?: boolean;
}

export function ArticleCard({ article, onDelete, isOwner }: ArticleCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {article.image_url && (
        <img 
          src={article.image_url} 
          alt={article.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2">{article.title}</h2>
        <p className="text-gray-600 mb-4">
          {article.content.substring(0, 150)}...
        </p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>
            {formatDistanceToNow(new Date(article.created_at), { addSuffix: true })}
          </span>
          {isOwner && (
            <div className="flex gap-2">
              <Link 
                to={`/edit/${article.id}`}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <Edit className="w-4 h-4" />
              </Link>
              <button 
                onClick={() => onDelete?.(article.id)}
                className="p-2 hover:bg-gray-100 rounded-full text-red-500"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}