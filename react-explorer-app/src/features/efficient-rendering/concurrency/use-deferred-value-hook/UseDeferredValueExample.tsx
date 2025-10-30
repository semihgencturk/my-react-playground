import {
  type ChangeEvent,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from "react";
import styles from "./UseDeferredValueExample.module.css";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
}

const PRODUCT_COUNT = 2000;
const RESULT_LIMIT = 20;

const categories = [
  "Productivity",
  "Design",
  "Security",
  "Analytics",
  "Collaboration",
  "Automation",
  "Finance",
  "Operations",
];

function createProductCatalog(): Product[] {
  return Array.from({ length: PRODUCT_COUNT }, (_, index) => {
    const id = index + 1;
    const category = categories[index % categories.length];
    const basePrice = 9 + (index % 40) * 3;

    return {
      id,
      name: `Product ${id}`,
      category,
      price: basePrice + Math.floor(Math.random() * 20),
    };
  });
}

function expensiveFilter(products: Product[], term: string) {
  const normalizedTerm = term.trim().toLowerCase();
  if (!normalizedTerm) {
    return products;
  }

  const delayUntil = Date.now() + 120;
  // Simulate CPU work by spinning briefly.
  while (Date.now() < delayUntil) {
    // busy wait
  }

  return products.filter((product) => {
    const name = product.name.toLowerCase();
    const category = product.category.toLowerCase();
    return name.includes(normalizedTerm) || category.includes(normalizedTerm);
  });
}

export function UseDeferredValueExample() {
  const allProducts = useMemo(() => createProductCatalog(), []);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | "all">("all");

  const deferredQuery = useDeferredValue(query);
  const deferredCategory = useDeferredValue(activeCategory);

  useEffect(() => {
    if (query !== deferredQuery) {
      console.log({
        scope: "useDeferredValue.demo",
        message: "UI ahead of deferred query",
        visibleQuery: query,
        deferredQuery,
      });
    }
  }, [query, deferredQuery]);

  useEffect(() => {
    if (activeCategory !== deferredCategory) {
      console.log({
        scope: "useDeferredValue.demo",
        message: "UI ahead of deferred category",
        visibleCategory: activeCategory,
        deferredCategory,
      });
    }
  }, [activeCategory, deferredCategory]);

  const filteredProducts = useMemo(() => {
    const byCategory =
      deferredCategory === "all"
        ? allProducts
        : allProducts.filter(
            (product) =>
              product.category.toLowerCase() === deferredCategory.toLowerCase()
          );

    console.log({
      scope: "useDeferredValue.demo",
      message: "Filtering with deferred values",
      deferredQuery,
      deferredCategory,
      sourceSize: byCategory.length,
    });

    const result = expensiveFilter(byCategory, deferredQuery).slice(
      0,
      RESULT_LIMIT
    );

    console.log({
      scope: "useDeferredValue.demo",
      message: "Filtered results ready",
      resultCount: result.length,
    });

    return result;
  }, [allProducts, deferredCategory, deferredQuery]);

  const pending =
    filteredProducts.length === 0 &&
    (deferredQuery || deferredCategory !== "all");

  useEffect(() => {
    console.log({
      scope: "useDeferredValue.demo",
      message: "Pending state changed",
      pending,
      visibleQuery: query,
      deferredQuery,
      visibleCategory: activeCategory,
      deferredCategory,
    });
  }, [
    pending,
    query,
    deferredQuery,
    activeCategory,
    deferredCategory,
  ]);

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    console.log({
      scope: "useDeferredValue.demo",
      message: "Query changed",
      value,
    });
    setQuery(value);
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    console.log({
      scope: "useDeferredValue.demo",
      message: "Category changed",
      value,
    });
    setActiveCategory(value);
  };

  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <h3 className={styles.title}>
          useDeferredValue keeps search types responsive
        </h3>
        <p className={styles.lead}>
          Type into the search box and flip category filters while the list
          performs a simulated heavy filter. The input reflects keystrokes
          immediately, and the deferred results update once the expensive work
          catches up.
        </p>
      </header>

      <div className={styles.toolbar}>
        <label className={styles.controlGroup} htmlFor="product-search">
          <span>Search catalog</span>
          <input
            id="product-search"
            className={styles.input}
            value={query}
            onChange={handleQueryChange}
            placeholder="Search products or categories..."
            aria-describedby="deferred-status"
          />
        </label>

        <label className={styles.controlGroup} htmlFor="product-category">
          <span>Filter by category</span>
          <select
            id="product-category"
            className={styles.input}
            value={activeCategory}
            onChange={handleCategoryChange}
          >
            <option value="all">All categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className={styles.statusRow}>
        <span
          className={
            pending
              ? `${styles.statusBadge} ${styles.pending}`
              : styles.statusBadge
          }
        >
          {pending ? "Result list catching up..." : "Results synced"}
        </span>
        <span id="deferred-status">
          Showing up to {RESULT_LIMIT} products matching the deferred search
          term and category.
        </span>
      </div>

      <div className={styles.lists}>
        <div className={styles.listCard}>
          <h4 className={styles.listTitle}>Live input</h4>
          <p className={styles.listMeta}>
            Query: <strong>{query || "—"}</strong> · Category:{" "}
            <strong>{activeCategory}</strong>
          </p>
        </div>

        <div className={styles.listCard}>
          <h4 className={styles.listTitle}>Deferred results</h4>
          <p className={styles.listMeta}>
            Query: <strong>{deferredQuery || "—"}</strong> · Category:{" "}
            <strong>{deferredCategory}</strong>
          </p>
          <ul className={styles.resultList}>
            {filteredProducts.map((product) => (
              <li key={product.id} className={styles.resultItem}>
                {product.name} · ${product.price} · {product.category}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
