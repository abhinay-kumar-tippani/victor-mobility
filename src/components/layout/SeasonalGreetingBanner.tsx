"use client";

import { useEffect, useState } from "react";
import indiaData from "@/content/india.json";
import styles from "./SeasonalGreetingBanner.module.css";

const greeting = indiaData.seasonalGreeting;

function SeasonalDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute", width: 0, height: 0, pointerEvents: "none" }} aria-hidden="true" focusable="false">
      <defs>
        {/* Luxury Gold Gradient */}
        <linearGradient id="seasonal-diya-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF7D6" />
          <stop offset="25%" stopColor="#F5D77F" />
          <stop offset="55%" stopColor="#D4A745" />
          <stop offset="85%" stopColor="#A27725" />
          <stop offset="100%" stopColor="#F5D77F" />
        </linearGradient>

        {/* Polished Brass Gradient for Diya Bowl Depth */}
        <linearGradient id="seasonal-diya-brass" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FCE79D" />
          <stop offset="50%" stopColor="#B98B28" />
          <stop offset="100%" stopColor="#6E4D13" />
        </linearGradient>

        {/* Radiant Flame Glow Halo */}
        <radialGradient id="seasonal-flame-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFE082" stopOpacity="0.95" />
          <stop offset="40%" stopColor="#FF9800" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#FF5722" stopOpacity="0" />
        </radialGradient>

        {/* Flame Body Gradient */}
        <linearGradient id="seasonal-flame-body" x1="50%" y1="100%" x2="50%" y2="0%">
          <stop offset="0%" stopColor="#FF5722" />
          <stop offset="30%" stopColor="#FF9800" />
          <stop offset="70%" stopColor="#FFD54F" />
          <stop offset="100%" stopColor="#FFFFFF" />
        </linearGradient>

        {/* Soft Ambient Glow Filter */}
        <filter id="seasonal-glow-filter" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
}

function HangingDiya() {
  return (
    <svg
      viewBox="0 0 26 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.hangingDiya}
      aria-hidden="true"
      focusable="false"
    >
      {/* Golden hanging chain descending from navbar bottom boundary (y=0 to y=14) */}
      <line
        x1="13"
        y1="0"
        x2="13"
        y2="14"
        stroke="url(#seasonal-diya-gold)"
        strokeWidth="1.25"
        strokeDasharray="1.5 1.5"
      />
      {/* Decorative brass hanging links / beads */}
      <circle cx="13" cy="4" r="1.1" fill="url(#seasonal-diya-gold)" />
      <circle cx="13" cy="9" r="1.1" fill="url(#seasonal-diya-gold)" />
      <circle cx="13" cy="14" r="1.7" fill="url(#seasonal-diya-gold)" />

      {/* Upright Sacred Flame with radial glow aura */}
      <g className={styles.flameGlow}>
        {/* Ambient flame halo */}
        <circle cx="13" cy="18" r="6.5" fill="url(#seasonal-flame-glow)" filter="url(#seasonal-glow-filter)" />
        {/* Outer flame */}
        <path
          d="M13 11 C14.6 13.8 15.8 16.2 15.8 18.2 C15.8 20 14.6 21.6 13 21.6 C11.4 21.6 10.2 20 10.2 18.2 C10.2 16.2 11.4 13.8 13 11 Z"
          fill="url(#seasonal-flame-body)"
        />
        {/* Inner bright flame core */}
        <path
          d="M13 13.5 C13.7 15.2 14.3 16.8 14.3 18.2 C14.3 19.3 13.7 20.2 13 20.2 C12.3 20.2 11.7 19.3 11.7 18.2 C11.7 16.8 12.3 15.2 13 13.5 Z"
          fill="#FFFDF0"
        />
      </g>

      {/* Traditional Brass Diya Bowl (symmetrical, centered) */}
      <ellipse
        cx="13"
        cy="22"
        rx="9.5"
        ry="2.2"
        fill="url(#seasonal-diya-gold)"
        stroke="#6E4D13"
        strokeWidth="0.4"
      />
      <ellipse cx="13" cy="22" rx="7.2" ry="1.3" fill="#6E4D13" opacity="0.65" />

      {/* Scalloped Diya Body */}
      <path
        d="M3.8 22 C4.2 28.5 8 32 13 32 C18 32 21.8 28.5 22.2 22 C19.5 23.5 16.5 24 13 24 C9.5 24 6.5 23.5 3.8 22 Z"
        fill="url(#seasonal-diya-brass)"
      />
      {/* Engraved decorative gold highlight */}
      <path
        d="M7 23.6 C8 27.5 10.2 29.5 13 29.8 C15.8 29.5 18 27.5 19 23.6"
        fill="none"
        stroke="url(#seasonal-diya-gold)"
        strokeWidth="0.8"
        opacity="0.9"
      />

      {/* Down-facing Ornamental Finial / Bell Pendant (suspended below bowl) */}
      <rect x="11.5" y="32" width="3" height="1.6" rx="0.4" fill="url(#seasonal-diya-gold)" />
      {/* Downward teardrop drop */}
      <path
        d="M13 41 C11 37.2 11.3 33.6 11.3 33.6 L14.7 33.6 C14.7 33.6 15 37.2 13 41 Z"
        fill="url(#seasonal-diya-gold)"
      />
      {/* Downward tip finial bead */}
      <circle cx="13" cy="43" r="1.1" fill="url(#seasonal-diya-gold)" />
    </svg>
  );
}

function GreetingItem() {
  return (
    <div className={styles.greetingItem}>
      <HangingDiya />
      <span className={styles.sparkle} aria-hidden="true">✦</span>
      <span className={styles.messageText}>{greeting.message}</span>
      <span className={styles.sparkle} aria-hidden="true">✦</span>
      <span className={styles.taglineText}>Festival of Lights · Wishing You Prosperity</span>
      <HangingDiya />
    </div>
  );
}

export default function SeasonalGreetingBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const startsAt = Date.parse(greeting.startsAt);
    const expiresAt = Date.parse(greeting.expiresAt);
    if (!Number.isFinite(startsAt) || !Number.isFinite(expiresAt) || expiresAt <= startsAt) return;

    let timer: ReturnType<typeof setTimeout> | undefined;
    const refresh = () => {
      clearTimeout(timer);
      const now = Date.now();
      setVisible(now >= startsAt && now < expiresAt);
      const nextChange = now < startsAt ? startsAt : expiresAt;
      if (now < nextChange) timer = setTimeout(refresh, Math.min(nextChange - now, 2_147_483_647));
    };

    refresh();
    document.addEventListener("visibilitychange", refresh);
    window.addEventListener("pageshow", refresh);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", refresh);
      window.removeEventListener("pageshow", refresh);
    };
  }, []);

  if (!visible) return null;

  return (
    <aside
      className={styles.banner}
      aria-label="Festive greeting"
      lang="en"
      dir="ltr"
      data-seasonal-greeting
    >
      <SeasonalDefs />
      <p className="sr-only">{greeting.message}</p>
      <div className={styles.viewport} aria-hidden="true">
        <div className={styles.track} data-greeting-track>
          {[0, 1].map((group) => (
            <div className={styles.group} key={group}>
              {[0, 1, 2].map((item) => (
                <GreetingItem key={item} />
              ))}
            </div>
          ))}
        </div>
        <div className={styles.still} data-greeting-static>
          <GreetingItem />
        </div>
      </div>
    </aside>
  );
}
