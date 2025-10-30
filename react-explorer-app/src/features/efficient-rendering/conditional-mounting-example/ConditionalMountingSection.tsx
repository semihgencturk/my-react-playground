import { useState } from "react";
import styles from "./ConditionalMountingExample.module.css";

function ExpensiveChart() {
  console.log("ExpensiveChart mounted!");
  return <div className={styles.chart}>📊 Heavy chart component</div>;
}

export default function ConditionalMountingSection() {
  const [showChart, setShowChart] = useState(false);

  return (
    <div className={styles.container}>
      <h2>Conditional Mounting</h2>

      <button onClick={() => setShowChart((prev) => !prev)}>
        {showChart ? "Hide Chart" : "Show Chart"}
      </button>

      {/* Conditional mounting: component is created/destroyed */}
      {showChart && <ExpensiveChart />}

      {/* Alternative: conditional rendering (but always mounted) */}
      {/* <ExpensiveChart style={{ display: showChart ? "block" : "none" }} /> */}
    </div>
  );
}
