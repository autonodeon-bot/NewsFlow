import React, { useState, useEffect } from 'react';
import { Article, Category } from '../../types';
import { dataService } from '../../services/dataService';
import { generateAIContent, generateAISummary } from '../../services/geminiService';
import { Save, Wand2, ArrowLeft, Loader2, Trash2, Image as ImageIcon } from 'lucide-react';
import { t, translate } from '../../services/i18n';

interface ContentEditorProps {
  articleId?: string | null;
  onSave: () => void;
  onCancel: () => void;
}

const ContentEditor: React.FC<ContentEditorProps> = ({ articleId, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Partial<Article>>({
    title: '',
    category: Category.TECHNOLOGY,
    content: '',
    excerpt: '',
    status: 'draft',
    imageUrl: '',
  });
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (articleId) {
      const article = dataService.getArticleById(articleId);
      if (article) {
        setFormData(article);
      }
    }
  }, [articleId]);

  const handleGenerateAI = async () => {
    if (!formData.title) {
      setError(t.genError);
      return;
    }
    
    setAiLoading(true);
    setError('');
    
    try {
      // Gemini service now handles the prompt language based on i18n
      const content = await generateAIContent(formData.title!, formData.category!);
      setFormData(prev => ({ ...prev, content }));
      
      const summary = await generateAISummary(content);
      setFormData(prev => ({ ...prev, excerpt: summary }));
      
    } catch (err) {
      setError(t.genFail);
    } finally {
      setAiLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate network request
    setTimeout(() => {
      dataService.saveArticle(formData);
      setLoading(false);
      onSave();
    }, 500);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50">
        <h2 className="text-xl font-bold text-slate-800">
          {articleId ? t.editArticle : t.createArticle}
        </h2>
        <button onClick={onCancel} className="text-slate-500 hover:text-slate-700">
          <ArrowLeft size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">{t.titleLabel}</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder={t.titlePlaceholder}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">{t.categoryLabel}</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              {Object.values(Category).map((cat) => (
                <option key={cat} value={cat}>{translate(cat)}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
           <label className="text-sm font-medium text-slate-700">{t.imageLabel}</label>
           <div className="flex gap-2">
             <div className="relative flex-1">
               <ImageIcon className="absolute left-3 top-2.5 text-slate-400" size={18} />
               <input
                type="text"
                value={formData.imageUrl}
                onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg outline-none"
                placeholder="https://..."
               />
             </div>
             <button type="button" onClick={() => setFormData({...formData, imageUrl: `https://picsum.photos/800/600?random=${Date.now()}`})} className="px-3 py-2 text-sm bg-slate-100 hover:bg-slate-200 rounded-lg">
                {t.random}
             </button>
           </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-slate-700">{t.contentLabel}</label>
            <button
              type="button"
              onClick={handleGenerateAI}
              disabled={aiLoading}
              className="flex items-center gap-2 text-xs font-semibold text-purple-600 bg-purple-50 hover:bg-purple-100 px-3 py-1.5 rounded-full transition-colors"
            >
              {aiLoading ? <Loader2 size={14} className="animate-spin" /> : <Wand2 size={14} />}
              {t.autoWrite}
            </button>
          </div>
          <textarea
            required
            rows={12}
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-sans text-slate-700 leading-relaxed"
            placeholder={t.contentPlaceholder}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">{t.excerptLabel}</label>
          <textarea
            rows={3}
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder={t.excerptPlaceholder}
          />
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-slate-200">
           <button
             type="button"
             onClick={() => {
                if(confirm(t.deleteConfirm)) {
                    if(formData.id) dataService.deleteArticle(formData.id);
                    onCancel();
                }
             }}
             className="text-red-500 hover:text-red-700 flex items-center gap-2 px-4 py-2"
           >
             <Trash2 size={18} />
             {t.delete}
           </button>
           <div className="flex gap-4">
            <button
                type="button"
                onClick={onCancel}
                className="px-6 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
                {t.cancel}
            </button>
            <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-lg font-medium shadow-md flex items-center gap-2 transition-colors disabled:opacity-50"
            >
                {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                {t.saveArticle}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContentEditor;