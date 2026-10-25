import {
  ArrowDownRight, Award, Building2, Car, CheckCircle2, Globe, GraduationCap,
  Leaf, MapPin, Rocket, Route, ShieldCheck, Sparkles, TrendingUp,
} from "lucide-react";
import { Timeline } from "@/components/velora/timeline";
import brand from "@/content/brand.json";
import journey from "@/content/journey.json";
import styles from "./JourneySection.module.css";

const icons = {
  Sparkles, Award, Rocket, Car, TrendingUp, GraduationCap,
  ShieldCheck, MapPin, Globe, Leaf, CheckCircle2, Building2,
};

export default function JourneySection() {
  return (
    <section id="journey" aria-labelledby="journey-heading" className={styles.section}>
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${styles.layout}`}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>{journey.eyebrow}</p>
          <h2 id="journey-heading" className={styles.heading}>{journey.title}</h2>
          <p className={styles.summary}>{journey.subtitle}</p>

          <div className={styles.journeyMark}>
            <div className={styles.yearRange}>
              <span>2009</span>
              <div className={styles.routeLine} aria-hidden="true">
                <span />
                <Route size={22} strokeWidth={1.5} />
                <span />
              </div>
              <span>2024</span>
            </div>
            <p>{brand.tagline}</p>
          </div>

          <nav aria-label="Journey chapters" className={styles.chapters}>
            {journey.chapters.map((chapter) => (
              <a key={chapter.milestoneId} href={`#journey-milestone-${chapter.milestoneId}`}>
                <span>
                  <span className={styles.chapterYears}>{chapter.years}</span>
                  <span className={styles.chapterTitle}>{chapter.title}</span>
                </span>
                <ArrowDownRight size={19} strokeWidth={1.5} aria-hidden="true" />
              </a>
            ))}
          </nav>
        </div>

        <Timeline>
          <ol className={styles.milestones}>
            {journey.milestones.map((milestone) => {
              const Icon = icons[milestone.icon as keyof typeof icons] || Route;
              return (
                <li
                  key={milestone.id}
                  id={`journey-milestone-${milestone.id}`}
                  tabIndex={-1}
                  className={styles.milestone}
                >
                  <span className={styles.node} aria-hidden="true">
                    <Icon size={19} strokeWidth={1.6} />
                  </span>
                  <article className={styles.card} aria-labelledby={`journey-title-${milestone.id}`}>
                    <div className={styles.cardMeta}>
                      <span className={styles.date}>{milestone.date}</span>
                      <span className={styles.number} aria-hidden="true">
                        {String(milestone.id).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 id={`journey-title-${milestone.id}`}>{milestone.title}</h3>
                    <p>{milestone.description}</p>
                  </article>
                </li>
              );
            })}
          </ol>
        </Timeline>
      </div>
    </section>
  );
}
