import { useQuery } from "@tanstack/react-query";

async function fetchUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) throw new Error("Network error");
  return res.json();
}

export default function JsxExample() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["usersJsx"],
    queryFn: fetchUsers,
    staleTime: 1 * 60 * 1000, // 1 minute
  });

  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <section>
      <h2>Users</h2>
      <ul>
        {data.map((u) => (
          <li key={u.id}>{u.name}</li>
        ))}
      </ul>
    </section>
  );
}