'use client';

import { useEffect, useRef, useState } from 'react';
import { SKILLS } from '../../data/skills';

const SWAP_INTERVAL = 3200; // ms between each swap
const FADE_MS = 480;        // fade-out / fade-in duration

// Indices of skills shown by default on mobile (no hideOnMobile flag)
const STATIC_IDX = SKILLS.reduce<number[]>((acc, s, i) => {
  if (!s.hideOnMobile) acc.push(i);
  return acc;
}, []);

// Indices of skills initially hidden on mobile — these rotate through the pool
const POOL_IDX = SKILLS.reduce<number[]>((acc, s, i) => {
  if (s.hideOnMobile) acc.push(i);
  return acc;
}, []);

export default function FloatingLabels() {
  const [isMobile, setIsMobile] = useState(false);
  const [shownSet, setShownSet] = useState<Set<number>>(new Set(STATIC_IDX));
  const [exitingIdx, setExitingIdx] = useState<number | null>(null);

  // Refs so the interval closure always reads the latest values without stale captures
  const shownRef = useRef<number[]>([...STATIC_IDX]);
  const poolRef = useRef<number[]>([...POOL_IDX]);

  // Track viewport width changes
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Mobile: periodically swap one visible skill with one from the pool
  useEffect(() => {
    if (!isMobile) return;

    const id = setInterval(() => {
      const shown = shownRef.current;
      const pool = poolRef.current;
      if (pool.length === 0) return;

      // Pick a random visible skill to evict and a random pool skill to enter
      const evict = shown[Math.floor(Math.random() * shown.length)];
      const enter = pool[Math.floor(Math.random() * pool.length)];

      // Trigger fade-out first, then swap after the animation completes
      setExitingIdx(evict);

      setTimeout(() => {
        const newShown = shown.filter(i => i !== evict).concat(enter);
        const newPool  = pool.filter(i => i !== enter).concat(evict);
        shownRef.current = newShown;
        poolRef.current  = newPool;
        setShownSet(new Set(newShown));
        setExitingIdx(null);
      }, FADE_MS);
    }, SWAP_INTERVAL);

    return () => clearInterval(id);
  }, [isMobile]);

  return (
    <>
      {SKILLS.map((skill, i) => {
        const visible  = !isMobile || shownSet.has(i);
        const exiting  = isMobile && exitingIdx === i;
        const hidden   = !visible || exiting;

        // Outer wrapper: absolute position + fade-in / fade-out transition
        return (
          <div
            key={skill.label}
            style={{
              position: 'absolute',
              ...skill.position,
              opacity:    hidden ? 0 : 1,
              transform:  exiting ? 'translateY(-12px) scale(0.92)' : 'translateY(0) scale(1)',
              transition: `opacity ${FADE_MS}ms ease, transform ${FADE_MS}ms ease`,
              pointerEvents: visible && !exiting ? 'auto' : 'none',
            }}
          >
            {/* Inner: glass styles + float animation (separate element so transforms don't conflict) */}
            <div
              className={[
                'glass-panel group',
                'flex flex-col gap-[3px] px-3 py-2',
                'border border-white/[0.06]',
                'hover:border-white/30 hover:bg-white/[0.08]',
                'hover:shadow-[0_0_24px_rgba(255,255,255,0.07)]',
                'transition-colors duration-300 cursor-default',
              ].join(' ')}
              style={{
                animation: `float ${skill.animDuration}s ease-in-out ${skill.animDelay}s infinite`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.animationPlayState = 'paused';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.animationPlayState = 'running';
              }}
            >
              {/* Label row */}
              <div className="flex items-center gap-[6px]">
                <span className="w-[5px] h-[5px] rounded-full bg-white/25 group-hover:bg-accent flex-shrink-0 transition-colors duration-300" />
                <span className="text-[10px] font-bold tracking-[0.07em] text-white/75 group-hover:text-white uppercase whitespace-nowrap transition-colors duration-300">
                  {skill.label}
                </span>
              </div>
              {/* Sub-label */}
              <span className="text-[8px] font-medium tracking-[0.08em] text-muted group-hover:text-white/50 uppercase pl-[11px] transition-colors duration-300">
                {skill.sub}
              </span>
            </div>
          </div>
        );
      })}
    </>
  );
}
