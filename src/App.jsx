// src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';       // ← add these
import { motion, useScroll } from 'framer-motion';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import { ThemeProvider } from '@/components/theme-provider';

import './index.css';

import HomeDash from './components/HomeDash';

function App() {
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    document.documentElement.classList.add('has-scroll-smooth');
    return () => {
      document.documentElement.classList.remove('has-scroll-smooth');
    };
  }, []);

  const siteName = "kalyan-555.com";
  const defaultTitle = "Kalyan 555 - Live Kalyan Matka Results";
  const defaultDescription = "Kalyan 555 - Your Ultimate Destination for Live Kalyan Matka Results";
  const siteUrl = "https://kalyan-555.in";

  return (
    <HelmetProvider>
      <BrowserRouter> {/* ← wrap with your Router */}
        <Helmet htmlAttributes={{ lang: 'en-IN' }}>
          <title>{defaultTitle}</title>
          <meta name="description" content={defaultDescription} />
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="canonical" href={siteUrl} />
          {/* …other meta tags… */}
        </Helmet>

        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          {/* scroll progress bar */}
          <motion.div
            className="scroll-progress-bar"
            style={{ scaleX: scrollYProgress }}
          />

      

          <main>
            <Routes>
              <Route path="/" element={<HomeDash/>} />
             
              {/* add more <Route>s here as you build out the site */}
            </Routes>
          </main>
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
