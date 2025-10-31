import { useEffect, useState, useRef } from "react";
import axios from "axios";

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

const LIMIT = 10;

export default function ScrollingListingPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  // Fetch products chunk
  const fetchProducts = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const res = await axios.get(`https://dummyjson.com/products`, {
        params: { limit: LIMIT, skip },
      });

      const newProducts: Product[] = res.data.products;
      setProducts((prev) => [...prev, ...newProducts]);

      // Stop if no more products
      if (newProducts.length < LIMIT) setHasMore(false);
      else setSkip((prev) => prev + LIMIT);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Observe the loader div
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          fetchProducts();
        }
      },
      { rootMargin: "200px" } // start prefetch before visible
    );

    const loader = loaderRef.current;
    if (loader) observer.observe(loader);

    return () => {
      if (loader) observer.unobserve(loader);
    };
  }, [hasMore, loading]);

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", fontFamily: "sans-serif" }}>
      <h2>Infinite Product List</h2>

      {products.map((product, index) => (
        <div
          key={product.id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            borderBottom: "1px solid #ddd",
            padding: "12px 0",
            opacity: 0.95,
            transition: "opacity 0.3s",
          }}
        >
          <img
            src={product.thumbnail}
            alt={product.title}
            width={60}
            height={60}
            loading="lazy"
            style={{ borderRadius: 8 }}
          />
          <div>
            <p style={{ margin: 0 }}>{index}</p>
            <p style={{ margin: 0 }}>{product.title}</p>
            <p style={{ margin: 0, color: "#555" }}>${product.price}</p>
          </div>
        </div>
      ))}

      {loading && <p>Loading more products...</p>}
      {!hasMore && <p>No more products to show.</p>}

      {/* Invisible sentinel element for observer */}
      <div ref={loaderRef} style={{ height: 1 }} />
    </div>
  );
}
