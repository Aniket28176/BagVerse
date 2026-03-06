import { Link } from "react-router-dom";
import Logo from "./Logo";
import { COLORS, BRAND } from "../constants/branding";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gradient-to-b from-gray-900 to-black text-white pt-20 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-3 mb-4">
              <Logo size={32} />
              <span 
                className="text-xl font-bold uppercase tracking-widest" 
                style={{ color: COLORS.accent }}
              >
                {BRAND.name}
              </span>
            </div>
            <p className="text-xs font-light uppercase tracking-wider text-gray-400 mt-3 leading-relaxed">
              {BRAND.description}
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              {[
                { icon: "f", label: "Facebook", url: "https://facebook.com" },
                { icon: "𝕏", label: "Twitter", url: "https://twitter.com" },
                { icon: "📷", label: "Instagram", url: "https://instagram.com" },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-yellow-600 flex items-center justify-center transition-all duration-300 active:scale-95 text-white"
                  title={social.label}
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-white">Quick Links</h4>
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
                    className="text-xs font-light text-gray-400 hover:text-yellow-500 transition-colors duration-300 uppercase tracking-wide"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-white">Support</h4>
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
                    className="text-xs font-light text-gray-400 hover:text-yellow-500 transition-colors duration-300 uppercase tracking-wide"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-white">Newsletter</h4>
            <p className="text-xs font-light text-gray-400 mb-4 uppercase tracking-wide leading-relaxed">
              Subscribe to exclusive updates
            </p>
            <form className="flex flex-col gap-3" onSubmit={(e) => {
              e.preventDefault();
              const email = e.target.querySelector('input[type="email"]').value;
              if (email) {
                alert(`Thank you for subscribing with ${email}!`);
                e.target.reset();
              }
            }}>
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-3 bg-gray-800 border-b border-gray-700 text-xs focus:outline-none focus:border-yellow-600 text-white placeholder-gray-500 uppercase tracking-wide transition-colors duration-300"
                required
              />
              <button
                type="submit"
                className="px-4 py-3 bg-yellow-600 hover:bg-yellow-500 active:scale-95 font-bold text-xs uppercase tracking-widest transition-all duration-300 text-black"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          {/* Bottom Links */}
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs gap-6">
            <div>
              <p className="font-light uppercase tracking-wider">
                © {currentYear} {BRAND.name}. All rights reserved.
              </p>
            </div>
            <div className="flex gap-8">
              <a href="#" onClick={(e) => {
                e.preventDefault();
                alert('Privacy Policy page would open here');
              }} className="hover:text-yellow-500 transition-colors cursor-pointer font-light uppercase tracking-wide">
                Privacy Policy
              </a>
              <a href="#" onClick={(e) => {
                e.preventDefault();
                alert('Terms of Service page would open here');
              }} className="hover:text-yellow-500 transition-colors cursor-pointer font-light uppercase tracking-wide">
                Terms of Service
              </a>
              <a href="#" onClick={(e) => {
                e.preventDefault();
                alert('Cookie Settings page would open here');
              }} className="hover:text-yellow-500 transition-colors cursor-pointer font-light uppercase tracking-wide">
                Cookie Settings
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
