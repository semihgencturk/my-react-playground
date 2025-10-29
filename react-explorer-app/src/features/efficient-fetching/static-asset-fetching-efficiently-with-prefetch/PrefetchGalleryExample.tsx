import { useCallback, useMemo, useRef, useState } from "react";
import styles from "./prefetchGallery.module.css";

type PrefetchStatus = "idle" | "loading" | "ready" | "error";

type GalleryAsset = {
  id: string;
  title: string;
  copy: string;
  previewSrc: string;
  fullSrc: string;
};

const galleryAssets: GalleryAsset[] = [
  {
    id: "fjord-stream",
    title: "Aurora Fjord",
    copy: "High latitude lightscape, 6K resolution. Prefetch to prime the gallery transition before the user opens it.",
    previewSrc:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=320&q=45",
    fullSrc:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "alpine-haze",
    title: "Alpine Haze",
    copy: "Hover-based prefetching warms the hero so the modal animation feels immediate.",
    previewSrc:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=320&q=45",
    fullSrc:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "forest-dawn",
    title: "Forest Dawn",
    copy: "Prefetching artboards keeps creative reviews fluid even on slow connections.",
    previewSrc:
      "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=320&q=45",
    fullSrc:
      "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=1600&q=80",
  },
];

type AssetState = {
  status: PrefetchStatus;
  message: string;
  image?: HTMLImageElement;
};

const initialStates = galleryAssets.reduce<Record<string, AssetState>>(
  (acc, asset) => {
    acc[asset.id] = {
      status: "idle",
      message: "Hover to start warming the image.",
    };
    return acc;
  },
  {}
);

const statusClassMap: Record<PrefetchStatus, string> = {
  idle: styles.statusIdle,
  loading: styles.statusLoading,
  ready: styles.statusReady,
  error: styles.statusError,
};

const statusLabel: Record<PrefetchStatus, string> = {
  idle: "Idle",
  loading: "Prefetching",
  ready: "Ready",
  error: "Error",
};

export default function PrefetchGalleryExample() {
  const [assetStates, setAssetStates] = useState(initialStates);
  const [activeAssetId, setActiveAssetId] = useState<string | null>(null);
  const prefetchingRef = useRef(new Set<string>());
  const stateRef = useRef(initialStates);

  const activeAsset = useMemo(() => {
    if (!activeAssetId) return null;
    return galleryAssets.find((asset) => asset.id === activeAssetId) ?? null;
  }, [activeAssetId]);

  const activeImageSrc = activeAsset
    ? assetStates[activeAsset.id]?.status === "ready"
      ? (assetStates[activeAsset.id].image?.src ?? activeAsset.fullSrc)
      : activeAsset.previewSrc
    : null;

  const handlePrefetch = useCallback((asset: GalleryAsset) => {
    setAssetStates((prev) => {
      const current = prev[asset.id];
      if (current.status === "loading" || current.status === "ready") {
        return prev;
      }

      if (!prefetchingRef.current.has(asset.id)) {
        prefetchingRef.current.add(asset.id);
        const link = document.createElement("link");
        link.rel = "prefetch";
        link.as = "image";
        link.href = asset.fullSrc;
        document.head.appendChild(link);

        const image = new Image();
        image.decoding = "async";
        image.src = asset.fullSrc;
        image.onload = () => {
          prefetchingRef.current.delete(asset.id);
          const readyState: AssetState = {
            ...stateRef.current[asset.id],
            status: "ready",
            message: "Prefetch complete — display is instantaneous.",
            image,
          };
          const updatedStates: Record<string, AssetState> = {
            ...stateRef.current,
            [asset.id]: readyState,
          };
          stateRef.current = updatedStates;
          setAssetStates(updatedStates);
        };
        image.onerror = () => {
          prefetchingRef.current.delete(asset.id);
          const errorState: AssetState = {
            ...stateRef.current[asset.id],
            status: "error",
            message: "Prefetch failed — fallback to preview.",
          };
          const updatedStates: Record<string, AssetState> = {
            ...stateRef.current,
            [asset.id]: errorState,
          };
          stateRef.current = updatedStates;
          setAssetStates(updatedStates);
        };
      }

      const loadingState: AssetState = {
        ...prev[asset.id],
        status: "loading",
        message: "Prefetching high-resolution image…",
      };
      const nextStates: Record<string, AssetState> = {
        ...prev,
        [asset.id]: loadingState,
      };
      stateRef.current = nextStates;
      return nextStates;
    });
  }, []);

  const handleReveal = useCallback(
    (asset: GalleryAsset) => {
      setActiveAssetId(asset.id);
      handlePrefetch(asset);
    },
    [handlePrefetch]
  );

  return (
    <section className={styles.gallery}>
      <div className={styles.intro}>
        <span className={styles.eyebrow}>Image Prefetching</span>
        <h3 className={styles.title}>Warm Hero Assets Before Navigation</h3>
        <p className={styles.copy}>
          Hover or tap on a card to instruct the browser to prefetch the
          associated high-resolution hero. When you click "Reveal", the asset is
          already in cache, so the large image displays without the perceptible
          loading flash.
        </p>
      </div>

      <div className={styles.grid}>
        {galleryAssets.map((asset) => {
          const state = assetStates[asset.id];
          const isActive = asset.id === activeAssetId;
          const previewSrc =
            isActive && activeImageSrc ? activeImageSrc : asset.previewSrc;

          return (
            <article
              key={asset.id}
              className={styles.card}
              onMouseEnter={() => handlePrefetch(asset)}
              onFocusCapture={() => handlePrefetch(asset)}
            >
              <div className={styles.preview}>
                <img src={previewSrc} alt={asset.title} loading="lazy" />
                <span className={styles.statusBadge}>
                  {statusLabel[state.status]}
                </span>
              </div>

              <h4 className={styles.cardTitle}>{asset.title}</h4>
              <p className={styles.cardCopy}>{asset.copy}</p>

              <div className={styles.actionRow}>
                <button
                  type="button"
                  className={styles.actionButton}
                  onClick={() => handleReveal(asset)}
                >
                  Reveal Image
                </button>
                <span
                  className={`${styles.statusText} ${statusClassMap[state.status]}`}
                >
                  {state.message}
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
