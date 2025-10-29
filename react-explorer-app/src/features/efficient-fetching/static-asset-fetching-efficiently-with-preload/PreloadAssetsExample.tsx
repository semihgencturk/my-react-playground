import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./preloadExample.module.css";

type PreloadStatus = "idle" | "loading" | "ready" | "error";

const heroAsset = {
  title: "Hover-Primed Hero",
  copy:
    "This teaser begins with a lightweight preview image. Hover (or focus) over the card to quietly warm the hi-res hero. Click the button to promote it once the bytes are cached.",
  credit: "Photo by Grant Ritchie",
  previewSrc:
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=480&q=45",
  fullSrc:
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80",
};

const statusLabel: Record<PreloadStatus, string> = {
  idle: "Idle",
  loading: "Preloading",
  ready: "Ready",
  error: "Error",
};

export default function PreloadAssetsExample() {
  const [status, setStatus] = useState<PreloadStatus>("idle");
  const [message, setMessage] = useState(
    "Hover to warm the high-resolution hero."
  );
  const [heroSrc, setHeroSrc] = useState(heroAsset.previewSrc);

  const hasPreloadedRef = useRef(false);
  const shouldRevealRef = useRef(false);
  const linkRef = useRef<HTMLLinkElement | null>(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const statusClass =
    status === "idle"
      ? styles.statusIdle
      : status === "loading"
      ? styles.statusLoading
      : status === "ready"
      ? styles.statusReady
      : styles.statusError;

  const beginPreload = useCallback(() => {
    if (hasPreloadedRef.current) {
      setStatus("ready");
      setMessage(
        shouldRevealRef.current
          ? "High-resolution hero cached — displaying now."
          : "High-resolution hero cached — click the button to reveal."
      );
      return;
    }

    setStatus("loading");
    setMessage("Preloading high-resolution hero…");

    if (typeof document !== "undefined" && !linkRef.current) {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = heroAsset.fullSrc;
      document.head.appendChild(link);
      linkRef.current = link;
    }

    const img = new Image();
    img.decoding = "async";
    img.src = heroAsset.fullSrc;
    img.onload = () => {
      if (!isMountedRef.current) return;
      hasPreloadedRef.current = true;
      setStatus("ready");
      if (shouldRevealRef.current) {
        setHeroSrc(heroAsset.fullSrc);
        setMessage("High-resolution hero displayed.");
      } else {
        setMessage("High-resolution hero cached — click the button to reveal.");
      }
    };
    img.onerror = () => {
      if (!isMountedRef.current) return;
      setStatus("error");
      setMessage("Preload failed — showing lightweight preview.");
    };
  }, []);

  const handleHover = useCallback(() => {
    if (!hasPreloadedRef.current) {
      beginPreload();
    }
  }, [beginPreload]);

  const handleReveal = useCallback(() => {
    shouldRevealRef.current = true;

    if (hasPreloadedRef.current) {
      setHeroSrc(heroAsset.fullSrc);
      setStatus("ready");
      setMessage("High-resolution hero displayed.");
      return;
    }

    setStatus("loading");
    setMessage("Preloading before display…");
    beginPreload();
  }, [beginPreload]);

  const isPreview = heroSrc !== heroAsset.fullSrc;

  return (
    <section
      className={styles.example}
      onMouseEnter={handleHover}
      onFocusCapture={handleHover}
      onTouchStart={handleHover}
    >
      <div className={styles.heroCard}>
        <figure className={styles.heroFigure}>
          <img
            src={heroSrc}
            alt={heroAsset.title}
            className={`${styles.heroImage} ${
              isPreview ? styles.heroImageLoading : ""
            }`}
            loading="lazy"
          />
        </figure>

        <div className={styles.badgeRow}>
          <span className={`${styles.statusBadge} ${statusClass}`}>
            {statusLabel[status]}
          </span>
          <button
            type="button"
            className={styles.actionButton}
            onClick={handleReveal}
          >
            Show Image
          </button>
        </div>

        <div>
          <h3 className={styles.title}>{heroAsset.title}</h3>
          <p className={styles.copy}>{heroAsset.copy}</p>
        </div>

        <p className={styles.message}>{message}</p>
        <p className={styles.message}>© {heroAsset.credit}</p>
      </div>
    </section>
  );
}
