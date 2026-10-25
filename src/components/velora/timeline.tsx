"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import styles from "./timeline.module.css";

/** A decorative scroll trace around server-rendered, chronological content. */
export function Timeline({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.65", "end 0.65"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 35 });

  useEffect(() => {
    const element = ref.current;
    const rail = railRef.current;
    if (!element || !rail) return;

    // Keep the line joined to the first/last icon as text wraps or fonts load.
    const alignRail = () => {
      const nodes = element.querySelectorAll<HTMLElement>("li > span[aria-hidden]");
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (!first || !last) return;
      const bounds = element.getBoundingClientRect();
      const start = first.getBoundingClientRect();
      const end = last.getBoundingClientRect();
      rail.style.top = `${start.top - bounds.top + start.height / 2}px`;
      rail.style.height = `${end.top + end.height / 2 - start.top - start.height / 2}px`;
    };

    alignRail();
    const observer = new ResizeObserver(alignRail);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} data-slot="timeline" className={styles.timeline}>
      <div ref={railRef} aria-hidden="true" className={styles.rail}>
        <motion.div className={styles.progress} style={{ scaleY: progress }} />
      </div>
      {children}
    </div>
  );
}
