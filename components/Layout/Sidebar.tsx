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
    <div className="w-20 lg:w-72 transition-all duration-300 h-[96vh] my-[2vh] ml-[2vh] rounded-3xl glass-card flex flex-col sticky top-[2vh] z-40 overflow-hidden shadow-2xl">
      <div className="p-6 lg:p-8 flex items-center justify-center lg:justify-start gap-4 border-b border-white/20 bg-white/30">
        <div className="p-2 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-xl shadow-lg text-white">
            <Newspaper size={24} />
        </div>
        <h2 className="text-2xl font-extrabold hidden lg:block bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">
          {t.siteName}
        </h2>
      </div>
      
      <nav className="flex-1 p-4 space-y-3 mt-4">
        {menuItems.map((item) => {
           const isActive = currentView === item.view;
           return (
            <button
                key={item.view}
                onClick={() => onChangeView(item.view)}
                className={`w-full flex items-center justify-center lg:justify-start gap-4 px-4 py-4 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                isActive
                    ? 'bg-slate-900 text-white shadow-lg' 
                    : 'text-slate-600 hover:bg-white/60 hover:text-blue-600'
                }`}
            >
                {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent pointer-events-none" />
                )}
                <item.icon size={22} className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                <span className="hidden lg:block font-semibold tracking-wide">{item.label}</span>
                {isActive && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-400 rounded-l-full hidden lg:block" />}
            </button>
           );
        })}
      </nav>

      <div className="p-4 border-t border-white/20 bg-red-50/30">
        <button 
          onClick={() => onChangeView(ViewState.PUBLIC_HOME)}
          className="w-full flex items-center justify-center lg:justify-start gap-3 px-4 py-3 text-red-600/80 hover:text-red-700 hover:bg-red-100/50 rounded-xl transition-all font-medium"
        >
          <LogOut size={22} />
          <span className="hidden lg:block">{t.exitToSite}</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;