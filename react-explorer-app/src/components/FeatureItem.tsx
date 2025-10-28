import type { ReactNode } from "react";
import styles from "./FeatureItem.module.css";

interface FeatureItemProps {
  title: string;
  detail: string;
  icon?: ReactNode;
}

export function FeatureItem({ title, detail, icon }: FeatureItemProps) {
  return (
    <li className={styles.item}>
      <div className={styles.header}>
        <span className={styles.icon} aria-hidden="true">
          {icon ?? (
            <svg viewBox="0 0 16 16" width="12" height="12" role="img">
              <path
                fill="currentColor"
                d="M6.5 10.793 3.354 7.646a.5.5 0 0 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l6.5-6.5a.5.5 0 1 0-.708-.708L6.5 10.793Z"
              />
            </svg>
          )}
        </span>
        <span>{title}</span>
      </div>
      <p className={styles.detail}>{detail}</p>
    </li>
  );
}
