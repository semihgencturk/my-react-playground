import { useEffect, useRef, useState, type ReactNode } from "react";
import OnDemandMetrics from "./OnDemandMetrics.js";
import styles from "../efficientLoadingMoreExamplesPage.module.css";

type VisibilityGateProps = {
  children: ReactNode;
  fallback: ReactNode;
};

function VisibilityGate({ children, fallback }: VisibilityGateProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [shouldRender, setShouldRender] = useState(
    () => typeof window === "undefined"
  );

  useEffect(() => {
    if (shouldRender) {
      console.log(
        "VisibilityGate: gated content already rendered, skipping observer setup."
      );
      return;
    }

    const element = containerRef.current;
    if (!element) {
      console.log(
        "VisibilityGate: no host element found, rendering children immediately."
      );
      setShouldRender(true);
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      console.log(
        "VisibilityGate: IntersectionObserver unavailable, rendering children immediately."
      );
      setShouldRender(true);
      return;
    }

    console.log(
      "VisibilityGate: attaching IntersectionObserver and waiting for entry."
    );
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          console.log(
            "VisibilityGate: intersection detected, hydrating gated content."
          );
          setShouldRender(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.35,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    observer.observe(element);

    return () => {
      console.log(
        "VisibilityGate: component unmounting, disconnecting observer."
      );
      observer.disconnect();
    };
  }, [shouldRender]);

  return (
    <div ref={containerRef} className={styles.gate}>
      {shouldRender ? children : fallback}
    </div>
  );
}

export default function RenderWhenVisibleSection() {
  return (
    <section className={`${styles.section} ${styles.sectionSecondary}`}>
      <h2 className={styles.sectionTitle}>Render When Visible</h2>
      <p className={styles.sectionCopy}>
        The metrics module below is gated behind an Intersection Observer. It
        does not render or allocate resources until the user scrolls it into
        view, reducing initial work on the main thread.
      </p>

      <VisibilityGate
        fallback={
          <div className={styles.placeholder}>
            <div className={styles.placeholderSpinner} />
            <p className={styles.placeholderMessage}>
              Scroll this card into the viewport to boot the performance metrics
              widget.
            </p>
          </div>
        }
      >
        <OnDemandMetrics />
      </VisibilityGate>
    </section>
  );
}
