import { useQuery } from "@tanstack/react-query";

// Define the shape of a user from the API
interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

// Fetch function typed with a return type
async function fetchUsers(): Promise<User[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
}

export default function TsxExample() {
  // useQuery automatically infers types from fetchUsers
  const { data, error, isLoading } = useQuery<User[]>({
    queryKey: ["usersTsx"],
    queryFn: fetchUsers,
    staleTime: 1 * 60 * 1000, // 1 minute
  });

  if (isLoading) return <p>Loading users...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  return (
    <section className="p-4">
      <h2 className="text-2xl font-bold mb-3">Users</h2>
      <ul className="space-y-2">
        {data?.map((user) => (
          <li
            key={user.id}
            className="border-b border-gray-300 pb-2 flex flex-col"
          >
            <span className="font-medium">{user.name}</span>
            <span className="text-sm text-gray-500">{user.email}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
