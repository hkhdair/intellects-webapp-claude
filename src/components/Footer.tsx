import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-background-light py-8 border-t border-gray-800/50">
      <div className="container">
        <div className="flex flex-col items-center gap-6">
          {/* Brand */}
          <div className="text-xl font-bold gradient-text">
            Intellects AI
          </div>

          {/* Services Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-text-secondary">
            <Link to="/services/business-process-automation" className="hover:text-primary transition-colors">
              Business Process Automation
            </Link>
            <span className="hidden sm:inline text-gray-700">|</span>
            <Link to="/services/custom-ai-solutions" className="hover:text-primary transition-colors">
              Custom AI Solutions
            </Link>
            <span className="hidden sm:inline text-gray-700">|</span>
            <Link to="/services/training-support" className="hover:text-primary transition-colors">
              Training & Support
            </Link>
            <span className="hidden sm:inline text-gray-700">|</span>
            <Link to="/assessment" className="hover:text-primary transition-colors">
              Free AI Readiness Assessment
            </Link>
          </div>

          {/* Contact Row */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-text-secondary">
            <a
              href="tel:+61861712665"
              className="inline-flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>(08) 6171 2665</span>
            </a>
            <span className="hidden sm:inline text-gray-700">|</span>
            <a
              href="https://maps.google.com/?q=451+Pulteney+St,+Adelaide+SA+5000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-primary transition-colors"
            >
              <MapPin className="w-4 h-4" />
              <span>451 Pulteney St, Adelaide SA 5000</span>
            </a>
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-4 text-xs text-text-muted">
            <Link to="/privacy" className="hover:text-text-secondary transition-colors">
              Privacy Policy
            </Link>
            <span className="text-gray-700">|</span>
            <Link to="/terms" className="hover:text-text-secondary transition-colors">
              Terms of Service
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-text-muted text-xs">
            © {year} Intellects AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
