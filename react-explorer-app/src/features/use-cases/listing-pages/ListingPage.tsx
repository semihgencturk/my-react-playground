import { Link } from "react-router";

const styles = {
  container: "min-h-screen flex flex-col items-center bg-gray-50 p-8 gap-20",
  section:
    "flex flex-col items-center bg-blue-100 p-8 border border-navy-300 rounded-md",
  notice:
    "bg-yellow-100 text-yellow-800 border border-yellow-300 rounded-md p-4 mb-8 text-sm max-w-2xl",
  title: "text-2xl font-semibold mb-6 text-gray-800",
  linkWrapper: "flex flex-col gap-4 w-full max-w-sm",
  linkBase:
    "block w-full text-center text-white font-medium py-3 rounded-lg shadow transition-all",
  paginatedLink: "bg-blue-600 hover:bg-blue-700",
  scrollingLink: "bg-green-600 hover:bg-green-700",
};

export default function ListingOptions() {
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <div className={styles.notice}>
          <strong>Note:</strong> The following examples use <code>Axios</code>{" "}
          only — no React Query or caching optimizations are included. In a
          real-world app, you might start fetching data on mouse enter or hover
          events, or cache results with React Query to avoid repeated API calls.
          They are highly recommended to improve the performance of app, user
          exprience and reducing the cost of API calls. Too examine react query
          go to react query tab or move to the following sections in the page
        </div>

        <h1 className={styles.title}>Non-Optimized Listing Options</h1>
        <div className={styles.linkWrapper}>
          <Link
            to="/paginated-listing-page"
            className={`${styles.linkBase} ${styles.paginatedLink}`}
          >
            Paginated Listing Page
          </Link>
          <Link
            to="/scrolling-listing-page"
            className={`${styles.linkBase} ${styles.scrollingLink}`}
          >
            Scrolling Listing Page
          </Link>
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.notice}>
          <strong>Note:</strong> The following examples, optimizations for
          non-freezing UI and caching optimizations are included
        </div>

        <h1 className={styles.title}>Optimized Listing Options</h1>
      </section>
    </div>
  );
}
