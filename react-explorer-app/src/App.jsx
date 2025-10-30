import { useState } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import styles from "./App.module.css";
import HomePage from "@/pages/home/HomePage";
import ReactHooksPage from "@/features/react-hooks/ReactHooksPage";
import StateManagementPage from "@/features/state-management/StateManagementPage";
import SkeletonShowcasePage from "./features/ui-ux/skeleton/SkeletonShowcasePage.js";
import EfficientLoadingExamplesPage from "./features/efficient-loading/EfficientLoadingExamplesPage.js";
import EfficientLoadingMoreExamplesPage from "./features/efficient-loading/more-examples/EfficientLoadingMoreExamplesPage.js";
import EfficientFetchingExamplesPage from "./features/efficient-fetching/EfficientFetchingExamplesPage.js";
import EfficientRenderingPage from "@/features/efficient-rendering/EfficientRenderingPage";
import WorkingWithFormsPage from "@/features/working-with-forms/WorkingWithFormsPage";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home", end: true },
    { to: "/react-hooks-examples", label: "React Hooks" },
    { to: "/state-management-examples", label: "State Management" },
    { to: "/efficient-loading-examples", label: "Efficient Loading" },
    { to: "/efficient-fetching-examples", label: "Efficient Fetching" },
    { to: "/efficient-rendering-examples", label: "Efficient Rendering" },
    { to: "/working-with-forms", label: "Forms" },
    { to: "/skeleton-examples", label: "Skeleton" },
  ];

  const getLinkClassName = ({ isActive }) =>
    isActive ? `${styles.link} ${styles.linkActive}` : styles.link;

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <BrowserRouter>
      <nav className={styles.navbar}>
        <button
          type="button"
          className={styles.menuToggle}
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <span className={styles.menuToggleLabel}>
            {isMenuOpen ? "Close" : "Menu"}
          </span>
          <span className={styles.menuIcon} aria-hidden />
        </button>

        <div
          id="primary-navigation"
          className={`${styles.links} ${
            isMenuOpen ? styles.linksOpen : ""
          }`}
        >
          {navLinks.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={getLinkClassName}
              onClick={handleCloseMenu}
            >
              {label}
            </NavLink>
          ))}
        </div>
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
        <Route
          path="/efficient-rendering-examples"
          element={<EfficientRenderingPage />}
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
