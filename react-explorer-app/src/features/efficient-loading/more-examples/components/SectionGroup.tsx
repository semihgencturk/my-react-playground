import { type ReactNode } from "react";
import styles from "../efficientLoadingMoreExamplesPage.module.css";

type SectionGroupVariant = "primary" | "secondary" | "tertiary" | "quaternary";

type SectionGroupProps = {
  title: string;
  description: string;
  variant?: SectionGroupVariant;
  children: ReactNode;
};

const variantClassMap: Record<SectionGroupVariant, string> = {
  primary: styles.sectionGroupPrimary,
  secondary: styles.sectionGroupSecondary,
  tertiary: styles.sectionGroupTertiary,
  quaternary: styles.sectionGroupQuaternary,
};

export default function SectionGroup({
  title,
  description,
  variant = "primary",
  children,
}: SectionGroupProps) {
  const variantClass = variantClassMap[variant];

  return (
    <section className={`${styles.sectionGroup} ${variantClass}`}>
      <div className={styles.spacer}>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      {children}
    </section>
  );
}
