import React from 'react';
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