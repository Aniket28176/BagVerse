import { Link } from "react-router-dom";
import Logo from "./Logo";
import { COLORS, BRAND } from "../constants/branding";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ), 
      label: "Facebook", 
      url: "https://facebook.com" 
    },
    { 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ), 
      label: "Twitter", 
      url: "https://twitter.com" 
    },
    { 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ), 
      label: "Instagram", 
      url: "https://instagram.com" 
    },
  ];

  return (
    <footer className="w-full bg-[#0a0a0f] text-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[120px]"></div>
      </div>

      {/* Dot pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
        backgroundSize: "40px 40px"
      }}></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Section */}
          <div className="lg:col-span-1 animate-fade-in">
            <div className="flex items-center gap-3 mb-6 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative">
                  <Logo size={36} />
                </div>
              </div>
              <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
                {BRAND.name}
              </span>
            </div>
            
            <p className="text-sm text-slate-400 leading-relaxed mb-8">
              {BRAND.description}
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 hover:bg-gradient-to-br hover:from-violet-600 hover:to-cyan-600 hover:border-transparent hover:shadow-lg hover:shadow-violet-500/30 hover:scale-110 active:scale-95"
                  title={social.label}
                  aria-label={social.label}
                >
                  <span className="text-slate-400 group-hover:text-white transition-colors">
                    {social.icon}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
              Quick Links
            </h4>
            <ul className="space-y-4">
              {[
                { label: "Home", href: "/" },
                { label: "Shop", href: "/shop" },
                { label: "About Us", href: "#" },
                { label: "Contact", href: "#" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.href}
                    className="group flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-all duration-300"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-violet-500 transition-colors"></span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Support */}
          <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
              Support
            </h4>
            <ul className="space-y-4">
              {[
                { label: "FAQ", href: "#" },
                { label: "Shipping Info", href: "#" },
                { label: "Returns", href: "#" },
                { label: "Track Order", href: "#" },
              ].map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-all duration-300"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-cyan-500 transition-colors"></span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="animate-fade-in" style={{ animationDelay: '300ms' }}>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
              Newsletter
            </h4>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              Subscribe for exclusive updates and offers
            </p>
            
            <form 
              className="space-y-3" 
              onSubmit={(e) => {
                e.preventDefault();
                const email = e.target.querySelector('input[type="email"]').value;
                if (email) {
                  alert(`Thank you for subscribing with ${email}!`);
                  e.target.reset();
                }
              }}
            >
              <div className="relative group">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="peer w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-violet-500/50 focus:bg-white/10 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.1)] transition-all duration-200"
                  required
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-500/0 via-violet-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              </div>
              
              <button
                type="submit"
                className="group w-full px-4 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 transition-all duration-300 shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 active:scale-[0.98] flex items-center justify-center gap-2"
              >
                Subscribe
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </form>
          </div>
        </div>

        {/* Gradient Divider */}
        <div className="relative py-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="w-32 h-1 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500"></div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8">
          <div className="text-center md:text-left">
            <p className="text-sm text-slate-500">
              © {currentYear} <span className="font-semibold text-slate-400">{BRAND.name}</span>. All rights reserved.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { label: "Privacy Policy", action: () => alert('Privacy Policy page would open here') },
              { label: "Terms of Service", action: () => alert('Terms of Service page would open here') },
              { label: "Cookie Settings", action: () => alert('Cookie Settings page would open here') },
            ].map((link, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.preventDefault();
                  link.action();
                }}
                className="text-sm text-slate-500 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-violet-400 hover:to-cyan-400 transition-all duration-300"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
