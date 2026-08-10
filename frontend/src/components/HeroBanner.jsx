import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { COLORS, BRAND } from "../constants/branding";

const HeroBanner = () => {
  const navigate = useNavigate();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleExploreCollection = () => {
    setIsNavigating(true);
    console.log("User clicked: Explore Collection");
    setTimeout(() => {
      navigate("/shop");
      setIsNavigating(false);
    }, 300);
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* ══════════ VIOLET LUXURY BACKGROUND ══════════ */}
      
      {/* Deep violet base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1e0a3c] via-[#140628] to-[#0a0316]" />
      
      {/* Violet radial glow from top */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(139,92,246,0.20), transparent 60%)'
        }}
      />
      
      {/* Subtle grid texture */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(196,181,253,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(196,181,253,0.4) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />
      
      {/* Violet accent orbs */}
      <div 
        className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full opacity-[0.12] blur-[120px] animate-pulse"
        style={{ backgroundColor: '#8b5cf6', animationDuration: '5s' }}
      />
      <div 
        className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-[0.10] blur-[130px] animate-pulse"
        style={{ backgroundColor: '#a78bfa', animationDuration: '7s', animationDelay: '1s' }}
      />
      
      {/* Purple side glows */}
      <div 
        className="absolute top-1/2 -left-40 w-[400px] h-[400px] -translate-y-1/2 rounded-full opacity-[0.07] blur-[100px]"
        style={{ backgroundColor: '#7c3aed' }}
      />
      <div 
        className="absolute top-1/2 -right-40 w-[400px] h-[400px] -translate-y-1/2 rounded-full opacity-[0.07] blur-[100px]"
        style={{ backgroundColor: '#7c3aed' }}
      />
      
      {/* Vignette for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />

      {/* Decorative top line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-28 bg-gradient-to-b from-transparent via-violet-500/50 to-transparent" />

      {/* ══════════ CONTENT ══════════ */}
      <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        
        {/* Badge */}
        <div className="animate-fadeInDown mb-8">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-violet-400/30 bg-violet-500/[0.08] backdrop-blur-sm mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-violet-300">
              Luxury Collection 2024
            </p>
          </div>
          
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold leading-[1.05] mb-8 tracking-tight">
            <span className="bg-gradient-to-b from-white via-violet-100 to-violet-300/70 bg-clip-text text-transparent drop-shadow-2xl">
              {BRAND.name}
            </span>
          </h1>
        </div>

        {/* Tagline */}
        <p className="text-xl sm:text-2xl md:text-3xl mb-6 font-light max-w-2xl mx-auto animate-fadeInUp stagger-1 bg-gradient-to-r from-violet-200/90 via-white to-violet-200/90 bg-clip-text text-transparent leading-relaxed">
          {BRAND.tagline}
        </p>

        {/* Description */}
        <p className="text-sm sm:text-base md:text-lg mb-14 text-violet-200/50 max-w-xl mx-auto animate-fadeInUp stagger-2 leading-relaxed">
          {BRAND.description}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center animate-fadeInUp stagger-3 mb-24">
          <button
            onClick={handleExploreCollection}
            disabled={isNavigating}
            className={`group relative px-12 py-4 font-bold text-sm uppercase tracking-[0.2em] overflow-hidden transition-all duration-500 ${
              isNavigating 
                ? "opacity-75 cursor-not-allowed scale-95" 
                : "hover:scale-[1.02] hover:shadow-[0_0_45px_rgba(139,92,246,0.4)] active:scale-95"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-500 to-violet-600 transition-all duration-500 group-hover:from-purple-500 group-hover:via-violet-400 group-hover:to-purple-500" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            
            <span className="relative text-white font-bold">
              {isNavigating ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Processing...
                </span>
              ) : "Explore Collection"}
            </span>
          </button>

          <button
            onClick={() => {
              const element = document.querySelector('[data-shop-section]');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative px-12 py-4 font-bold text-sm uppercase tracking-[0.2em] border border-violet-300/30 text-violet-100 transition-all duration-500 hover:border-violet-300/60 hover:bg-violet-400/[0.08] hover:shadow-[0_0_30px_rgba(139,92,246,0.2)] active:scale-95 backdrop-blur-sm"
          >
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">
              Learn More
            </span>
          </button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {[
            { icon: "✨", label: "Premium Quality" },
            { icon: "🌍", label: "Eco-Friendly" },
            { icon: "🚀", label: "Fast Delivery" },
          ].map((feature, idx) => (
            <div 
              key={idx} 
              className="group animate-fadeInUp" 
              style={{ animationDelay: `${0.4 + idx * 0.15}s` }}
            >
              <div className="relative px-6 py-8 rounded-2xl border border-violet-300/[0.10] bg-violet-400/[0.04] backdrop-blur-sm transition-all duration-500 hover:border-violet-400/30 hover:bg-violet-400/[0.08] hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(0,0,0,0.4)]">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-violet-500/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative flex flex-col items-center">
                  <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">
                    {feature.icon}
                  </div>
                  <p className="text-violet-200/70 font-medium text-xs uppercase tracking-[0.2em] group-hover:text-white transition-colors duration-300">
                    {feature.label}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-floatUp">
        <span className="text-[10px] uppercase tracking-[0.3em] text-violet-200/30 font-medium">Scroll</span>
        <div className="w-[22px] h-[36px] rounded-full border border-violet-300/30 flex justify-center pt-2">
          <div className="w-1 h-2 rounded-full bg-violet-400/80 animate-bounce" />
        </div>
      </div>

      {/* Decorative bottom line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-28 bg-gradient-to-t from-transparent via-violet-500/40 to-transparent" />
    </section>
  );
};

export default HeroBanner;