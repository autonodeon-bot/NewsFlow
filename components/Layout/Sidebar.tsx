import React from 'react';
import { LayoutDashboard, FileText, Settings, LogOut, Newspaper } from 'lucide-react';
import { ViewState } from '../../types';
import { t } from '../../services/i18n';

interface SidebarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView }) => {
  const menuItems = [
    { view: ViewState.ADMIN_DASHBOARD, label: t.dashboard, icon: LayoutDashboard },
    { view: ViewState.ADMIN_EDITOR, label: t.contentEditor, icon: FileText },
    { view: ViewState.ADMIN_SETTINGS, label: t.settings, icon: Settings },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col h-screen sticky top-0">
      <div className="p-6 border-b border-slate-700">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Newspaper className="text-blue-400" />
          {t.siteName}<span className="text-xs bg-blue-600 px-1 rounded">{t.adminBadge}</span>
        </h2>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.view}
            onClick={() => onChangeView(item.view)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              currentView === item.view 
                ? 'bg-blue-600 text-white' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-700">
        <button 
          onClick={() => onChangeView(ViewState.PUBLIC_HOME)}
          className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg"
        >
          <LogOut size={20} />
          <span>{t.exitToSite}</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;