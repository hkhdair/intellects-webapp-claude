import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);

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
    { name: 'Services', href: '/#services', isRoute: false },
    { name: 'Contact', href: '#contact', isRoute: false }
  ];

  const productsDropdown = {
    name: 'Products',
    items: [
      { name: 'JobSense', href: 'https://jobsense.intellectsai.au/', isRoute: false, isExternal: true }
    ]
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-background-dark/90 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-6'
      }`}
    >
      <div className="container flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 text-xl font-bold" aria-label="Intellects.tech homepage">
          <span className="gradient-text">Intellects AI</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 items-center" role="navigation" aria-label="Main navigation">
          {/* Home Link */}
          <Link
            to="/"
            className="text-text-secondary hover:text-white transition-colors"
            aria-label="Navigate to Home"
          >
            Home
          </Link>

          {/* Services Link */}
          <a
            href="#services"
            className="text-text-secondary hover:text-white transition-colors"
            aria-label="Navigate to Services section"
          >
            Services
          </a>

          {/* Products Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsProductsOpen(true)}
            onMouseLeave={() => setIsProductsOpen(false)}
          >
            <button
              className="flex items-center gap-1 text-text-secondary hover:text-white transition-colors py-2"
              aria-label="Products menu"
              aria-expanded={isProductsOpen}
            >
              {productsDropdown.name}
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${isProductsOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {isProductsOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 pt-1 min-w-[180px]"
              >
                <div className="bg-background-dark border border-gray-700 rounded-lg shadow-xl py-2">
                  {productsDropdown.items.map((item) =>
                    item.isExternal ? (
                      <a
                        key={item.name}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-2 text-text-secondary hover:text-white hover:bg-background-light transition-colors"
                        aria-label={`Navigate to ${item.name}`}
                      >
                        {item.name}
                      </a>
                    ) : (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="block px-4 py-2 text-text-secondary hover:text-white hover:bg-background-light transition-colors"
                        aria-label={`Navigate to ${item.name}`}
                      >
                        {item.name}
                      </Link>
                    )
                  )}
                </div>
              </motion.div>
            )}
          </div>

          {/* Contact Link */}
          <a
            href="#contact"
            className="text-text-secondary hover:text-white transition-colors"
            aria-label="Navigate to Contact section"
          >
            Contact
          </a>
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
            <nav className="flex flex-col gap-2" role="navigation" aria-label="Mobile navigation">
              {/* Home */}
              <Link
                to="/"
                className="text-text-secondary hover:text-white py-2 transition-colors"
                aria-label="Navigate to Home"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>

              {/* Services */}
              <a
                href="#services"
                className="text-text-secondary hover:text-white py-2 transition-colors"
                aria-label="Navigate to Services section"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </a>

              {/* Products Dropdown */}
              <div>
                <button
                  className="flex items-center justify-between w-full text-text-secondary hover:text-white py-2 transition-colors"
                  onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
                  aria-expanded={isMobileProductsOpen}
                  aria-label="Products menu"
                >
                  {productsDropdown.name}
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${isMobileProductsOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {isMobileProductsOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="pl-4 border-l border-gray-700 ml-2"
                  >
                    {productsDropdown.items.map((item) =>
                      item.isExternal ? (
                        <a
                          key={item.name}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-text-secondary hover:text-white py-2 transition-colors"
                          aria-label={`Navigate to ${item.name}`}
                          onClick={() => {
                            setIsMenuOpen(false);
                            setIsMobileProductsOpen(false);
                          }}
                        >
                          {item.name}
                        </a>
                      ) : (
                        <Link
                          key={item.name}
                          to={item.href}
                          className="block text-text-secondary hover:text-white py-2 transition-colors"
                          aria-label={`Navigate to ${item.name}`}
                          onClick={() => {
                            setIsMenuOpen(false);
                            setIsMobileProductsOpen(false);
                          }}
                        >
                          {item.name}
                        </Link>
                      )
                    )}
                  </motion.div>
                )}
              </div>

              {/* Contact */}
              <a
                href="#contact"
                className="text-text-secondary hover:text-white py-2 transition-colors"
                aria-label="Navigate to Contact section"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;