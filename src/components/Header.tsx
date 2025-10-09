import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/', isRoute: true },
    { name: 'Services', href: '#services', isRoute: false },
    { name: 'Contact', href: '#contact', isRoute: false }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-background-dark/90 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-6'
      }`}
    >
      <div className="container flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 text-xl font-bold" aria-label="Intellects.tech homepage">
          <span className="gradient-text">intellects.tech</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8" role="navigation" aria-label="Main navigation">
          {navLinks.map((link) => (
            link.isRoute ? (
              <Link
                key={link.name}
                to={link.href}
                className="text-text-secondary hover:text-white transition-colors"
                aria-label={`Navigate to ${link.name} section`}
              >
                {link.name}
              </Link>
            ) : (
              <a
                key={link.name}
                href={link.href}
                className="text-text-secondary hover:text-white transition-colors"
                aria-label={`Navigate to ${link.name} section`}
              >
                {link.name}
              </a>
            )
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-text-secondary p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle mobile navigation menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            className="absolute top-full left-0 right-0 bg-background-dark shadow-xl p-4 md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col gap-4" role="navigation" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                link.isRoute ? (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="text-text-secondary hover:text-white py-2 transition-colors"
                    aria-label={`Navigate to ${link.name} section`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-text-secondary hover:text-white py-2 transition-colors"
                    aria-label={`Navigate to ${link.name} section`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                )
              ))}
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;