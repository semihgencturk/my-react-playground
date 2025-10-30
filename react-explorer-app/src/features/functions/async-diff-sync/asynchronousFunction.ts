export function asyncFunction(id: number) {
  console.log(`🔸 Async function ${id} started`);

  setTimeout(() => {
    console.log(`✅ Async function ${id} finished`);
  }, 2000);
}