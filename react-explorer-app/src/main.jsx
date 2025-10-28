import { createRoot } from "react-dom/client";
import App from "@/App.jsx";
import { ThemeProvider } from "@/features/react-hooks/useContext/ThemeContext.jsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient.js";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "@/index.css";

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
    </ThemeProvider>
  </QueryClientProvider>
);