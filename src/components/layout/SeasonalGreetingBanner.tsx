"use client";

import { useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";
import indiaData from "@/content/india.json";
import styles from "./SeasonalGreetingBanner.module.css";

const greeting = indiaData.seasonalGreeting;

function Greeting() {
  return (
    <span className={styles.greeting}>
      <span className={styles.diya}>🪔</span>
      <span>{greeting.message}</span>
      <span className={styles.diya}>🪔</span>
    </span>
  );
}

export default function SeasonalGreetingBanner() {
  // Cached/static pages stay empty until the visitor's current date is checked.
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);

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
    <aside className={styles.banner} aria-label="Festive greeting" lang="en" dir="ltr" data-seasonal-greeting data-paused={paused}>
      <p className="sr-only">{greeting.message}</p>
      <div className={styles.viewport} aria-hidden="true">
        <div className={styles.track} data-greeting-track>
          {[0, 1].map(group => (
            <div className={styles.group} key={group}>
              {[0, 1, 2].map(item => <Greeting key={item} />)}
            </div>
          ))}
        </div>
        <div className={styles.still} data-greeting-static><Greeting /></div>
      </div>
      <button
        type="button"
        onClick={() => setPaused(value => !value)}
        className={styles.control}
        aria-label={paused ? "Resume Diwali greeting" : "Pause Diwali greeting"}
        aria-pressed={paused}
        title={paused ? "Resume greeting" : "Pause greeting"}
      >
        {paused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}
      </button>
    </aside>
  );
}
