import React, { useState, useEffect } from 'react';
import { dataService } from '../../services/dataService';
import { Article, Category } from '../../types';
import { Search, Calendar, User, ArrowRight, TrendingUp } from 'lucide-react';
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

  const featuredArticle = articles[0];
  const gridArticles = articles.slice(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Dynamic Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 animate-fade-in">
        <div>
          <span className="inline-block py-1 px-3 rounded-full bg-white/40 border border-white/50 text-blue-900 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm backdrop-blur-sm">
             {new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
             {t.latestNews}<span className="text-blue-600">.</span>
          </h1>
          <p className="text-slate-700 mt-3 text-xl max-w-lg font-medium opacity-80">{t.newsSubtitle}</p>
        </div>
        
        <div className="relative w-full md:w-96 group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
             <Search className="h-5 w-5 text-slate-500 group-focus-within:text-blue-600 transition-colors" />
          </div>
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-4 bg-white/70 backdrop-blur-md border border-white/50 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none shadow-lg transition-all text-slate-800 placeholder-slate-500"
          />
        </div>
      </div>

      {/* Category Pills with Glass Effect */}
      <div className="flex flex-wrap gap-3 mb-12 overflow-x-auto pb-4 scrollbar-hide animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <button
          onClick={() => setActiveCategory('All')}
          className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all transform hover:scale-105 ${
            activeCategory === 'All' 
              ? 'bg-slate-900 text-white shadow-xl' 
              : 'bg-white/60 backdrop-blur-sm text-slate-700 hover:bg-white hover:text-blue-600 border border-white/40'
          }`}
        >
          {t.all}
        </button>
        {Object.values(Category).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all transform hover:scale-105 ${
              activeCategory === cat 
                ? 'bg-slate-900 text-white shadow-xl' 
                : 'bg-white/60 backdrop-blur-sm text-slate-700 hover:bg-white hover:text-blue-600 border border-white/40'
            }`}
          >
            {translate(cat)}
          </button>
        ))}
      </div>

      {articles.length === 0 ? (
        <div className="text-center py-32 glass-panel rounded-3xl">
            <div className="inline-block p-6 rounded-full bg-blue-50 mb-4">
                <Search size={48} className="text-blue-300" />
            </div>
            <p className="text-slate-600 text-xl font-medium">{t.noArticles}</p>
        </div>
      ) : (
        <div className="space-y-12">
            {/* Featured Hero Card */}
            {featuredArticle && (
                <div 
                    onClick={() => onReadArticle(featuredArticle)}
                    className="group relative rounded-[2rem] overflow-hidden shadow-2xl cursor-pointer min-h-[500px] flex items-end animate-fade-in"
                    style={{ animationDelay: '0.2s' }}
                >
                    <div className="absolute inset-0">
                        <img 
                            src={featuredArticle.imageUrl} 
                            alt={featuredArticle.title} 
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent opacity-90" />
                    </div>
                    <div className="relative p-8 md:p-12 w-full md:w-2/3">
                        <div className="flex items-center gap-3 mb-4">
                             <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg shadow-blue-600/50">
                                {translate(featuredArticle.category)}
                             </span>
                             <span className="flex items-center gap-1 text-slate-300 text-sm font-medium backdrop-blur-sm bg-white/10 px-2 py-1 rounded-full">
                                <TrendingUp size={14} /> Trending
                             </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight group-hover:text-blue-200 transition-colors">
                            {featuredArticle.title}
                        </h2>
                        <p className="text-slate-200 text-lg mb-8 line-clamp-2 max-w-2xl leading-relaxed">
                            {featuredArticle.excerpt}
                        </p>
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-400 to-purple-400 p-[2px]">
                                    <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center text-white text-xs">
                                        {featuredArticle.author.charAt(0)}
                                    </div>
                                </div>
                                <div className="text-sm">
                                    <p className="text-white font-semibold">{featuredArticle.author}</p>
                                    <p className="text-slate-400">{new Date(featuredArticle.createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <button className="ml-auto flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors">
                                {t.readArticle} <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {gridArticles.map((article, index) => (
                <div 
                    key={article.id} 
                    className="glass-card group rounded-2xl overflow-hidden hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col h-full animate-fade-in"
                    style={{ animationDelay: `${0.3 + (index * 0.1)}s` }}
                    onClick={() => onReadArticle(article)}
                >
                    <div className="relative h-48 overflow-hidden">
                        <img 
                            src={article.imageUrl} 
                            alt={article.title} 
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute top-4 left-4">
                            <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold text-slate-800 uppercase tracking-wide shadow-sm">
                                {translate(article.category)}
                            </span>
                        </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                        <div className="flex items-center gap-4 text-xs font-medium text-slate-500 mb-4">
                            <div className="flex items-center gap-1.5">
                                <Calendar size={14} className="text-blue-500" />
                                <span>{new Date(article.createdAt).toLocaleDateString(currentLang === 'ru' ? 'ru-RU' : 'en-US')}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <User size={14} className="text-purple-500" />
                                <span>{article.author}</span>
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all line-clamp-2">
                            {article.title}
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">
                            {article.excerpt}
                        </p>
                        <div className="flex items-center text-blue-600 font-bold text-sm group-hover:gap-2 transition-all pt-4 border-t border-slate-100">
                            {t.readArticle} <ArrowRight size={16} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
      )}
    </div>
  );
};

export default NewsFeed;