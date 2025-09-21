import React from 'react';
import Header from './Header';
import Hero from './Hero';
import Services from './Services';
import FeatureHighlight from './FeatureHighlight';
import Newsletter from './Newsletter';
import Contact from './Contact';
import Footer from './Footer';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background-dark">
      <Header />
      <main className="flex-1">
        <Hero />
        <Services />
        <FeatureHighlight />
        <Newsletter />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
