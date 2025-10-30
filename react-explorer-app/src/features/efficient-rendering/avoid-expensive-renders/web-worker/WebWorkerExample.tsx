import { useEffect, useState } from "react";

export default function WebWorkerExample() {
  const [result, setResult] = useState<number | null>(null);
  const [isWorking, setIsWorking] = useState(false);

  useEffect(() => {
    const worker = new Worker(new URL("./heavyWorker.js", import.meta.url));

    worker.onmessage = (e) => {
      setResult(e.data);
      setIsWorking(false);
    };

    setIsWorking(true);
    worker.postMessage(1e7); // Send data to worker

    return () => worker.terminate();
  }, []);

  return <div>{isWorking ? <p>Computing...</p> : <p>Result: {result}</p>}</div>;
}
