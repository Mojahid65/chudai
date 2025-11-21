import React, { PropsWithChildren } from "react";

export const GridBackground: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-white relative">
      {/* Magenta Orb Grid Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: "white",
          backgroundImage: `
            linear-gradient(to right, rgba(71,85,105,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(71,85,105,0.05) 1px, transparent 1px),
            radial-gradient(circle at 50% 60%, rgba(236,72,153,0.1) 0%, rgba(168,85,247,0.05) 40%, transparent 70%)
          `,
          backgroundSize: "40px 40px, 40px 40px, 100% 100%",
          maskImage: "radial-gradient(ellipse at center, black 60%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 60%, transparent 100%)",
        }}
      />
      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-col min-h-screen text-slate-900">
        {children}
      </div>
    </div>
  );
};