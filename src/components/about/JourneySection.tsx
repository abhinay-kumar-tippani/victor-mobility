import BrandText from "@/components/brand/BrandText";
import {
  ArrowDownRight,
  Buildings,
  Car,
  CheckCircle,
  Globe,
  GraduationCap,
  Leaf,
  MapPin,
  Path,
  RocketLaunch,
  ShieldCheck,
  Sparkle,
  TrendUp,
  Trophy,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { Timeline } from "@/components/velora/timeline";
import brand from "@/content/brand.json";
import journey from "@/content/journey.json";
import styles from "./JourneySection.module.css";

const icons: Record<string, Icon> = {
  Sparkles: Sparkle,
  Award: Trophy,
  Rocket: RocketLaunch,
  Car,
  TrendingUp: TrendUp,
  GraduationCap,
  ShieldCheck,
  MapPin,
  Globe,
  Leaf,
  CheckCircle2: CheckCircle,
  Building2: Buildings,
};

export default function JourneySection() {
  const firstYear = journey.milestones[0]?.date.match(/\d{4}/)?.[0] || "2009";
  const lastYear = journey.milestones[journey.milestones.length - 1]?.date.match(/\d{4}/)?.[0] || firstYear;

  return (
    <section id="journey" aria-labelledby="journey-heading" className={styles.section}>
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${styles.layout}`}>
        <div className={styles.intro}>
          <p className={`${styles.eyebrow} section-eyebrow`}><BrandText>{journey.eyebrow}</BrandText></p>
          <h2 id="journey-heading" className={styles.heading}><BrandText>{journey.title}</BrandText></h2>
          <p dir="auto" className={styles.summary}><BrandText>{journey.subtitle}</BrandText></p>

          <div className={styles.journeyMark}>
            <div dir="ltr" className={styles.yearRange}>
              <span>{firstYear}</span>
              <div className={styles.routeLine} aria-hidden="true">
                <span />
                <Path size={22} weight="bold" />
                <span />
              </div>
              <span>{lastYear}</span>
            </div>
            <p dir="auto"><BrandText>{brand.tagline}</BrandText></p>
          </div>

          <nav aria-label="Journey chapters" className={styles.chapters}>
            {journey.chapters.map((chapter) => (
              <a key={chapter.milestoneId} href={`#journey-milestone-${chapter.milestoneId}`}>
                <span>
                  <span dir="ltr" className={styles.chapterYears}>{chapter.years}</span>
                  <span className={styles.chapterTitle}><BrandText>{chapter.title}</BrandText></span>
                </span>
                <ArrowDownRight size={19} weight="bold" aria-hidden="true" />
              </a>
            ))}
          </nav>
        </div>

        <Timeline>
          <ol className={styles.milestones}>
            {journey.milestones.map((milestone) => {
              const Icon = icons[milestone.icon as keyof typeof icons] || Path;
              return (
                <li
                  key={milestone.id}
                  id={`journey-milestone-${milestone.id}`}
                  tabIndex={-1}
                  className={styles.milestone}
                >
                  <span className={styles.node} aria-hidden="true">
                    <Icon size={19} weight="bold" />
                  </span>
                  <article className={styles.card} aria-labelledby={`journey-title-${milestone.id}`}>
                    <div className={styles.cardMeta}>
                      <span dir="ltr" className={styles.date}>{milestone.date}</span>
                      <span className={styles.number} aria-hidden="true">
                        {String(milestone.id).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 id={`journey-title-${milestone.id}`}><BrandText>{milestone.title}</BrandText></h3>
                    <p dir="auto"><BrandText>{milestone.description}</BrandText></p>
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
