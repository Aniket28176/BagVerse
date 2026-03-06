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
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Premium Background with Gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ backgroundColor: COLORS.accent }}></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ backgroundColor: COLORS.accent }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="animate-fadeInDown mb-6">
          <p className="text-xs font-bold uppercase tracking-widest text-yellow-500 mb-4">Luxury Collection 2024</p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6 tracking-tight">
            {BRAND.name}
          </h1>
        </div>

        <p className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-300 font-light max-w-2xl mx-auto animate-fadeInUp stagger-1">
          {BRAND.tagline}
        </p>

        <p className="text-sm sm:text-base md:text-lg mb-12 text-gray-400 max-w-xl mx-auto animate-fadeInUp stagger-2">
          {BRAND.description}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fadeInUp stagger-3">
          <button
            onClick={handleExploreCollection}
            disabled={isNavigating}
            className={`px-10 py-4 bg-yellow-600 text-Black font-bold text-sm hover:bg-yellow-500 active:scale-95 transition-all duration-300 uppercase tracking-widest ${
              isNavigating ? "opacity-75 cursor-not-allowed scale-95" : ""
            }`}
          >
            {isNavigating ? "Processing..." : "Explore Collection"}
          </button>
          <button
            onClick={() => {
              const element = document.querySelector('[data-shop-section]');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-10 py-4 border-2 border-white text-white font-bold text-sm hover:bg-white hover:text-gray-900 transition-all duration-300 uppercase tracking-widest active:scale-95"
          >
            Learn More
          </button>
        </div>

        {/* Features */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {[
            { icon: "✨", label: "Premium Quality" },
            { icon: "🌍", label: "Eco-Friendly" },
            { icon: "🚀", label: "Fast Delivery" },
          ].map((feature, idx) => (
            <div key={idx} className={`flex flex-col items-center animate-fadeInUp`} style={{ animationDelay: `${0.4 + idx * 0.1}s` }}>
              <div className="text-4xl mb-3">{feature.icon}</div>
              <p className="text-gray-300 font-medium text-sm uppercase tracking-wide">{feature.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-floatUp">
        <svg className="w-6 h-6 text-white/40 hover:text-white/60 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default HeroBanner;
