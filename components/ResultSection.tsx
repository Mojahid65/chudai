import React, { useState } from 'react';
import { CopyIcon, DownloadIcon, CheckIcon, RefreshIcon } from './Icons';

interface ResultSectionProps {
  prompt: string;
  onRegenerate: () => void;
  isLoading: boolean;
}

const ResultSection: React.FC<ResultSectionProps> = ({ prompt, onRegenerate, isLoading }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([prompt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chudai-prompt.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-semibold text-slate-700 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
            Generated Prompt
          </h3>
          <div className="flex gap-2">
            <button
              onClick={onRegenerate}
              disabled={isLoading}
              className="p-2 text-slate-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
              title="Regenerate"
            >
              <RefreshIcon className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
        
        <div className="relative p-6">
          <textarea
            readOnly
            value={prompt}
            className="w-full h-48 p-4 text-slate-700 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none resize-none font-mono text-sm leading-relaxed"
          />
          
          <div className="flex flex-col sm:flex-row gap-3 mt-4 justify-end">
            <button
              onClick={handleDownload}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 hover:border-slate-300 transition-all"
            >
              <DownloadIcon className="w-4 h-4" />
              Download .txt
            </button>
            <button
              onClick={handleCopy}
              className={`
                flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-medium text-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5
                ${copied ? 'bg-green-500 hover:bg-green-600' : 'bg-brand-600 hover:bg-brand-700'}
              `}
            >
              {copied ? (
                <>
                  <CheckIcon className="w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <CopyIcon className="w-4 h-4" />
                  Copy Prompt
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultSection;
