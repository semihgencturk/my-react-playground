import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import styles from "./pageSkeletonExample.module.css";

type PortfolioProject = {
  id: string;
  name: string;
  summary: string;
  tags: string[];
};

type Testimonial = {
  id: string;
  quote: string;
  author: string;
  role: string;
};

type PageData = {
  hero: {
    title: string;
    body: string;
    cta: string;
  };
  stats: Array<{ label: string; value: string }>;
  projects: PortfolioProject[];
  testimonials: Testimonial[];
};

const SKELETON_DELAY = 2200;

function fetchPortfolioData(): Promise<PageData> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        hero: {
          title: "Fjord Collective",
          body: "Streaming the build status, pull request health and deployment timeline for a distributed product team.",
          cta: "Live metrics refresh every 90 seconds",
        },
        stats: [
          { label: "Deploy success", value: "99.2%" },
          { label: "Median build", value: "3m 42s" },
          { label: "Active contributors", value: "128" },
        ],
        projects: [
          {
            id: "project-1",
            name: "Branch Insights",
            summary:
              "Surfacing drift and coverage health across long-lived branches with automated remediation suggestions.",
            tags: ["analytics", "observability"],
          },
          {
            id: "project-2",
            name: "Risk Console",
            summary:
              "Real-time gating of production deploys based on error budgets and customer impact scoring.",
            tags: ["ops", "sre"],
          },
        ],
        testimonials: [
          {
            id: "testimonial-1",
            quote:
              "We shipped a major refactor with zero incidents because everyone watched the dashboard stream during rollout.",
            author: "Casey Pratt",
            role: "Director of Engineering, Superset Labs",
          },
        ],
      });
    }, SKELETON_DELAY);
  });
}

const skeletonLines = (count: number, size: "sm" | "md" | "lg" = "md") => {
  const sizeClass =
    size === "sm"
      ? styles.skeletonLineSmall
      : size === "lg"
        ? styles.skeletonLineLarge
        : "";

  return Array.from({ length: count }, (_, index) => (
    <div
      key={index}
      className={`${styles.skeleton} ${styles.skeletonLine} ${sizeClass}`}
    />
  ));
};

export default function PageSkeletonExample() {
  const { data, isLoading } = useQuery<PageData>({
    queryKey: ["portfolio", "skeleton"],
    queryFn: fetchPortfolioData,
    staleTime: 1000 * 60 * 5,
  });

  const heroSection = useMemo(() => {
    if (isLoading || !data) {
      return (
        <div className={styles.card}>
          {skeletonLines(1, "lg")}
          {skeletonLines(2)}
          <div className={styles.metaRow}>
            <div
              className={`${styles.skeleton} ${styles.skeletonLine} ${styles.sm}`}
              style={{ width: "140px" }}
            />
            <div className={`${styles.skeleton} ${styles.skeletonCircle}`} />
          </div>
        </div>
      );
    }

    return (
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>{data.hero.title}</h3>
        <p className={styles.cardCopy}>{data.hero.body}</p>
        <div className={styles.metaRow}>
          <span className={styles.portfolioTag}>live</span>
          <span className={styles.cardCopy}>{data.hero.cta}</span>
        </div>
      </div>
    );
  }, [data, isLoading]);

  const statsSection = useMemo(() => {
    if (isLoading || !data) {
      return (
        <div className={styles.card}>
          {skeletonLines(1, "sm")}
          {Array.from({ length: 3 }, (_, idx) => (
            <div key={idx} className={styles.statGrid}>
              <div
                className={`${styles.skeleton} ${styles.skeletonLine} ${styles.sm}`}
                style={{ width: "80px" }}
              />
              <div
                className={`${styles.skeleton} ${styles.skeletonLine} ${styles.lg}`}
                style={{ width: "120px" }}
              />
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className={styles.card}>
        <p className={styles.cardTitle}>Release metrics</p>
        <div className={styles.statGrid}>
          {data.stats.map((stat) => (
            <div key={stat.label}>
              <span className={styles.statLabel}>{stat.label}</span>
              <span className={styles.statValue}>{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }, [data, isLoading]);

  const portfolioSection = useMemo(() => {
    if (isLoading || !data) {
      return (
        <div className={styles.card}>
          {skeletonLines(1)}
          {Array.from({ length: 2 }, (_, idx) => (
            <div key={idx} className={styles.portfolioItem}>
              <div
                className={`${styles.skeleton} ${styles.skeletonLine}`}
                style={{ width: "60%" }}
              />
              {skeletonLines(2, "sm")}
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className={styles.card}>
        <p className={styles.cardTitle}>Workstreams</p>
        <div className={styles.portfolioList}>
          {data.projects.map((project) => (
            <div key={project.id} className={styles.portfolioItem}>
              <span className={styles.portfolioTitle}>{project.name}</span>
              <p className={styles.cardCopy}>{project.summary}</p>
              <div className={styles.portfolioTags}>
                {project.tags.map((tag) => (
                  <span key={tag} className={styles.portfolioTag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }, [data, isLoading]);

  const testimonialSection = useMemo(() => {
    if (isLoading || !data) {
      return (
        <div className={styles.card}>
          {skeletonLines(3)}
          <div className={styles.metaRow}>
            <div className={`${styles.skeleton} ${styles.skeletonCircle}`} />
            <div style={{ flex: 1 }}>
              <div
                className={`${styles.skeleton} ${styles.skeletonLine}`}
                style={{ width: "60%" }}
              />
              <div
                className={`${styles.skeleton} ${styles.skeletonLine} ${styles.sm}`}
                style={{ width: "40%" }}
              />
            </div>
          </div>
        </div>
      );
    }

    const testimonial = data.testimonials[0];
    return (
      <div className={styles.card}>
        <p className={styles.testimonialQuote}>
          &ldquo;{testimonial.quote}&rdquo;
        </p>
        <div className={styles.testimonialMeta}>
          <span>{testimonial.author}</span>
          <span>&middot;</span>
          <span>{testimonial.role}</span>
        </div>
      </div>
    );
  }, [data, isLoading]);

  return (
    <div className={styles.skeletonPage}>
      <div className={styles.grid}>
        {heroSection}
        {statsSection}
      </div>

      <div className={styles.grid}>
        {portfolioSection}
        {testimonialSection}
      </div>
    </div>
  );
}
