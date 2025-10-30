import { FeatureItem } from "./components/FeatureItem.js";
import { SectionCard } from "./components/SectionCard.js";
import styles from "./HomePage.module.css";

export default function HomePage() {
  const heroHighlights = [
    {
      title: "Trace every render",
      description:
        "Trigger interactions and watch the console log render counts and effect lifecycles in real time.",
    },
    {
      title: "Inspect live data",
      description:
        "Open the network tab to see React Query requests as examples refetch and cache responses.",
    },
    {
      title: "Stress-test performance",
      description:
        "Try memoized computations, Web Worker offloading, and virtualization demos to feel how React handles heavy workloads.",
    },
  ];

  const highlightCards = [
    {
      title: "Interactive React Demos",
      description:
        "Jump into hooks, state management, and design experiments already in the project. Each card gives you a live playground for the concept.",
    },
    {
      title: "DevTools Walkthroughs",
      description:
        "Follow the cues to open the console, network tab, or profiler so you can observe renders, data fetching, and effect lifecycles as they happen.",
    },
    {
      title: "Side-by-Side Patterns",
      description:
        "Compare legacy and modern React approaches in one place so you can feel the ergonomics before adopting them in your next project.",
    },
    {
      title: "Performance Playgrounds",
      description:
        "Explore concurrency, memoization, conditional mounting, and keyed reconciliation to see how small tweaks keep UIs responsive.",
    },
  ];

  const currentFeatures = [
    {
      title: "React Hooks Showdowns",
      detail:
        "Pit class lifecycles against hook-driven state, effects, refs, memoization, and layout effects.",
    },
    {
      title: "State Management Journeys",
      detail:
        "Walk from local state through prop drilling, reducers, and a shared Zustand store.",
    },
    {
      title: "Dynamic Loading Strategies",
      detail:
        "Experiment with dynamic imports, React.lazy, preload hints, prefetching, and deferred widgets.",
    },
    {
      title: "Data Fetching Labs",
      detail:
        "Inspect React Query fundamentals, hover-driven prefetch dashboards, and static asset warmups.",
    },
    {
      title: "Skeleton UX Patterns",
      detail:
        "Watch skeleton screens reserve layout and shimmer while slower API responses resolve.",
    },
    {
      title: "Working With Forms",
      detail:
        "Hands-on React Hook Form examples wired with Hookform Resolver and Zod validation.",
    },
    {
      title: "Efficient Rendering Playgrounds",
      detail:
        "Experiment with transition APIs, deferred values, memoized heavy work, Web Workers, and keyed lists that expose reconciliation gotchas.",
    },
  ];

  const upcomingItems = [
    {
      title: "Code Snippet Library",
      description:
        "The next iteration will add inline snippets and callouts so you can copy the patterns straight into your codebase.",
    },
    {
      title: "Deeper Coverage",
      description:
        "More React Query, performance tooling, and UI pattern explorations are queued to broaden the playground.",
    },
  ];

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.eyebrow}>React Playground</span>
          <h1 className={styles.title}>Explore React Features Live</h1>
          <p className={styles.lead}>
            A focused web app that lets you trial React hooks, state models, and
            UI patterns side by side. Launch an example, flip open the console
            or network tab, and watch how each feature behaves in real time.
          </p>
          <div className={styles.heroActions}>
            <a className={styles.primaryAction} href="#explore">
              Start exploring
            </a>
            <span className={styles.secondaryAction}>
              Open DevTools to trace renders, network calls, and cached data.
            </span>
          </div>
        </div>
        <div className={styles.heroHighlights}>
          <h2 className={styles.heroHighlightsTitle}>
            What you&apos;ll observe
          </h2>
          {heroHighlights.map((item) => (
            <SectionCard
              key={item.title}
              title={item.title}
              description={item.description}
              headingLevel="h3"
              containerClassName={styles.heroHighlightCard}
              titleClassName={styles.heroHighlightHeading}
              descriptionClassName={styles.heroHighlightCopy}
            />
          ))}
        </div>
      </section>

      <section className={styles.section} id="explore">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Hands-on scenarios</h2>
          <p className={styles.sectionLead}>
            Compare hooks, state patterns, and UI experiments while the
            playground guides you to the console and network panels for
            additional insight.
          </p>
        </div>
        <div className={styles.sectionGrid}>
          {highlightCards.map((card) => (
            <SectionCard
              key={card.title}
              title={card.title}
              description={card.description}
              containerClassName={styles.card}
              titleClassName={styles.cardTitle}
              descriptionClassName={styles.cardCopy}
            />
          ))}
        </div>
      </section>

      <section className={styles.splitSection}>
        <div className={styles.splitColumn}>
          <h2 className={styles.sectionTitle}>Current features</h2>
          <p className={styles.sectionLead}>
            Everything listed here is already live and ready for deep-diving in
            the app today.
          </p>
          <div className={styles.featurePanel}>
            <ul className={styles.list}>
              {currentFeatures.map((feature) => (
                <FeatureItem
                  key={feature.title}
                  title={feature.title}
                  detail={feature.detail}
                />
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.splitColumn}>
          <h2 className={styles.sectionTitle}>Up next</h2>
          <p className={styles.sectionLead}>
            A quick look at what the next iteration will add on top of the
            current demos.
          </p>
          <div className={styles.upcomingGrid}>
            {upcomingItems.map((item) => (
              <SectionCard
                key={item.title}
                title={item.title}
                description={item.description}
                headingLevel="h3"
                containerClassName={styles.roadmapCard}
                titleClassName={styles.roadmapTitle}
                descriptionClassName={styles.roadmapCopy}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
