import { useMemo, useState } from "react";

export default function MemoizedComputation() {
  const [count, setCount] = useState(0);

  // Expensive calculation — simulated with a loop
  const heavyResult = useMemo(() => {
    console.log("Running heavy computation...");
    let total = 0;
    for (let i = 0; i < 1e7; i++) {
      total += i;
    }
    return total;
  }, []); // Runs only once

  return (
    <div>
      <p>Heavy computation result: {heavyResult}</p>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
