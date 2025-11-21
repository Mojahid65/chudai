
import React, { useState, useEffect } from 'react';
import { PromptStyle, HistoryItem } from './types';
import { generateImagePrompt } from './services/geminiService';
import { CameraIcon, WandIcon, ZapIcon, ImageIcon } from './components/Icons';
import { GridBackground } from './components/ui/GridBackground';
import { createThumbnail, dataURLtoFile } from './lib/utils';
import { Footer } from "./components/ui/modem-animated-footer";
import { NotepadTextDashed, Twitter, Linkedin, Github, Mail } from "lucide-react";

// Components
import UploadZone from './components/UploadZone';
import PromptControls from './components/PromptControls';
import ResultSection from './components/ResultSection';
import HistorySection from './components/HistorySection';
import {
  Stepper,
  StepperItem,
  StepperTrigger,
  StepperIndicator,
  StepperTitle,
  StepperDescription,
  StepperSeparator,
  StepperNav,
} from './components/ui/stepper';

const App: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [promptStyle, setPromptStyle] = useState<PromptStyle>(PromptStyle.DETAILED);
  const [generatedPrompt, setGeneratedPrompt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // History State
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Load history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('chudai_history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  // Save history to localStorage
  const saveHistory = (newHistory: HistoryItem[]) => {
    setHistory(newHistory);
    localStorage.setItem('chudai_history', JSON.stringify(newHistory));
  };

  // Clean up preview URL when file changes or unmounts
  useEffect(() => {
    if (!selectedFile) {
      // Don't clear previewUrl if we just set it from history and selectedFile is pending
      // Actually, logic is: if selectedFile exists, make a URL. If not, if we are explicitly clearing, we handle that.
      // But if we just loaded from history, we have a selectedFile, so this runs.
      // If we cleared, selectedFile is null, so previewUrl should be null.
      // Let's trust the selectedFile state.
      if (!generatedPrompt) { 
          // Only clear if we are not viewing a result. 
          // Wait, if I clear, I want to clear everything.
          // If I select from history, selectedFile is set, generatedPrompt is set.
      }
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setGeneratedPrompt("");
    setError(null);
  };

  const handleClear = () => {
    setSelectedFile(null);
    setPreviewUrl(null); // Explicitly clear
    setGeneratedPrompt("");
    setError(null);
  };

  const handleGenerate = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError(null);
    setGeneratedPrompt("");

    try {
      const result = await generateImagePrompt(selectedFile, promptStyle);
      setGeneratedPrompt(result);

      // Create history item
      const thumbnail = await createThumbnail(selectedFile);
      const newItem: HistoryItem = {
        id: Date.now().toString(),
        thumbnail,
        prompt: result,
        timestamp: Date.now(),
        style: promptStyle
      };

      const newHistory = [newItem, ...history].slice(0, 10); // Keep last 10
      saveHistory(newHistory);

    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleHistorySelect = (item: HistoryItem) => {
      const file = dataURLtoFile(item.thumbnail, `history-${item.timestamp}.jpg`);
      setSelectedFile(file);
      setGeneratedPrompt(item.prompt);
      setPromptStyle(item.style);
      // Scroll to top smoothly
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHistoryDelete = (id: string) => {
      const newHistory = history.filter(item => item.id !== id);
      saveHistory(newHistory);
  };

  const handleClearHistory = () => {
      saveHistory([]);
  };

  const socialLinks = [
    {
      icon: <Twitter className="w-6 h-6" />,
      href: "https://x.com/GwMojahid?t=Z6KXh01WEhbirBZfllOfDw&s=09",
      label: "Twitter",
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      href: "https://www.linkedin.com/in/mojahid-hassan-b1466b2b5?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      label: "LinkedIn",
    },
    {
      icon: <Github className="w-6 h-6" />,
      href: "https://github.com/Mojahid65",
      label: "GitHub",
    },
  ];

  return (
    <GridBackground>
      {/* HEADER */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.location.reload()}>
            <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center text-white shadow-lg shadow-slate-900/20 group-hover:shadow-xl group-hover:shadow-violet-500/20 transition-all duration-300 group-hover:scale-105">
                  <CameraIcon className="w-5 h-5 group-hover:animate-[spin_3s_linear_infinite]" />
                </div>
                <div className="absolute inset-0 rounded-xl bg-violet-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-violet-600 transition-colors duration-300">
              chudAI
            </span>
          </div>
          <a href="#" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
            About
          </a>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-grow w-full max-w-4xl mx-auto px-4 py-8 md:py-12 flex flex-col items-center">
        
        {/* HERO */}
        <div className="text-center mb-10 space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 drop-shadow-sm">
            Turn any image into a <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-fuchsia-500 to-indigo-600">
              powerful AI prompt
            </span>
          </h1>
          <p className="text-slate-600 text-lg md:text-xl max-w-xl mx-auto font-medium">
            Upload an image → Convert → Get Prompt. Compatible with Midjourney, DALL·E 3, and Stable Diffusion.
          </p>
        </div>

        {/* UPLOAD SECTION */}
        <div className="w-full mb-8">
          <UploadZone
            selectedFile={selectedFile}
            previewUrl={previewUrl}
            onFileSelect={handleFileSelect}
            onClear={handleClear}
            isGenerating={loading}
            onGenerate={handleGenerate}
          />
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="w-full mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 flex items-center gap-2 animate-in fade-in shadow-sm">
             <span>⚠️</span> {error}
          </div>
        )}

        {/* OUTPUT SECTION (Only visible if file selected) */}
        {selectedFile && (
          <div className="w-full flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both">
            
            {/* OPTIONS */}
            {!generatedPrompt && !loading && (
               <PromptControls
                 currentStyle={promptStyle}
                 onStyleChange={setPromptStyle}
                 disabled={loading}
               />
            )}

            {/* RESULT */}
            {generatedPrompt && (
              <ResultSection
                prompt={generatedPrompt}
                isLoading={loading}
                onRegenerate={handleGenerate}
              />
            )}
          </div>
        )}

        {/* FEATURES (Only visible on start) */}
        {!selectedFile && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-12">
            {[
              { 
                icon: <WandIcon className="w-6 h-6 text-violet-600" />, 
                title: "AI-Powered", 
                desc: "Uses advanced Gemini vision models to analyze composition." 
              },
              { 
                icon: <ZapIcon className="w-6 h-6 text-amber-500" />, 
                title: "Instant Results", 
                desc: "Get highly descriptive prompts in seconds." 
              },
              { 
                icon: <ImageIcon className="w-6 h-6 text-fuchsia-500" />, 
                title: "Universal Support", 
                desc: "Works for Midjourney, DALL-E, Firefly, and more." 
              }
            ].map((f, i) => (
              <div key={i} className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-slate-200/60 hover:shadow-md hover:bg-white transition-all">
                <div className="mb-4 bg-white w-12 h-12 rounded-xl flex items-center justify-center shadow-sm border border-slate-100">
                  {f.icon}
                </div>
                <h3 className="font-bold text-slate-800 mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        )}

        {/* HISTORY SECTION */}
        <HistorySection 
            history={history} 
            onSelect={handleHistorySelect} 
            onDelete={handleHistoryDelete}
            onClear={handleClearHistory}
        />

        {/* HOW IT WORKS */}
        {!selectedFile && history.length === 0 && (
           <div className="w-full mt-20 mb-20">
             <h2 className="text-2xl font-bold text-slate-800 mb-12 text-center">How it works</h2>
             <Stepper defaultValue={1} className="w-full max-w-3xl mx-auto">
                <StepperNav>
                    {[
                        { title: 'Upload Image', description: 'Drag & drop your file' },
                        { title: 'Generate', description: 'AI analyzes the image' },
                        { title: 'Get Prompt', description: 'Copy perfect prompt' },
                    ].map((step, index) => (
                        <StepperItem key={index} step={index + 1} className="relative">
                            <StepperTrigger className="flex flex-col items-center gap-2 p-2">
                                <StepperIndicator>{index + 1}</StepperIndicator>
                                <div className="flex flex-col items-center text-center">
                                    <StepperTitle>{step.title}</StepperTitle>
                                    <StepperDescription>{step.description}</StepperDescription>
                                </div>
                            </StepperTrigger>
                            {index < 2 && <StepperSeparator />}
                        </StepperItem>
                    ))}
                </StepperNav>
             </Stepper>
           </div>
        )}

      </main>

      {/* FOOTER */}
      <Footer
        brandName="chudAI"
        brandDescription="Turn any image into a powerful AI prompt. Compatible with Midjourney, DALL·E 3, and Stable Diffusion."
        socialLinks={socialLinks}
        navLinks={[
          { label: "Privacy", href: "#" },
          { label: "Terms", href: "#" }
        ]}
        creatorName="Mojahid Hassan"
        creatorUrl="https://github.com/Mojahid65"
        brandIcon={<CameraIcon className="w-8 sm:w-10 md:w-14 h-8 sm:h-10 md:h-14 text-background drop-shadow-lg" />}
      />
    </GridBackground>
  );
};

export default App;
