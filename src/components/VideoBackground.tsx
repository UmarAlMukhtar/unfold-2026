import { useEffect, useRef } from 'react';
import type Hls from 'hls.js';
import { HLS_SOURCE } from '../data/site';

export function VideoBackground({ flip = false }: { flip?: boolean }) {
  const video = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const element = video.current;
    if (!element) return;
    let player: Hls | undefined;
    let cancelled = false;
    const attach = async () => {
      const { default: HlsPlayer } = await import('hls.js');
      if (cancelled) return;
      if (HlsPlayer.isSupported()) {
        player = new HlsPlayer();
        player.loadSource(HLS_SOURCE);
        player.attachMedia(element);
      } else if (element.canPlayType('application/vnd.apple.mpegurl')) {
        element.src = HLS_SOURCE;
      }
    };
    void attach();
    return () => { cancelled = true; player?.destroy(); };
  }, []);
  return <video ref={video} autoPlay muted loop playsInline className={`absolute left-1/2 top-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover ${flip ? 'scale-y-[-1]' : ''}`} />;
}
