import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import HomePage from "@/pages/home/HomePage";
import ReactHooksPage from "@/features/react-hooks/ReactHooksPage";
import StateManagementPage from "@/features/state-management/StateManagementPage";
import styles from "./App.module.css";
import ReactQueryExample from "./features/react-query/ReactQueryExample";

export default function App() {
  return (
    <BrowserRouter>
      <nav className={styles.navbar}>
        <NavLink
          end
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.linkActive}` : styles.link
          }
          to="/"
        >
          Home
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.linkActive}` : styles.link
          }
          to="/react-query-examples"
        >
          React Query Examples
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.linkActive}` : styles.link
          }
          to="/react-hooks-examples"
        >
          React Hooks Examples
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.linkActive}` : styles.link
          }
          to="/state-management-examples"
        >
          State Management Examples
        </NavLink>

      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/react-query-examples" element={<ReactQueryExample/>} />
        <Route path="/react-hooks-examples" element={<ReactHooksPage />} />
        <Route path="/state-management-examples" element={<StateManagementPage />} />
      </Routes>
    </BrowserRouter>
  );
}
