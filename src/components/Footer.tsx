import React from 'react';
// import { Github, Linkedin, Twitter } from 'lucide-react'; // Commented out - social media icons not in use

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-background-light py-10 border-t border-gray-800">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start">
            <div className="text-xl font-bold gradient-text mb-2">
              Intellects AI
            </div>
            <p className="text-text-secondary text-sm text-center md:text-left">
              Innovative AI & Automation Solutions for Modern Businesses
            </p>
          </div>
          
          {/* Social Media Links - Commented Out */}
          {/* <div className="flex gap-4">
            <a 
              href="#" 
              className="text-text-secondary hover:text-primary transition-colors p-2"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a 
              href="#" 
              className="text-text-secondary hover:text-primary transition-colors p-2"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="#" 
              className="text-text-secondary hover:text-primary transition-colors p-2"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
          </div> */}
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-text-muted text-sm text-center">
          <p>© {year} Intellects AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;