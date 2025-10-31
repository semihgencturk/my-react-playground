import { useEffect, useState } from "react";
import axios from "axios";

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

const LIMIT = 10;

export default function PaginatedListingPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const totalPages = Math.ceil(total / LIMIT);

  const fetchProducts = async (pageNum: number) => {
    setLoading(true);
    try {
      const skip = (pageNum - 1) * LIMIT;
      const res = await axios.get("https://dummyjson.com/products", {
        params: { limit: LIMIT, skip },
      });

      setProducts(res.data.products);
      setTotal(res.data.total);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const goToPage = (num: number) => {
    if (num < 1 || num > totalPages) return;
    setPage(num);
  };

  // Build pagination range (like 1, 2, 3, ... 45)
  const getPagination = () => {
    const range: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) range.push(i);
    } else {
      if (page <= 4) range.push(1, 2, 3, 4, 5, "...", totalPages);
      else if (page >= totalPages - 3)
        range.push(
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      else range.push(1, "...", page - 1, page, page + 1, "...", totalPages);
    }
    return range;
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", fontFamily: "sans-serif" }}>
      <h2>Product List (Page {page})</h2>
      <p style={{ color: "#666" }}>
        Showing {LIMIT} per page — Total: {total} products
      </p>

      {loading && <p>Loading...</p>}

      {!loading &&
        products.map((product) => (
          <div
            key={product.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              borderBottom: "1px solid #ddd",
              padding: "12px 0",
            }}
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              width={60}
              height={60}
              style={{ borderRadius: 8 }}
              loading="lazy"
            />
            <div>
              <p style={{ margin: 0 }}>{product.title}</p>
              <p style={{ margin: 0, color: "#555" }}>${product.price}</p>
            </div>
          </div>
        ))}

      {/* Pagination bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 8,
          marginTop: 20,
          flexWrap: "wrap",
        }}
      >
        <button
          disabled={page === 1}
          onClick={() => goToPage(page - 1)}
          style={{
            padding: "6px 10px",
            borderRadius: 4,
            border: "1px solid #ccc",
            background: page === 1 ? "#eee" : "#fff",
            cursor: page === 1 ? "default" : "pointer",
          }}
        >
          Prev
        </button>

        {getPagination().map((num, i) =>
          typeof num === "string" ? (
            <span key={i} style={{ padding: "6px 8px" }}>
              {num}
            </span>
          ) : (
            <button
              key={i}
              onClick={() => goToPage(num)}
              style={{
                padding: "6px 10px",
                borderRadius: 4,
                border: "1px solid #ccc",
                background: num === page ? "#007bff" : "#fff",
                color: num === page ? "#fff" : "#000",
                cursor: "pointer",
              }}
            >
              {num}
            </button>
          )
        )}

        <button
          disabled={page === totalPages}
          onClick={() => goToPage(page + 1)}
          style={{
            padding: "6px 10px",
            borderRadius: 4,
            border: "1px solid #ccc",
            background: page === totalPages ? "#eee" : "#fff",
            cursor: page === totalPages ? "default" : "pointer",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
