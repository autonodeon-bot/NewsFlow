import React from 'react';
import { Article } from '../../types';
import { ArrowLeft, Calendar, User, Eye, Share2 } from 'lucide-react';
import { t, translate, currentLang } from '../../services/i18n';

interface ArticleViewProps {
  article: Article;
  onBack: () => void;
}

const ArticleView: React.FC<ArticleViewProps> = ({ article, onBack }) => {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-8 font-medium"
      >
        <ArrowLeft size={20} />
        {t.backToNews}
      </button>

      <div className="mb-8">
        <span className="text-blue-600 font-bold uppercase tracking-wider text-sm">
          {translate(article.category)}
        </span>
        <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mt-3 mb-6 leading-tight">
          {article.title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-6 text-slate-500 text-sm border-b border-slate-200 pb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                <User size={16} />
            </div>
            <span className="font-medium text-slate-700">{article.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span>{new Date(article.createdAt).toLocaleDateString(currentLang === 'ru' ? 'ru-RU' : undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
           <div className="flex items-center gap-2">
            <Eye size={16} />
            <span>{article.views.toLocaleString()} {t.views}</span>
          </div>
        </div>
      </div>

      <div className="rounded-2xl overflow-hidden mb-10 shadow-lg">
        <img src={article.imageUrl} alt={article.title} className="w-full h-auto object-cover" />
      </div>

      <div className="prose prose-lg prose-slate max-w-none">
        {/* Simple rendering for paragraphs */}
        {article.content.split('\n').map((paragraph, idx) => (
          paragraph.trim() && <p key={idx} className="mb-6 text-slate-700 leading-relaxed">{paragraph}</p>
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-slate-200 flex justify-between items-center">
        <p className="text-slate-500 italic">{t.endOfArticle}</p>
        <button className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors">
            <Share2 size={20} />
            <span className="font-medium">{t.share}</span>
        </button>
      </div>
    </article>
  );
};

export default ArticleView;