import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import FeatureHighlight from './components/FeatureHighlight';
import Newsletter from './components/Newsletter';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
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
}

export default App;