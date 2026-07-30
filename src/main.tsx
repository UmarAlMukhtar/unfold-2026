import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import Hls from 'hls.js';
import './style.css';

const HLS_SOURCE = 'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8';
const REGISTER_URL = '#';

function VideoBackground({ flip = false }: { flip?: boolean }) {
  const video = useRef<HTMLVideoElement>(null);
  useEffect(() => { const el = video.current; if (!el) return; if (Hls.isSupported()) { const hls = new Hls(); hls.loadSource(HLS_SOURCE); hls.attachMedia(el); return () => hls.destroy(); } if (el.canPlayType('application/vnd.apple.mpegurl')) el.src = HLS_SOURCE; }, []);
  return <video ref={video} autoPlay muted loop playsInline className={`absolute left-1/2 top-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover ${flip ? 'scale-y-[-1]' : ''}`} />;
}

function LoadingScreen({ done }: { done: () => void }) {
  const [count, setCount] = useState(0); const callback = useRef(done); callback.current = done;
  useEffect(() => { const start = performance.now(); let frame = 0; const tick = (now: number) => { const next = Math.min(100, Math.floor((now - start) / 27)); setCount(next); next < 100 ? frame = requestAnimationFrame(tick) : setTimeout(() => callback.current(), 350); }; frame = requestAnimationFrame(tick); return () => cancelAnimationFrame(frame); }, []);
  return <div className="fixed inset-0 z-[9999] bg-bg p-6 md:p-10"><p className="text-xs uppercase tracking-[.3em] text-muted">UNFOLD / 2026</p><p className="absolute inset-0 grid place-items-center font-display text-5xl italic text-text-primary/80 md:text-7xl">BUILDING</p><p className="absolute bottom-8 right-6 font-display text-7xl tabular-nums md:bottom-10 md:right-10 md:text-9xl">{String(count).padStart(3, '0')}</p><div className="absolute bottom-0 left-0 h-[3px] w-full bg-stroke/50"><div className="accent-gradient h-full origin-left" style={{ transform: `scaleX(${count / 100})` }} /></div></div>;
}

function Countdown() {
  const target = new Date('2026-09-12T09:00:00+05:30').getTime(); const [left, setLeft] = useState(target - Date.now());
  useEffect(() => { const id = setInterval(() => setLeft(Math.max(0, target - Date.now())), 1000); return () => clearInterval(id); }, [target]);
  const values = [Math.floor(left / 86400000), Math.floor(left / 3600000) % 24, Math.floor(left / 60000) % 60, Math.floor(left / 1000) % 60];
  return <div className="mb-9 grid grid-cols-4 gap-2 sm:gap-4">{values.map((value, index) => <div key={index}><p className="font-display text-3xl italic sm:text-5xl">{String(value).padStart(2, '0')}</p><p className="text-[9px] uppercase tracking-[.16em] text-muted">{['Days', 'Hours', 'Mins', 'Secs'][index]}</p></div>)}</div>;
}

