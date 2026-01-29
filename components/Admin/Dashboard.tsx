import React, { useState, useEffect } from 'react';
import { Article, AnalyticsData, CategoryStat } from '../../types';
import { dataService } from '../../services/dataService';
import ChartSection from './ChartSection';
import ContentEditor from './ContentEditor';
import { Edit, Eye, ThumbsUp, Plus } from 'lucide-react';
import { t, translate } from '../../services/i18n';

interface DashboardProps {
  view: 'dashboard' | 'editor' | 'settings';
}

const Dashboard: React.FC<DashboardProps> = ({ view }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData[]>([]);
  const [catStats, setCatStats] = useState<CategoryStat[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [currentMode, setCurrentMode] = useState<'list' | 'edit'>('list');

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    setArticles(dataService.getArticles());
    setAnalytics(dataService.getAnalytics());
    setCatStats(dataService.getCategoryStats());
  };

  useEffect(() => {
    // If parent switches view to editor, handle mode
    if (view === 'editor') setCurrentMode('edit');
    else if (view === 'dashboard') setCurrentMode('list');
  }, [view]);

  if (currentMode === 'edit') {
    return (
      <div className="animate-fade-in">
        <ContentEditor 
            articleId={editingId} 
            onSave={() => {
                setCurrentMode('list');
                setEditingId(null);
                refreshData();
            }}
            onCancel={() => {
                setCurrentMode('list');
                setEditingId(null);
            }}
        />
      </div>
    );
  }

  if (view === 'settings') {
      return (
          <div className="glass-panel rounded-2xl p-8 shadow-xl animate-fade-in">
              <h2 className="text-3xl font-bold mb-6 text-slate-800 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 w-fit">{t.settings}</h2>
              <div className="p-10 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center text-slate-400 bg-white/50">
                <SettingsPlaceholder />
                <p className="mt-4 font-medium">Platform configuration panel</p>
              </div>
          </div>
      )
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPICard 
            title={t.totalViews} 
            value={analytics.reduce((acc, curr) => acc + curr.views, 0).toLocaleString()} 
            icon={<Eye size={28} className="text-white" />}
            gradient="from-blue-500 to-cyan-400"
        />
        <KPICard 
            title={t.totalReactions} 
            value={analytics.reduce((acc, curr) => acc + curr.reactions, 0).toLocaleString()} 
            icon={<ThumbsUp size={28} className="text-white" />}
            gradient="from-purple-500 to-pink-500"
        />
        <KPICard 
            title={t.articlesPublished} 
            value={articles.length.toString()} 
            icon={<Edit size={28} className="text-white" />}
            gradient="from-emerald-500 to-teal-400"
        />
      </div>

      <ChartSection analyticsData={analytics} categoryStats={catStats} />

      {/* Articles Table */}
      <div className="glass-panel rounded-2xl shadow-xl overflow-hidden">
        <div className="p-6 border-b border-white/30 flex justify-between items-center bg-white/40 backdrop-blur-md">
          <h3 className="text-xl font-bold text-slate-800">{t.recentArticles}</h3>
          <button 
            onClick={() => { setEditingId(null); setCurrentMode('edit'); }}
            className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg hover:shadow-xl hover:bg-slate-800 transition-all transform hover:-translate-y-0.5"
          >
            <Plus size={18} />
            {t.newArticle}
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/20 text-slate-600 text-sm border-b border-white/20">
                <th className="px-6 py-5 font-bold uppercase tracking-wider text-xs">{t.tableTitle}</th>
                <th className="px-6 py-5 font-bold uppercase tracking-wider text-xs">{t.tableCategory}</th>
                <th className="px-6 py-5 font-bold uppercase tracking-wider text-xs">{t.tableViews}</th>
                <th className="px-6 py-5 font-bold uppercase tracking-wider text-xs">{t.tableDate}</th>
                <th className="px-6 py-5 font-bold uppercase tracking-wider text-xs text-right">{t.tableActions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/20">
              {articles.map((article) => (
                <tr key={article.id} className="hover:bg-white/30 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-slate-800 truncate max-w-xs">{article.title}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-white/50 border border-white/50 text-slate-700 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                      {translate(article.category)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{article.views.toLocaleString()}</td>
                  <td className="px-6 py-4 text-slate-600">
                    {new Date(article.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                        onClick={() => { setEditingId(article.id); setCurrentMode('edit'); }}
                        className="text-blue-600 hover:text-blue-800 font-bold text-sm bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      {t.edit}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const KPICard = ({ title, value, icon, gradient }: { title: string, value: string, icon: React.ReactNode, gradient: string }) => (
    <div className="relative overflow-hidden rounded-2xl shadow-xl glass-card border-none group">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />
        <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-gradient-to-br from-white/20 to-transparent blur-2xl" />
        
        <div className="relative p-6 flex items-center justify-between">
            <div>
                <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">{title}</p>
                <h3 className="text-4xl font-extrabold text-slate-800">{value}</h3>
            </div>
            <div className={`p-4 rounded-2xl shadow-lg bg-gradient-to-br ${gradient} transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                {icon}
            </div>
        </div>
    </div>
);

const SettingsPlaceholder = () => (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
    </svg>
)

export default Dashboard;