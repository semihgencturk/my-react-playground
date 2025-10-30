export function syncFunction(id: number) {
  console.log(`🔹 Sync function ${id} started`);

  // Simulate heavy blocking work (CPU loop)
  const start = Date.now();
  while (Date.now() - start < 2000) {
    // 2 seconds of blocking
  }

  console.log(`✅ Sync function ${id} finished`);
}