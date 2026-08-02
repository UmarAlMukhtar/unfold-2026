import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import gsap from 'gsap';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { LoadingScreen } from './components/LoadingScreen';
import { AboutSection, MentorAndRegister, TracksAndSchedule, VenueSponsorsFaq } from './components/Sections';
import { REGISTER_URL } from './data/site';
import './style.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [showMobileCta, setShowMobileCta] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  useEffect(() => {
    const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
    timeline.fromTo('.name-reveal', { opacity: 0, y: 48 }, { opacity: 1, y: 0, duration: 1.1 })
      .fromTo('.blur-in', { opacity: 0, y: 18, filter: 'blur(8px)' }, { opacity: 1, y: 0, filter: 'blur(0)', duration: .8, stagger: .08 }, '<.15');
    return () => { timeline.kill(); };
  }, []);

  useEffect(() => {
    const hero = document.getElementById('home');
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => setShowMobileCta(!entry.isIntersecting), { threshold: 0.15 });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return <>{loading && <LoadingScreen done={() => setLoading(false)} />}<Header /><main><Hero /><AboutSection /><TracksAndSchedule /><MentorAndRegister /><VenueSponsorsFaq /></main><Footer /><AnimatePresence>{showMobileCta && <motion.a href={REGISTER_URL} target="_blank" rel="noreferrer" initial={shouldReduceMotion ? false : { opacity: 0, y: 20, scale: .92 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: .94 }} transition={{ duration: shouldReduceMotion ? 0 : .24, ease: [0.22, 1, 0.36, 1] }} className="fixed bottom-4 left-4 right-4 z-40 inline-flex items-center justify-center gap-2 rounded-full bg-text-primary px-5 py-4 text-center text-sm font-semibold text-bg shadow-xl sm:hidden">Register Now · Only 100 Spots <ArrowUpRight size={17} aria-hidden="true" /></motion.a>}</AnimatePresence></>;
}

createRoot(document.getElementById('root')!).render(<App />);
