import React from 'react';
import { Article } from '../../types';
import { ArrowLeft, Calendar, User, Eye, Share2, Bookmark } from 'lucide-react';
import { t, translate, currentLang } from '../../services/i18n';

interface ArticleViewProps {
  article: Article;
  onBack: () => void;
}

const ArticleView: React.FC<ArticleViewProps> = ({ article, onBack }) => {
  return (
    <article className="animate-fade-in pb-20">
      {/* Parallax Hero */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-slate-900/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10" />
        <img 
            src={article.imageUrl} 
            alt={article.title} 
            className="w-full h-full object-cover animate-float"
            style={{ animationDuration: '20s' }}
        />
        
        <div className="absolute top-0 left-0 right-0 p-6 z-20 max-w-7xl mx-auto">
             <button 
                onClick={onBack}
                className="flex items-center gap-2 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 backdrop-blur-md px-4 py-2 rounded-full transition-all font-medium"
            >
                <ArrowLeft size={20} />
                {t.backToNews}
            </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 z-20 max-w-4xl mx-auto text-center">
             <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/80 backdrop-blur-md text-white font-bold tracking-widest uppercase text-sm mb-6 shadow-lg">
                {translate(article.category)}
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-8 leading-tight drop-shadow-lg">
                {article.title}
            </h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 -mt-10 relative z-30">
        <div className="glass-card rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-6 border-b border-slate-200/60 pb-8 mb-8">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-[2px]">
                         <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-slate-700 font-bold">
                             {article.author.charAt(0)}
                         </div>
                    </div>
                    <div>
                        <p className="font-bold text-slate-900">{article.author}</p>
                        <p className="text-sm text-slate-500">Journalist</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-6 text-slate-500 text-sm font-medium">
                     <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg">
                        <Calendar size={16} className="text-blue-500" />
                        <span>{new Date(article.createdAt).toLocaleDateString(currentLang === 'ru' ? 'ru-RU' : undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg">
                        <Eye size={16} className="text-purple-500" />
                        <span>{article.views.toLocaleString()} {t.views}</span>
                    </div>
                </div>
            </div>

            <div className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-a:text-blue-600">
                <p className="lead text-xl text-slate-700 font-medium leading-relaxed mb-8 border-l-4 border-blue-500 pl-6 italic">
                    {article.excerpt}
                </p>
                {article.content.split('\n').map((paragraph, idx) => (
                paragraph.trim() && <p key={idx} className="mb-6 text-slate-700 leading-relaxed">{paragraph}</p>
                ))}
            </div>

            <div className="mt-12 pt-8 border-t border-slate-200/60 flex justify-between items-center">
                <p className="text-slate-400 font-medium tracking-wide text-sm uppercase">{t.endOfArticle}</p>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 px-4 py-2 rounded-xl transition-all font-semibold">
                        <Bookmark size={18} />
                        <span className="hidden sm:inline">Save</span>
                    </button>
                    <button className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2 rounded-xl transition-all shadow-lg hover:shadow-xl font-semibold">
                        <Share2 size={18} />
                        <span>{t.share}</span>
                    </button>
                </div>
            </div>
        </div>
      </div>
    </article>
  );
};

export default ArticleView;