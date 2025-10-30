export function fakeApiCall(task: string, delayMs = 2000): Promise<string> {
  console.log(`🚀 [${task}] started (will take ${delayMs / 1000}s)`);

  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`✅ [${task}] completed`);
      resolve(`${task} result`);
    }, delayMs);
  });
}

export function fakeApiCallWithErorPropagation(task: string, delayMs = 1000): Promise<string> {
  console.log(`🚀 [${task}] started (will take ${delayMs / 1000}s)`);
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (task === "FailExample") reject(new Error(`${task} failed`));
      else {
        console.log(`✅ [${task}] completed`); 
        resolve(`${task} ok`)
      };
    }, delayMs);
  });
}

type CancelFn = () => void;

export interface CancelRef {
  cancelled: boolean;
  register(cancelFn: CancelFn): () => void;
  cancel(): void;
  reset(): void;
}

export function createCancelRef(): CancelRef {
  const cancelFns = new Set<CancelFn>();
  const ref: CancelRef = {
    cancelled: false,
    register(cancelFn: CancelFn) {
      cancelFns.add(cancelFn);
      return () => cancelFns.delete(cancelFn);
    },
    cancel() {
      if (ref.cancelled) return;
      ref.cancelled = true;
      cancelFns.forEach((cancelFn) => cancelFn());
      cancelFns.clear();
    },
    reset() {
      ref.cancelled = false;
      cancelFns.clear();
    },
  };

  return ref;
}

export function cancellableTask(name: string, delayMs: number, cancelRef: CancelRef) {
  return new Promise<string>((resolve) => {
    if (cancelRef.cancelled) {
      resolve(`${name} cancelled before start`);
      return;
    }

    let settled = false;
    let unregister: () => void = () => {};

    const finalize = (result: string) => {
      if (settled) return;
      settled = true;
      unregister();
      resolve(result);
    };

    const timer = setTimeout(() => {
      clearTimeout(timer);
      if (cancelRef.cancelled) {
        finalize(`${name} cancelled`);
        return;
      }
      finalize(`${name} done`);
    }, delayMs);

    unregister = cancelRef.register(() => {
      clearTimeout(timer);
      finalize(`${name} cancelled`);
    });
  });
}
