import React, { useState, useEffect } from 'react';
import { dataService } from '../../services/dataService';
import { Article, Category } from '../../types';
import { Search, Calendar, User, ArrowRight } from 'lucide-react';
import { t, translate, currentLang } from '../../services/i18n';

interface NewsFeedProps {
    onReadArticle: (article: Article) => void;
}

const NewsFeed: React.FC<NewsFeedProps> = ({ onReadArticle }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const data = dataService.getArticles(searchQuery, activeCategory);
    setArticles(data);
  }, [searchQuery, activeCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">{t.latestNews}</h1>
          <p className="text-slate-500 mt-2 text-lg">{t.newsSubtitle}</p>
        </div>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none shadow-sm transition-all"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 mb-10 overflow-x-auto pb-2 scrollbar-hide">
        <button
          onClick={() => setActiveCategory('All')}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
            activeCategory === 'All' 
              ? 'bg-blue-600 text-white shadow-md' 
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          {t.all}
        </button>
        {Object.values(Category).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {translate(cat)}
          </button>
        ))}
      </div>

      {/* Grid */}
      {articles.length === 0 ? (
        <div className="text-center py-20">
            <p className="text-slate-500 text-lg">{t.noArticles}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
            <div 
                key={article.id} 
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col cursor-pointer h-full"
                onClick={() => onReadArticle(article)}
            >
                <div className="relative h-56 overflow-hidden">
                <img 
                    src={article.imageUrl} 
                    alt={article.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-800 uppercase tracking-wide">
                    {translate(article.category)}
                    </span>
                </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
                    <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{new Date(article.createdAt).toLocaleDateString(currentLang === 'ru' ? 'ru-RU' : 'en-US')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                    <User size={14} />
                    <span>{article.author}</span>
                    </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {article.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">
                    {article.excerpt}
                </p>
                <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:gap-2 transition-all">
                    {t.readArticle} <ArrowRight size={16} className="ml-1" />
                </div>
                </div>
            </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default NewsFeed;