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
    );
  }

  if (view === 'settings') {
      return (
          <div className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-4">{t.settings}</h2>
              <p className="text-slate-500">Platform configuration would go here (Theme, User Roles, API Keys).</p>
          </div>
      )
  }

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm font-medium">{t.totalViews}</p>
              <h3 className="text-3xl font-bold text-slate-800">
                {analytics.reduce((acc, curr) => acc + curr.views, 0).toLocaleString()}
              </h3>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
              <Eye size={24} />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm font-medium">{t.totalReactions}</p>
              <h3 className="text-3xl font-bold text-slate-800">
                 {analytics.reduce((acc, curr) => acc + curr.reactions, 0).toLocaleString()}
              </h3>
            </div>
            <div className="p-3 bg-red-50 text-red-600 rounded-lg">
              <ThumbsUp size={24} />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm font-medium">{t.articlesPublished}</p>
              <h3 className="text-3xl font-bold text-slate-800">{articles.length}</h3>
            </div>
            <div className="p-3 bg-green-50 text-green-600 rounded-lg">
              <Edit size={24} />
            </div>
          </div>
        </div>
      </div>

      <ChartSection analyticsData={analytics} categoryStats={catStats} />

      {/* Articles Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-800">{t.recentArticles}</h3>
          <button 
            onClick={() => { setEditingId(null); setCurrentMode('edit'); }}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            <Plus size={16} />
            {t.newArticle}
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-200">
                <th className="px-6 py-4 font-medium">{t.tableTitle}</th>
                <th className="px-6 py-4 font-medium">{t.tableCategory}</th>
                <th className="px-6 py-4 font-medium">{t.tableViews}</th>
                <th className="px-6 py-4 font-medium">{t.tableDate}</th>
                <th className="px-6 py-4 font-medium text-right">{t.tableActions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {articles.map((article) => (
                <tr key={article.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-800 truncate max-w-xs">{article.title}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-medium">
                      {translate(article.category)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{article.views.toLocaleString()}</td>
                  <td className="px-6 py-4 text-slate-600">
                    {new Date(article.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                        onClick={() => { setEditingId(article.id); setCurrentMode('edit'); }}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm"
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

export default Dashboard;