const reveal = { initial: { opacity: 0, y: 22 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-80px' }, transition: { duration: .65 } };
function SectionTitle({ label, title, text }: { label: string; title: React.ReactNode; text?: string }) { return <motion.div {...reveal} className="mb-10"><p className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[.28em] text-muted"><i className="h-px w-8 bg-stroke" />{label}</p><h2 className="mb-4 text-4xl tracking-tight md:text-6xl">{title}</h2>{text && <p className="max-w-2xl text-sm leading-relaxed text-muted md:text-base">{text}</p>}</motion.div>; }

function App() {
  const [loading, setLoading] = useState(true); const [role, setRole] = useState(0);
  useEffect(() => { const id = setInterval(() => setRole((n) => (n + 1) % 3), 2000); const tl = gsap.timeline({ defaults: { ease: 'power3.out' } }); tl.fromTo('.name-reveal', { opacity: 0, y: 48 }, { opacity: 1, y: 0, duration: 1.1 }).fromTo('.blur-in', { opacity: 0, y: 18, filter: 'blur(8px)' }, { opacity: 1, y: 0, filter: 'blur(0)', duration: .8, stagger: .08 }, '<.15'); return () => { clearInterval(id); tl.kill(); }; }, []);
  return <>{loading && <LoadingScreen done={() => setLoading(false)} />}
    <nav className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 md:pt-5">
      <div className="inline-flex max-w-full items-center rounded-full border border-white/10 bg-surface/90 px-2 py-2 backdrop-blur-md">
        <a href="#home" className="accent-gradient grid h-9 w-9 shrink-0 place-items-center rounded-full p-px"><span className="grid h-full w-full place-items-center rounded-full bg-bg font-display text-[13px] italic">UF</span></a>
        <i className="mx-2 hidden h-5 w-px bg-stroke sm:block" />{[['About', '#about'], ['Tracks', '#tracks'], ['FAQ', '#faq']].map(([name, href]) => <a key={name} href={href} className="rounded-full px-2 py-2 text-[11px] text-muted hover:bg-stroke/50 hover:text-text-primary sm:px-4 sm:text-sm">{name}</a>)}
        <a href={REGISTER_URL} target="_blank" rel="noreferrer" className="gradient-ring rounded-full px-3 py-2 text-[11px] sm:px-4 sm:text-sm">Register ↗</a>
      </div>
    </nav>
    <main>
      <section id="home" className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 pt-24 text-center">
        <VideoBackground />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute bottom-0 h-48 w-full bg-gradient-to-t from-bg to-transparent" />
        <div className="relative z-10 max-w-3xl">
          <h1 className="name-reveal mb-5 font-display text-6xl italic leading-[.85] md:text-8xl lg:text-9xl">UNFOLD <span className="font-body text-[.64em] font-semibold not-italic">2026</span></h1>
          <p className="blur-in mx-auto mb-4 max-w-xl text-lg text-text-primary md:text-2xl">The 48-Hour Startup Launchpad: From Campus Project to Seed-Ready Startup.</p>
          <p className="blur-in mb-7 text-sm text-muted">Sept 12–13, 2026 &nbsp;|&nbsp; Christ College of Engineering, Irinjalakuda</p>
          <Countdown />
          <a href={REGISTER_URL} target="_blank" rel="noreferrer" className="gradient-ring blur-in inline-block rounded-full bg-text-primary px-7 py-3.5 text-sm text-bg transition hover:scale-105 hover:bg-bg hover:text-text-primary">Register on MakeMyPass ↗</a>
          <p className="mt-3 text-[10px] uppercase tracking-[.15em] text-muted">Only 100 spots</p>
        </div>
      </section>
      <section id="about" className="mx-auto max-w-[1100px] px-6 py-20 md:py-28">
        <SectionTitle label="About UNFOLD 2026" title={<>From campus project to <em className="font-display italic">venture.</em></>} text="UNFOLD is a focused 48-hour transition from academic project to a venture-ready startup. Build clarity around your problem, validate it with mentors, and leave with a stronger story for what comes next." />
        <div className="grid gap-4 md:grid-cols-3">
          {[['IEEE IA/IE/PELS', 'Joint Chapter'], ['CCE IEEE SB', 'Student Branch'], ['CCE IEDC', 'Innovation & entrepreneurship']].map(([name, detail]) => <article key={name} className="rounded-3xl border border-stroke bg-surface p-6"><p className="font-display text-2xl italic">{name}</p><p className="mt-2 text-sm text-muted">{detail}</p></article>)}
        </div>
      </section>
      <section className="border-y border-stroke bg-surface/30 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-[1100px]">
          <SectionTitle label="The pre-IEDC advantage" title={<>More than a <em className="font-display italic">hackathon.</em></>} text="A practical launchpad built for students and early-stage founders who are ready to move their work forward." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[['01', 'Startup mentorship', 'Get direct feedback on the problem, product and pitch.'], ['02', 'Investor exposure', 'Learn what makes an early idea credible to the next room.'], ['03', 'Networking', 'Meet builders, mentors and future collaborators.'], ['04', 'Incentives', '10–15 KTU Points plus duty leave support.']].map(([num, title, body]) => <article key={title} className="rounded-3xl border border-stroke bg-bg p-6"><p className="mb-8 font-display text-3xl italic text-muted">{num}</p><h3 className="mb-2 text-lg">{title}</h3><p className="text-sm leading-relaxed text-muted">{body}</p></article>)}
          </div>
        </div>
      </section>
      <section id="tracks" className="mx-auto max-w-[1100px] px-6 py-20 md:py-28">
        <SectionTitle label="Participant tracks" title={<>Choose your <em className="font-display italic">starting point.</em></>} />
        <div className="grid gap-5 md:grid-cols-2">
          <article className="rounded-3xl border border-[#89AACC]/40 bg-[#89AACC]/10 p-8">
            <p className="text-xs uppercase tracking-[.2em] text-muted">Track A</p>
            <h3 className="my-3 font-display text-4xl italic">The Launchpad</h3>
            <p className="mb-7 text-sm text-muted">For ideators turning a promising campus concept into a focused first venture.</p>
            <ul className="space-y-3 text-sm">
              <li>→ Problem discovery and validation</li>
              <li>→ Prototype and narrative design</li>
              <li>→ Team formation support</li>
            </ul>
          </article>
          <article className="rounded-3xl border border-white/15 bg-surface p-8">
            <p className="text-xs uppercase tracking-[.2em] text-muted">Track B</p>
            <h3 className="my-3 font-display text-4xl italic">The Refinery</h3>
            <p className="mb-7 text-sm text-muted">For founders with an early prototype who need sharper positioning, proof and momentum.</p>
            <ul className="space-y-3 text-sm">
              <li>→ Product and business-model review</li>
              <li>→ Pitch and scale strategy</li>
              <li>→ Founder-focused mentorship</li>
            </ul>
          </article>
        </div>
      </section>
      <section id="schedule" className="border-y border-stroke bg-surface/30 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-[1100px]">
          <SectionTitle label="Two-day programme" title={<>Build, pitch, <em className="font-display italic">sustain.</em></>} />
          {[['Day 1', 'Ideate + Validate + Build', 'Frame the problem, test the assumptions and turn your idea into a working direction.'], ['Day 2', 'Pitch + Scale + Sustain', 'Refine your venture story, learn the next moves and present the work.']].map(([day, title, text]) => <details key={day} className="group border-t border-stroke py-6" open={day === 'Day 1'}><summary className="flex cursor-pointer items-center gap-5"><span className="w-16 text-xs uppercase tracking-[.15em] text-muted">{day}</span><strong className="flex-1 font-display text-2xl italic md:text-4xl">{title}</strong><b className="text-xl font-normal group-open:rotate-45">+</b></summary><p className="ml-[84px] mt-4 max-w-xl text-sm text-muted">{text}</p></details>)}
        </div>
      </section>
      <section className="mx-auto max-w-[1100px] px-6 py-20 md:py-28"><SectionTitle label="Speakers & mentors" title={<>Built for honest <em className="font-display italic">feedback.</em></>} text="The mentor and speaker lineup will be announced shortly. The programme is designed around practical, small-group conversations—not passive sessions." /><div className="flex flex-wrap gap-5">{['Mentor lineup', 'Founder sessions', 'Investor conversations'].map((item) => <div key={item} className="flex items-center gap-4 rounded-full border border-stroke bg-surface p-3 pr-6"><span className="grid h-12 w-12 place-items-center rounded-full bg-stroke font-display text-xl italic">UF</span><span className="text-sm">{item}</span></div>)}</div></section>
      <section id="register" className="border-y border-stroke bg-surface/30 px-6 py-20 md:py-28"><div className="mx-auto max-w-[1100px]"><SectionTitle label="Registration" title={<>Save your <em className="font-display italic">spot.</em></>} text="Registration is handled securely through MakeMyPass. Final prices and category availability will be listed there." /><div className="grid gap-4 md:grid-cols-3">{[['Student pass', 'For B.Tech/M.Tech students', 'Price on MakeMyPass'], ['Graduate pass', 'For recent engineering graduates', 'Price on MakeMyPass'], ['Founder pass', 'For early-stage founders and teams', 'Price on MakeMyPass']].map(([name, audience, price], index) => <article key={name} className={`rounded-3xl border p-7 ${index === 1 ? 'border-[#89AACC] bg-[#89AACC]/10' : 'border-stroke bg-bg'}`}><p className="text-xs uppercase tracking-[.18em] text-muted">{name}</p><p className="my-6 font-display text-3xl italic">{price}</p><p className="mb-8 text-sm text-muted">{audience}</p><a href={REGISTER_URL} target="_blank" rel="noreferrer" className="gradient-ring block rounded-full border border-stroke px-4 py-3 text-center text-sm">Register ↗</a></article>)}</div></div></section>
      <section className="mx-auto grid max-w-[1100px] gap-10 px-6 py-20 md:grid-cols-2 md:py-28"><div><SectionTitle label="Venue & logistics" title={<>CCE, <em className="font-display italic">Irinjalakuda.</em></>} text="Christ College of Engineering will host two days of building, critique and venture-focused conversations. Exact reporting details will be shared with registered participants." /><p className="text-sm text-muted">Christ College of Engineering, Irinjalakuda<br />Kerala, India</p></div><iframe className="min-h-[320px] w-full rounded-3xl border border-stroke grayscale" title="Christ College of Engineering location" loading="lazy" src="https://maps.google.com/maps?q=Christ%20College%20of%20Engineering%20Irinjalakuda&z=15&output=embed" /></section>
      <section className="border-y border-stroke bg-surface/30 px-6 py-20"><div className="mx-auto max-w-[1100px]"><SectionTitle label="Sponsors & partners" title={<>The people who make it <em className="font-display italic">possible.</em></>} text="Partner and sponsor announcements will appear here as they are confirmed." /><div className="grid grid-cols-2 gap-3 md:grid-cols-4">{['IEEE IA/IE/PELS', 'CCE IEEE SB', 'CCE IEDC', 'Partner announcement'].map((name) => <div key={name} className="grid min-h-24 place-items-center rounded-2xl border border-stroke bg-bg p-4 text-center text-sm text-muted grayscale transition hover:grayscale-0 hover:text-text-primary">{name}</div>)}</div></div></section>
      <section id="faq" className="mx-auto max-w-[900px] px-6 py-20 md:py-28"><SectionTitle label="FAQ" title={<>Questions, <em className="font-display italic">answered.</em></>} />{[['Who is UNFOLD for?', '3rd and 4th year engineering students, B.Tech/M.Tech graduates, and early-stage founders.'], ['Where will UNFOLD take place?', 'At Christ College of Engineering (CCE), Irinjalakuda, on September 12–13, 2026.'], ['How do I register?', 'Use the MakeMyPass registration link. Final registration categories and prices are listed on that platform.'], ['Will there be duty leave and KTU points?', 'The event offers 10–15 KTU Points and duty leave support; share the final requirement with your college team.']].map(([question, answer]) => <details key={question} className="group border-t border-stroke py-5"><summary className="flex cursor-pointer items-center justify-between gap-4 text-base"><span>{question}</span><b className="text-xl font-normal group-open:rotate-45">+</b></summary><p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{answer}</p></details>)}</section>
    </main>
    <footer className="relative overflow-hidden px-6 pb-20 pt-20 md:pt-28">
      <VideoBackground flip />
      <div className="absolute inset-0 bg-black/70" />
      <div className="relative z-10 mx-auto max-w-[1100px]">
        <p className="mb-6 font-display text-6xl italic md:text-8xl">UNFOLD</p>
        <div className="grid gap-10 border-t border-white/10 pt-8 md:grid-cols-2">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[.2em] text-muted">Contact</p>
            <a className="text-lg hover:text-[#89AACC]" href="mailto:hello@unfold2026.com">hello@unfold2026.com</a>
          </div>
          <div>
            <p className="mb-2 text-xs uppercase tracking-[.2em] text-muted">Organised by</p>
            <p className="text-sm text-muted">IEEE IA/IE/PELS Joint Chapter · CCE IEEE SB · CCE IEDC</p>
          </div>
        </div>
        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-xs text-muted sm:flex-row">
          <p>© 2026 UNFOLD</p>
          <div className="flex gap-5">
            <a href="https://www.instagram.com/ieeeiaiepelskerala/">Instagram</a>
            <a href="https://in.linkedin.com/company/ieeeiaiepelskerala">LinkedIn</a>
            <a href="https://ia.ie.pels.ieeekerala.org/">IEEE IA/IE/PELS Jt Ch Kerala</a>
          </div>
          <p>CCE, Irinjalakuda</p>
        </div>
      </div>
    </footer>
    <a href={REGISTER_URL} target="_blank" rel="noreferrer" className="fixed bottom-4 left-4 right-4 z-40 rounded-full bg-text-primary px-5 py-4 text-center text-sm font-semibold text-bg shadow-xl sm:hidden">Register Now · Only 100 Spots ↗</a>
  </>;
}
createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);
