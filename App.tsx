import React, { useState } from 'react';
import { ViewState, Article } from './types';
import Sidebar from './components/Layout/Sidebar';
import Dashboard from './components/Admin/Dashboard';
import NewsFeed from './components/Public/NewsFeed';
import ArticleView from './components/Public/ArticleView';
import { Newspaper } from 'lucide-react';
import { t } from './services/i18n';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.PUBLIC_HOME);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const isAdminView = [
    ViewState.ADMIN_DASHBOARD,
    ViewState.ADMIN_EDITOR,
    ViewState.ADMIN_SETTINGS
  ].includes(currentView);

  const renderPublicContent = () => {
    if (currentView === ViewState.PUBLIC_ARTICLE && selectedArticle) {
      return (
        <ArticleView 
          article={selectedArticle} 
          onBack={() => setCurrentView(ViewState.PUBLIC_HOME)} 
        />
      );
    }
    return (
      <NewsFeed 
        onReadArticle={(article) => {
          setSelectedArticle(article);
          setCurrentView(ViewState.PUBLIC_ARTICLE);
          window.scrollTo(0, 0);
        }} 
      />
    );
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

  if (isAdminView) {
    return (
      <div className="flex bg-slate-50 min-h-screen">
        <Sidebar currentView={currentView} onChangeView={setCurrentView} />
        <main className="flex-1 p-8 overflow-y-auto h-screen">
          <header className="flex justify-between items-center mb-8">
             <h1 className="text-2xl font-bold text-slate-800">
                {currentView === ViewState.ADMIN_DASHBOARD && t.dashboard}
                {currentView === ViewState.ADMIN_EDITOR && t.contentEditor}
                {currentView === ViewState.ADMIN_SETTINGS && t.settings}
             </h1>
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold border-2 border-white shadow-sm">
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
    <div className="bg-slate-50 min-h-screen flex flex-col">
      {/* Public Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => setCurrentView(ViewState.PUBLIC_HOME)}
          >
            <div className="bg-blue-600 text-white p-1.5 rounded-lg">
                <Newspaper size={20} />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">{t.siteName}</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <button className="text-sm font-medium text-slate-600 hover:text-slate-900">{t.latest}</button>
            <button className="text-sm font-medium text-slate-600 hover:text-slate-900">{t.trending}</button>
            <button className="text-sm font-medium text-slate-600 hover:text-slate-900">{t.about}</button>
          </nav>
          <button 
            onClick={() => setCurrentView(ViewState.ADMIN_DASHBOARD)}
            className="text-sm font-medium text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors"
          >
            {t.adminLogin}
          </button>
        </div>
      </header>

      <main className="flex-grow">
        {renderPublicContent()}
      </main>

      <footer className="bg-white border-t border-slate-200 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500">
            <p>&copy; {new Date().getFullYear()} {t.footerRights}</p>
        </div>
      </footer>
    </div>
  );
};

export default App;