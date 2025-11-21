
import React, { useState } from 'react';
import { Github, Twitter, Linkedin, Globe, Code2, Cpu, Instagram, ExternalLink, Heart, BadgeCheck, Youtube, X } from 'lucide-react';
import { Button } from './ui/button';

interface Promoter {
  name: string;
  platform: 'Instagram' | 'Twitter' | 'YouTube' | 'Other';
  url: string;
  youtubeUrl?: string;
  role: string;
  verified?: boolean;
}

const promoters: Promoter[] = [
  {
    name: "Sohail editz",
    platform: "Instagram",
    url: "https://www.instagram.com/_oyesohail_?igsh=MWVjdnQ0NTZycXJnNQ==",
    youtubeUrl: "https://www.youtube.com/@SOHAILEDITZ-777",
    role: "Video Promotion & Support",
    verified: true
  },
  {
    name: "Sanik Gamer",
    platform: "Instagram",
    url: "https://www.instagram.com/sanik_gamer?utm_source=qr&igsh=MTlmNWw4YjlyajV4",
    role: "Project Idea & Video Promotion",
    verified: true
  }
];

const CreatorsPage: React.FC = () => {
  const [selectedPromoter, setSelectedPromoter] = useState<Promoter | null>(null);

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Instagram': return <Instagram className="w-5 h-5 text-pink-600" />;
      case 'Twitter': return <Twitter className="w-5 h-5 text-sky-500" />;
      case 'YouTube': return <Youtube className="w-5 h-5 text-red-600" />;
      default: return <Globe className="w-5 h-5 text-slate-500" />;
    }
  };

  const handlePromoterClick = (promoter: Promoter, e: React.MouseEvent) => {
    if (promoter.youtubeUrl) {
      e.preventDefault();
      setSelectedPromoter(promoter);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-8 duration-700 relative">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
          Meet the Creator
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          The mind behind chudAI, bridging the gap between visual ideas and AI generation.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden max-w-3xl mx-auto relative group">
        {/* Decorative background */}
        <div className="h-40 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-indigo-600 relative overflow-hidden">
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2532&auto=format&fit=crop')] opacity-20 bg-cover bg-center mix-blend-overlay"></div>
        </div>
        
        <div className="px-8 pb-10">
          {/* Avatar */}
          <div className="relative -mt-20 mb-6 flex justify-center">
            <div className="w-40 h-40 rounded-full border-[6px] border-white bg-slate-900 flex items-center justify-center shadow-2xl overflow-hidden relative z-10 group-hover:scale-105 transition-transform duration-500">
               {/* Placeholder for user avatar, utilizing a gradient text fallback for now */}
               <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-950 flex items-center justify-center text-6xl">
                  👨‍💻
               </div>
            </div>
          </div>

          <div className="text-center space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-1 flex items-center justify-center gap-2">
                Mojahid Hassan
                <BadgeCheck className="w-8 h-8 fill-black text-white" />
              </h2>
              <div className="flex items-center justify-center gap-2 text-violet-600 font-medium bg-violet-50 inline-block px-3 py-1 rounded-full text-sm">
                <Code2 className="w-4 h-4" />
                <span>Full Stack Developer</span>
                <span className="text-violet-300 mx-1">•</span>
                <Cpu className="w-4 h-4" />
                <span>AI Enthusiast</span>
              </div>
            </div>

            <p className="text-slate-600 leading-relaxed max-w-xl mx-auto text-lg">
              Passionate about building intuitive AI tools that empower creativity. 
              Specializing in modern web technologies, React, and Generative AI integration to solve real-world problems.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 max-w-lg mx-auto">
              <a href="https://github.com/Mojahid65" target="_blank" rel="noopener noreferrer" className="w-full">
                <Button variant="outline" className="w-full gap-2 hover:text-violet-900 hover:bg-violet-50 hover:border-violet-200 h-12 text-base">
                  <Github className="w-5 h-5" /> GitHub
                </Button>
              </a>
              <a href="https://x.com/GwMojahid?t=Z6KXh01WEhbirBZfllOfDw&s=09" target="_blank" rel="noopener noreferrer" className="w-full">
                <Button variant="outline" className="w-full gap-2 hover:text-sky-600 hover:bg-sky-50 hover:border-sky-200 h-12 text-base">
                  <Twitter className="w-5 h-5" /> Twitter
                </Button>
              </a>
              <a href="https://www.linkedin.com/in/mojahid-hassan-b1466b2b5?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="w-full">
                <Button variant="outline" className="w-full gap-2 hover:text-blue-700 hover:bg-blue-50 hover:border-blue-200 h-12 text-base">
                  <Linkedin className="w-5 h-5" /> LinkedIn
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Fun Code Block Decoration */}
      <div className="mt-16 max-w-3xl mx-auto opacity-75">
        <div className="bg-slate-900 rounded-xl p-6 shadow-2xl overflow-hidden font-mono text-sm text-slate-300 border border-slate-800 relative">
            <div className="flex gap-2 mb-4 border-b border-slate-800 pb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="space-y-2">
                <p><span className="text-violet-400">const</span> <span className="text-yellow-300">developer</span> = <span className="text-violet-400">new</span> <span className="text-blue-400">Human</span>({'{'}</p>
                <p className="pl-4">name: <span className="text-green-400">'Mojahid Hassan'</span>,</p>
                <p className="pl-4">skills: [<span className="text-green-400">'React'</span>, <span className="text-green-400">'TypeScript'</span>, <span className="text-green-400">'AI Integration'</span>],</p>
                <p className="pl-4">mission: <span className="text-green-400">'Build cool stuff 🚀'</span></p>
                <p>{'}'});</p>
            </div>
        </div>
      </div>

      {/* Community / Special Thanks Section */}
      <div className="max-w-3xl mx-auto mt-16">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Heart className="w-6 h-6 text-red-500 animate-pulse" />
          <h3 className="text-2xl font-bold text-slate-900">Special Thanks & Community</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {promoters.map((promoter, index) => (
            <a 
              key={index}
              href={promoter.url} 
              onClick={(e) => handlePromoterClick(promoter, e)}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:shadow-md hover:border-brand-200 transition-all group/card cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 group-hover/card:bg-brand-50 transition-colors">
                   {getPlatformIcon(promoter.platform)}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-slate-800 group-hover/card:text-brand-600 transition-colors">{promoter.name}</h4>
                      {promoter.verified && (
                         <BadgeCheck className="w-4 h-4 fill-black text-white" />
                      )}
                  </div>
                  <p className="text-xs text-slate-500 font-medium">{promoter.role}</p>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-300 group-hover/card:text-brand-400" />
            </a>
          ))}
        </div>
      </div>

      {/* POPUP MODAL */}
      {selectedPromoter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden transform transition-all scale-100">
              <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                 <h3 className="font-bold text-slate-800">Visit {selectedPromoter.name}</h3>
                 <button 
                   onClick={() => setSelectedPromoter(null)}
                   className="p-1 hover:bg-slate-200 rounded-full transition-colors"
                 >
                   <X className="w-5 h-5 text-slate-500" />
                 </button>
              </div>
              <div className="p-6 flex flex-col gap-3">
                 <p className="text-center text-slate-600 mb-2">Select a platform to visit:</p>
                 <a 
                   href={selectedPromoter.url} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="w-full"
                   onClick={() => setSelectedPromoter(null)}
                 >
                   <Button className="w-full gap-2 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white h-12 text-lg">
                      <Instagram className="w-5 h-5" /> Instagram
                   </Button>
                 </a>
                 
                 {selectedPromoter.youtubeUrl && (
                   <a 
                     href={selectedPromoter.youtubeUrl} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="w-full"
                     onClick={() => setSelectedPromoter(null)}
                   >
                     <Button className="w-full gap-2 bg-red-600 hover:bg-red-700 text-white h-12 text-lg">
                        <Youtube className="w-5 h-5" /> YouTube
                     </Button>
                   </a>
                 )}
              </div>
           </div>
        </div>
      )}

    </div>
  );
};

export default CreatorsPage;
