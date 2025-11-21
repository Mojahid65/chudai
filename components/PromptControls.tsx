import React from 'react';
import { PromptStyle } from '../types';

interface PromptControlsProps {
  currentStyle: PromptStyle;
  onStyleChange: (style: PromptStyle) => void;
  disabled: boolean;
}

const PromptControls: React.FC<PromptControlsProps> = ({ currentStyle, onStyleChange, disabled }) => {
  const styles = Object.values(PromptStyle);

  return (
    <div className="w-full mb-6">
      <label className="block text-sm font-medium text-slate-700 mb-2">
        Select Output Style
      </label>
      <div className="flex flex-wrap gap-2">
        {styles.map((style) => (
          <button
            key={style}
            onClick={() => onStyleChange(style)}
            disabled={disabled}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border
              ${
                currentStyle === style
                  ? 'bg-brand-600 text-white border-brand-600 shadow-md shadow-brand-200'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-brand-300 hover:bg-slate-50'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            {style}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PromptControls;
