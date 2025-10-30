self.onmessage = (e) => {
  const num = e.data;
  let total = 0;
  for (let i = 0; i < num; i++) total += Math.sqrt(i);
  self.postMessage(total);
};
