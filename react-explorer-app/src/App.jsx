import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import HomePage from "@/pages/home/HomePage";
import ReactHooksPage from "@/features/react-hooks/ReactHooksPage";
import StateManagementPage from "@/features/state-management/StateManagementPage";
import styles from "./App.module.css";
import SkeletonShowcasePage from "./features/ui-ux/skeleton/SkeletonShowcasePage.js";
import EfficientLoadingExamplesPage from "./features/efficient-loading/EfficientLoadingExamplesPage.js";
import EfficientLoadingMoreExamplesPage from "./features/efficient-loading/more-examples/EfficientLoadingMoreExamplesPage.js";
import EfficientFetchingExamplesPage from "./features/efficient-fetching/EfficientFetchingExamplesPage.js";
import WorkingWithFormsPage from "@/features/working-with-forms/WorkingWithFormsPage";

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
          to="/react-hooks-examples"
        >
          React Hooks
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.linkActive}` : styles.link
          }
          to="/state-management-examples"
        >
          State Management
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.linkActive}` : styles.link
          }
          to="/efficient-loading-examples"
        >
          Efficient Loading
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.linkActive}` : styles.link
          }
          to="/efficient-fetching-examples"
        >
          Efficient Fetching
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.linkActive}` : styles.link
          }
          to="/working-with-forms"
        >
          Forms
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.linkActive}` : styles.link
          }
          to="/skeleton-examples"
        >
          Skeleton
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/react-hooks-examples" element={<ReactHooksPage />} />
        <Route
          path="/state-management-examples"
          element={<StateManagementPage />}
        />
        <Route
          path="/efficient-loading-examples"
          element={<EfficientLoadingExamplesPage />}
        />
        <Route
          path="/efficient-loading-examples/more-examples"
          element={<EfficientLoadingMoreExamplesPage />}
        />
        <Route
          path="/efficient-fetching-examples"
          element={<EfficientFetchingExamplesPage />}
        />
        <Route path="/working-with-forms" element={<WorkingWithFormsPage />} />
        <Route
          path="/state-management-examples"
          element={<StateManagementPage />}
        />
        <Route path="/skeleton-examples" element={<SkeletonShowcasePage />} />
      </Routes>
    </BrowserRouter>
  );
}
