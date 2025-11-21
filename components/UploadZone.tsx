import React, { useCallback, useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useImageUpload } from './hooks/use-image-upload';
import { ImagePlus, X, Upload, Trash2, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  onClear: () => void;
  previewUrl: string | null; // Kept for prop compatibility, but hook manages it too.
  isGenerating: boolean;
  onGenerate: () => void;
}

const UploadZone: React.FC<UploadZoneProps> = ({ 
  onFileSelect, 
  selectedFile, 
  onClear, 
  isGenerating,
  onGenerate 
}) => {
  // We use the hook for internal logic, but sync with parent via callbacks
  const {
    previewUrl,
    fileName,
    fileInputRef,
    handleThumbnailClick,
    handleFileChange,
    handleRemove: hookRemove,
  } = useImageUpload({
    onUpload: (_, file) => {
      if (file) onFileSelect(file);
    },
  });

  // Sync external clear with internal hook state
  useEffect(() => {
    if (!selectedFile && previewUrl) {
      hookRemove();
    }
  }, [selectedFile, previewUrl, hookRemove]);

  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const file = e.dataTransfer.files?.[0];
      if (file && file.type.startsWith("image/")) {
        const fakeEvent = {
          target: {
            files: [file],
          },
        } as unknown as React.ChangeEvent<HTMLInputElement>;
        handleFileChange(fakeEvent);
      }
    },
    [handleFileChange],
  );

  const handleRemoveFile = () => {
    hookRemove();
    onClear();
  };

  return (
    <div className="w-full space-y-6 bg-white rounded-2xl shadow-xl border border-slate-100 p-6 transition-all">
      
      {/* Upload Area */}
      <Input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      {!previewUrl ? (
        <div
          onClick={handleThumbnailClick}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "flex h-64 cursor-pointer flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 transition-all hover:bg-slate-50 hover:border-brand-300",
            isDragging && "border-brand-500 bg-brand-50 scale-[1.01]",
          )}
        >
          <div className={cn(
            "rounded-full p-4 shadow-sm transition-colors",
            isDragging ? "bg-brand-100 text-brand-600" : "bg-white text-slate-400"
          )}>
            <ImagePlus className="h-8 w-8" />
          </div>
          <div className="text-center px-4">
            <p className="text-lg font-semibold text-slate-700">Click to upload image</p>
            <p className="text-sm text-slate-500 mt-1">
              or drag and drop (JPG, PNG, WebP)
            </p>
          </div>
        </div>
      ) : (
        <div className="relative w-full">
          <div className="group relative aspect-video w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
            <img
              src={previewUrl}
              alt="Preview"
              className="h-full w-full object-contain transition-transform duration-300"
            />
            
            {/* Overlay Actions */}
            {!isGenerating && (
              <>
                <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                   <Button
                    size="icon"
                    variant="secondary"
                    onClick={handleThumbnailClick}
                    className="h-8 w-8 bg-white/90 hover:bg-white shadow-sm backdrop-blur-sm"
                    title="Change Image"
                  >
                    <Upload className="h-4 w-4 text-slate-700" />
                  </Button>
                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={handleRemoveFile}
                    className="h-8 w-8 shadow-sm"
                    title="Remove Image"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </>
            )}
          </div>
          
          {fileName && (
            <div className="mt-3 flex items-center justify-between text-sm text-slate-500 px-1">
              <span className="truncate max-w-[200px] font-medium">{fileName}</span>
              {!isGenerating && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRemoveFile}
                  className="h-auto p-1 text-slate-400 hover:text-red-500"
                >
                  <X className="h-4 w-4 mr-1" /> Remove
                </Button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Generate Action */}
      {previewUrl && (
        <div className="flex flex-col items-center gap-3 pt-2 animate-in fade-in slide-in-from-bottom-2">
          <Button
            onClick={onGenerate}
            disabled={isGenerating}
            size="lg"
            className={cn(
              "w-full max-w-sm text-lg font-bold h-14 rounded-xl shadow-lg transition-all",
              isGenerating 
                ? "bg-slate-200 text-slate-400 shadow-none cursor-not-allowed" 
                : "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 hover:-translate-y-0.5 hover:shadow-xl shadow-brand-500/30"
            )}
          >
            {isGenerating ? (
              <>
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></span>
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Prompt
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default UploadZone;