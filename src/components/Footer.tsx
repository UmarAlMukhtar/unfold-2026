import { EMAIL_ADDRESS } from '../data/site';
import { VideoBackground } from './VideoBackground';

export function Footer() {
  return (
    <footer className="relative overflow-hidden px-6 pb-20 pt-20 md:pt-28">
      <VideoBackground flip />
      <div className="absolute inset-0 bg-black/70" />
      <div className="relative z-10 mx-auto max-w-[1100px]">
        <p className="mb-6 font-display text-6xl italic md:text-8xl">UNFOLD</p>
        <div className="grid gap-10 border-t border-white/10 pt-8 md:grid-cols-2">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[.2em] text-muted">Contact</p>
            <a className="text-lg hover:text-[#89AACC]" href={`mailto:${EMAIL_ADDRESS}`}>{EMAIL_ADDRESS}</a>
          </div>
          <div>
            <p className="mb-2 text-xs uppercase tracking-[.2em] text-muted">Organised by</p>
            <p className="text-sm text-muted">IEEE IA/IE/PELS Jt Ch Kerala · CCE IEEE SB</p>
          </div>
        </div>
        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-xs text-muted sm:flex-row">
          <p>© 2026 UNFOLD</p>
          <div className="flex gap-5">
            <a href="https://www.instagram.com/ieeeiaiepelskerala/">Instagram</a>
            <a href="https://in.linkedin.com/company/ieeeiaiepelskerala">LinkedIn</a>
          </div>
          <a href="https://ia.ie.pels.ieeekerala.org/">IEEE IA/IE/PELS Jt Ch Kerala</a>
        </div>
      </div>
    </footer>
  )
}
