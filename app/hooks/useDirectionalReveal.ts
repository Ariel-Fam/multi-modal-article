'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RefObject } from 'react';

gsap.registerPlugin(ScrollTrigger);

export type Direction =
  | 'top-to-bottom'
  | 'bottom-to-top'
  | 'left-to-right'
  | 'right-to-left';

export type Variant = 'slide' | 'wipe' | 'fade';

type Options = {
  distance?: string | number;
  direction?: Direction;
  variant?: Variant;
  duration?: number;
  ease?: string;
  start?: string;
  end?: string;
  scrub?: boolean;
  once?: boolean;
  /** Trigger ref; defaults to targetRef if not provided */
  triggerRef?: RefObject<Element>;
};

export function useDirectionalReveal(
  targetRef: RefObject<Element>,
  {
    distance = '100%',
    direction = 'top-to-bottom',
    variant = 'slide',
    duration = 1.0,
    ease = 'power3.out',
    start = 'top 80%',
    end = 'top 30%',
    scrub = false,
    once = true,
    triggerRef,
  }: Options = {}
) {
  useGSAP(
    () => {
      const target = targetRef.current;
      const trigger = (triggerRef?.current ?? targetRef.current) as Element | null;
      if (!target || !trigger) return;

      const toClip = 'inset(0% 0% 0% 0%)';

      const fromVals = (() => {
        if (variant === 'fade') return { opacity: 0, y: 0, x: 0 };
        if (variant === 'wipe') {
          switch (direction) {
            case 'top-to-bottom':   return { clipPath: 'inset(100% 0% 0% 0%)' };
            case 'bottom-to-top':   return { clipPath: 'inset(0% 0% 100% 0%)' };
            case 'left-to-right':   return { clipPath: 'inset(0% 100% 0% 0%)' };
            case 'right-to-left':   return { clipPath: 'inset(0% 0% 0% 100%)' };
          }
        }
        const dist = typeof distance === 'number' ? `${distance}px` : distance;
        switch (direction) {
          case 'top-to-bottom':   return { y: `-${dist}`, opacity: 0 };
          case 'bottom-to-top':   return { y: dist, opacity: 0 };
          case 'left-to-right':   return { x: `-${dist}`, opacity: 0 };
          case 'right-to-left':   return { x: dist, opacity: 0 };
        }
      })();

      const toVals =
        variant === 'wipe' ? { clipPath: toClip } :
        variant === 'fade' ? { opacity: 1 } :
        { x: 0, y: 0, opacity: 1 };

      const anim = gsap.fromTo(
        target,
        fromVals!,
        {
          ...toVals,
          duration,
          ease,
          scrollTrigger: {
            trigger,
            start,
            end,
            scrub,
            once,
          },
        }
      );

      return () => {
        anim?.scrollTrigger?.kill();
        anim?.kill();
      };
    },
    { dependencies: [distance, direction, variant, duration, ease, start, end, scrub, once, targetRef?.current, triggerRef?.current] }
  );
}
