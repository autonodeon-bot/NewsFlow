import React, { useState, useTransition } from 'react';
import { ViewState, Article } from './types';
import Sidebar from './components/Layout/Sidebar';
import Dashboard from './components/Admin/Dashboard';
import NewsFeed from './components/Public/NewsFeed';
import ArticleView from './components/Public/ArticleView';
import { Newspaper, Loader2, Sparkles } from 'lucide-react';
import { t } from './services/i18n';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.PUBLIC_HOME);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isPending, startTransition] = useTransition();

  const isAdminView = [
    ViewState.ADMIN_DASHBOARD,
    ViewState.ADMIN_EDITOR,
    ViewState.ADMIN_SETTINGS
  ].includes(currentView);

  const handleViewChange = (newView: ViewState) => {
    startTransition(() => {
      setCurrentView(newView);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  const handleReadArticle = (article: Article) => {
    startTransition(() => {
      setSelectedArticle(article);
      setCurrentView(ViewState.PUBLIC_ARTICLE);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  const renderPublicContent = () => {
    if (currentView === ViewState.PUBLIC_ARTICLE && selectedArticle) {
      return (
        <ArticleView 
          article={selectedArticle} 
          onBack={() => handleViewChange(ViewState.PUBLIC_HOME)} 
        />
      );
    }
    return <NewsFeed onReadArticle={handleReadArticle} />;
  };

  const renderAdminContent = () => {
    switch (currentView) {
      case ViewState.ADMIN_EDITOR:
        return <Dashboard view="editor" />;
      case ViewState.ADMIN_SETTINGS:
        return <Dashboard view="settings" />;
      default:
        return <Dashboard view="dashboard" />;
    }
  };

  // Admin Layout
  if (isAdminView) {
    return (
      <div className="flex min-h-screen bg-slate-900/10 backdrop-blur-sm">
        <Sidebar currentView={currentView} onChangeView={handleViewChange} />
        <main className={`flex-1 p-8 overflow-y-auto h-screen transition-opacity duration-300 ${isPending ? 'opacity-50' : 'opacity-100'}`}>
          <header className="flex justify-between items-center mb-8 glass-panel p-4 rounded-2xl">
             <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                {currentView === ViewState.ADMIN_DASHBOARD && t.dashboard}
                {currentView === ViewState.ADMIN_EDITOR && t.contentEditor}
                {currentView === ViewState.ADMIN_SETTINGS && t.settings}
                {isPending && <Loader2 className="animate-spin text-blue-600" size={20} />}
             </h1>
             <div className="flex items-center gap-4">
                <div className="flex flex-col items-end mr-2">
                    <span className="text-xs font-bold uppercase text-blue-800 tracking-wider">Admin</span>
                    <span className="text-xs text-slate-600">Online</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg ring-2 ring-white/50">
                    AD
                </div>
             </div>
          </header>
          {renderAdminContent()}
        </main>
      </div>
    );
  }

  // Public Layout
  return (
    <div className="min-h-screen flex flex-col transition-colors duration-500">
      {/* Public Header */}
      <header className="glass-nav sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => handleViewChange(ViewState.PUBLIC_HOME)}
          >
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-2 rounded-xl shadow-lg transform group-hover:rotate-6 transition-transform">
                <Newspaper size={24} />
            </div>
            <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-700 tracking-tight">
                {t.siteName}
            </span>
          </div>
          
          <nav className="hidden md:flex items-center gap-2 bg-white/40 p-1.5 rounded-full border border-white/40 shadow-inner">
            {[t.latest, t.trending, t.about].map((item) => (
                <button key={item} className="px-5 py-2 rounded-full text-sm font-semibold text-slate-700 hover:bg-white hover:shadow-sm transition-all">
                    {item}
                </button>
            ))}
          </nav>

          <button 
            onClick={() => handleViewChange(ViewState.ADMIN_DASHBOARD)}
            className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl font-medium shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all text-sm"
          >
            <Sparkles size={16} className="text-yellow-300" />
            {t.adminLogin}
          </button>
        </div>
      </header>

      <main className={`flex-grow transition-opacity duration-500 ${isPending ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
        {renderPublicContent()}
      </main>

      <footer className="glass-panel mt-12 border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center text-slate-600">
            <p className="font-medium">&copy; {new Date().getFullYear()} {t.footerRights}</p>
        </div>
      </footer>
    </div>
  );
};

export default App;