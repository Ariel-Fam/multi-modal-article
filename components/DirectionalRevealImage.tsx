'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

type Direction =
  | 'top-to-bottom'
  | 'bottom-to-top'
  | 'left-to-right'
  | 'right-to-left';

type Variant = 'slide' | 'wipe';

type Props = {
  src: string;
  alt?: string;
  /**
   * Aspect ratio for the responsive container.
   * Examples: 16/9, '16 / 9', 4/3, '1 / 1'
   */
  aspectRatio?: number | string;    // default '3 / 2'
  /**
   * Optional max width to constrain the image (e.g., 1280, '1280px', '90vw').
   * Defaults to 100% width of its parent.
   */
  maxWidth?: number | string;
  distance?: string | number;       // default '100%'
  direction?: Direction;            // default 'top-to-bottom'
  variant?: Variant;                // default 'slide'
  duration?: number;                // default 1.2
  ease?: string;                    // default 'power3.out'
  start?: string;                   // default 'top 80%'
  end?: string;                     // default 'top 30%'
  scrub?: boolean;                  // default false
  once?: boolean;                   // default true
  className?: string;               // extra container classes
};

export default function DirectionalRevealImage({
  src,
  alt = '',
  aspectRatio = '3 / 2',
  maxWidth,                // e.g. 1200 or '1200px' or '90vw'
  distance = '100%',
  direction = 'top-to-bottom',
  variant = 'slide',
  duration = 2.1,
  ease = 'power3.out',
  start = 'top 80%',
  end = 'top 30%',
  scrub = false,
  once = true,
  className = '',
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const toClip = 'inset(0% 0% 0% 0%)';

  const fromValuesFor = (
    variant: Variant,
    direction: Direction,
    distance: string | number
  ) => {
    if (variant === 'wipe') {
      switch (direction) {
        case 'top-to-bottom':
          return { clipPath: 'inset(100% 0% 0% 0%)' };
        case 'bottom-to-top':
          return { clipPath: 'inset(0% 0% 100% 0%)' };
        case 'left-to-right':
          return { clipPath: 'inset(0% 100% 0% 0%)' };
        case 'right-to-left':
          return { clipPath: 'inset(0% 0% 0% 100%)' };
      }
    } else {
      const dist = typeof distance === 'number' ? `${distance}px` : distance;
      switch (direction) {
        case 'top-to-bottom':
          return { y: `-${dist}`, opacity: 0 };
        case 'bottom-to-top':
          return { y: dist, opacity: 0 };
        case 'left-to-right':
          return { x: `-${dist}`, opacity: 0 };
        case 'right-to-left':
          return { x: dist, opacity: 0 };
      }
    }
  };

  const toValuesFor = (variant: Variant) => {
    if (variant === 'wipe') return { clipPath: toClip };
    return { x: 0, y: 0, opacity: 1 };
  };

  useGSAP(
    () => {
      if (!wrapperRef.current || !containerRef.current) return;

      if (variant === 'wipe') {
        (wrapperRef.current as HTMLElement).style.willChange = 'clip-path';
      }

      const anim = gsap.fromTo(
        wrapperRef.current,
        fromValuesFor(variant, direction, distance)!,
        {
          ...toValuesFor(variant),
          duration,
          ease,
          scrollTrigger: {
            trigger: containerRef.current,
            start,
            end,
            scrub,
          },
        }
      );

      return () => {
        anim?.scrollTrigger?.kill();
        anim?.kill();
      };
    },
    { scope: containerRef, dependencies: [direction, distance, variant, duration, ease, start, end, scrub, once] }
  );

  // Compute inline styles for responsive sizing
  const maxW =
    typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth || '100%';

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-2xl shadow-lg ${className}`}
      style={{
        width: '100%',          // fill parent width
        maxWidth: maxW,         // optional cap
        aspectRatio,            // controls height responsively
        marginInline: 'auto',   // center when maxWidth < 100%
      }}
    >
      {/* wrapper is animated, image fills it */}
      <div ref={wrapperRef} className="absolute inset-0 w-full h-full">
        <Image
          src={src}
          alt={alt}
          fill                        // responsive fill
          sizes="(min-width: 1024px) 900px, 100vw"  // tune for your layout
          className="object-cover"
          priority={false}
        />
      </div>
    </div>
  );
}
