import { useState, type CSSProperties } from "react";
import styles from "../stateManagement.module.css";

const THEMES = {
  light: {
    surface:
      "linear-gradient(155deg, rgba(255, 255, 255, 0.98), rgba(248, 250, 252, 0.95))",
    text: "#0f172a",
    heading: "#0f172a",
    muted: "#475569",
    border: "rgba(148, 163, 184, 0.35)",
    badgeBg: "rgba(37, 99, 235, 0.12)",
    badgeColor: "#2563eb",
    buttonBg: "transparent",
    buttonColor: "#1e293b",
    buttonBorder: "none",
    buttonShadow: "none",
    buttonHoverBg: "rgba(99, 102, 241, 0.08)",
    buttonHoverColor: "#4338ca",
    buttonHoverShadow: "0 16px 34px rgba(99, 102, 241, 0.18)",
    buttonGhostBorder: "rgba(148, 163, 184, 0.55)",
    buttonGhostHoverBorder: "rgba(99, 102, 241, 0.6)",
  },
  dark: {
    surface:
      "linear-gradient(160deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.92))",
    text: "#f8fafc",
    heading: "#f8fafc",
    muted: "rgba(226, 232, 240, 0.78)",
    border: "rgba(148, 163, 184, 0.45)",
    badgeBg: "rgba(148, 163, 184, 0.32)",
    badgeColor: "#e0f2fe",
    buttonBg: "rgba(51, 65, 85, 0.35)",
    buttonColor: "#f8fafc",
    buttonBorder: "none",
    buttonShadow: "0 12px 28px rgba(15, 23, 42, 0.35)",
    buttonHoverBg: "rgba(99, 102, 241, 0.4)",
    buttonHoverColor: "#f8fafc",
    buttonHoverShadow: "0 18px 36px rgba(59, 130, 246, 0.4)",
    buttonGhostBorder: "rgba(165, 180, 252, 0.55)",
    buttonGhostHoverBorder: "rgba(165, 180, 252, 0.95)",
  },
} as const;

type ThemeName = keyof typeof THEMES;

export default function UseStateExample() {
  const [themeName, setThemeName] = useState<ThemeName>("light");
  const theme = THEMES[themeName];

  const toggleTheme = () => {
    setThemeName((prev) => (prev === "light" ? "dark" : "light"));
  };

  const isLight = themeName === "light";

  const cardStyle = {
    background: theme.surface,
    color: theme.text,
    border: `1px solid ${theme.border}`,
    "--theme-text-strong": theme.heading,
    "--theme-muted": theme.muted,
    "--theme-badge-bg": theme.badgeBg,
    "--theme-badge-color": theme.badgeColor,
    "--theme-button-bg": theme.buttonBg,
    "--theme-button-color": theme.buttonColor,
    "--theme-button-border": theme.buttonBorder,
    "--theme-button-shadow": theme.buttonShadow,
    "--theme-button-hover-bg": theme.buttonHoverBg,
    "--theme-button-hover-color": theme.buttonHoverColor,
    "--theme-button-hover-shadow": theme.buttonHoverShadow,
    "--theme-button-ghost-border": theme.buttonGhostBorder,
    "--theme-button-ghost-hover-border": theme.buttonGhostHoverBorder,
  } as CSSProperties;

  return (
    <div className={`${styles.card} ${styles.themeCard}`} style={cardStyle}>
      <span className={styles.badge}>useState</span>
      <h3 className={styles.stackTitle}>
        Current Theme: {isLight ? "Light" : "Dark"}
      </h3>
      <p className={styles.textMuted}>
        Local component state flips between two theme presets and updates the UI
        instantly.
      </p>

      <div className={styles.buttons}>
        <button
          className={`${styles.button} ${styles.buttonGhost}`}
          onClick={toggleTheme}
        >
          Toggle Theme
        </button>
      </div>
    </div>
  );
}
