import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend, AreaChart, Area
} from 'recharts';
import { AnalyticsData, CategoryStat } from '../../types';
import { t } from '../../services/i18n';

interface ChartSectionProps {
  analyticsData: AnalyticsData[];
  categoryStats: CategoryStat[];
}

const ChartSection: React.FC<ChartSectionProps> = ({ analyticsData, categoryStats }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Views & Reactions Trend */}
      <div className="glass-panel p-6 rounded-2xl shadow-xl">
        <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span className="w-2 h-6 bg-blue-500 rounded-full"></span>
            {t.trafficOverview}
        </h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={analyticsData}>
              <defs>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorReactions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" vertical={false} />
              <XAxis dataKey="date" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' 
                }}
              />
              <Legend iconType="circle" />
              <Area type="monotone" dataKey="views" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" />
              <Area type="monotone" dataKey="reactions" stroke="#ec4899" strokeWidth={3} fillOpacity={1} fill="url(#colorReactions)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Distribution */}
      <div className="glass-panel p-6 rounded-2xl shadow-xl">
        <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
             <span className="w-2 h-6 bg-purple-500 rounded-full"></span>
            {t.articlesByCategory}
        </h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryStats} layout="vertical" barSize={20}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" horizontal={false} />
              <XAxis type="number" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis dataKey="name" type="category" width={100} stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                 cursor={{ fill: 'rgba(255,255,255,0.2)' }}
                 contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' 
                }}
              />
              <Bar dataKey="value" fill="#8b5cf6" radius={[0, 10, 10, 0]}>
                {
                  categoryStats.map((entry, index) => (
                    <cell key={`cell-${index}`} fill={index % 2 === 0 ? '#6366f1' : '#a855f7'} />
                  ))
                }
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ChartSection;