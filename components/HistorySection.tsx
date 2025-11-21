import React from 'react';
import { HistoryItem } from '../types';
import { Copy, Trash2, Clock } from 'lucide-react';
import { Button } from './ui/button';

interface HistorySectionProps {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  onDelete: (id: string) => void;
  onClear: () => void;
}

const HistorySection: React.FC<HistorySectionProps> = ({ history, onSelect, onDelete, onClear }) => {
  if (history.length === 0) return null;

  return (
    <div className="w-full mt-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="flex justify-between items-center mb-6 border-b border-slate-200 pb-4">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Clock className="w-6 h-6 text-brand-500" />
          Recent History
        </h2>
        <Button variant="ghost" size="sm" onClick={onClear} className="text-red-500 hover:text-red-600 hover:bg-red-50">
          Clear All
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {history.map((item) => (
          <div key={item.id} className="group relative bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-all">
            <div 
                className="aspect-video w-full overflow-hidden bg-slate-100 relative cursor-pointer" 
                onClick={() => onSelect(item)}
            >
              <img src={item.thumbnail} alt="Thumbnail" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              
              {/* Hover Overlay Actions */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                 <Button
                    size="icon"
                    variant="destructive"
                    className="h-8 w-8 shadow-sm"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(item.id);
                    }}
                 >
                    <Trash2 className="w-4 h-4" />
                 </Button>
              </div>
            </div>
            
            <div className="p-4">
                <div className="flex justify-between items-start gap-2 mb-2">
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full bg-brand-50 text-brand-600">
                        {item.style.split(' ')[0]}
                    </span>
                    <span className="text-xs text-slate-400">
                        {new Date(item.timestamp).toLocaleDateString()}
                    </span>
                </div>
                <p 
                    className="text-sm text-slate-600 line-clamp-2 font-mono leading-relaxed mb-3 cursor-pointer hover:text-slate-900"
                    onClick={() => onSelect(item)}
                >
                    {item.prompt}
                </p>
                 <Button
                    variant="secondary"
                    size="sm"
                    className="w-full text-xs h-8"
                    onClick={(e) => {
                         e.stopPropagation();
                         navigator.clipboard.writeText(item.prompt);
                    }}
                 >
                    <Copy className="w-3 h-3 mr-2" /> Copy Prompt
                 </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistorySection;