import { memo, useCallback, useMemo, useRef, useState } from "react";
import styles from "./ReactMemoExample.module.css";

interface Friend {
  id: number;
  name: string;
  role: string;
  favorite: boolean;
}

function createFriends(): Friend[] {
  const roles = [
    "Design Lead",
    "Product Manager",
    "Frontend Engineer",
    "Backend Engineer",
    "QA Specialist",
    "UX Researcher",
  ];

  return Array.from({ length: 12 }, (_, index) => ({
    id: index + 1,
    name: `Teammate ${index + 1}`,
    role: roles[index % roles.length],
    favorite: index % 3 === 0,
  }));
}

function useRenderCount() {
  const renderCountRef = useRef(0);
  renderCountRef.current += 1;
  return renderCountRef.current;
}

interface FriendRowProps {
  friend: Friend;
  isSelected: boolean;
  onSelect: (friendId: number) => void;
}

const FriendRow = memo(function FriendRow({
  friend,
  isSelected,
  onSelect,
}: FriendRowProps) {
  const renders = useRenderCount();
  const className = isSelected
    ? `${styles.friendButton} ${styles.friendButtonSelected}`
    : styles.friendButton;

  console.log({
    scope: "react-memo.demo",
    message: "Rendering FriendRow",
    friendName: friend.name,
    selected: isSelected,
  });

  return (
    <button type="button" className={className} onClick={() => onSelect(friend.id)}>
      <span className={styles.friendInfo}>
        <span className={styles.friendName}>{friend.name}</span>
        <span className={styles.friendMeta}>
          {friend.role}
          {friend.favorite ? " · Favorite collaborator" : ""}
        </span>
      </span>
      <span className={styles.renderCount}>Renders: {renders}</span>
    </button>
  );
});

export function ReactMemoExample() {
  const friends = useMemo(() => createFriends(), []);
  const [selectedFriendId, setSelectedFriendId] = useState<number>(friends[0]?.id ?? 1);
  const [searchTerm, setSearchTerm] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const filteredFriends = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) {
      return friends;
    }
    return friends.filter((friend) =>
      friend.name.toLowerCase().includes(query),
    );
  }, [friends, searchTerm]);

  const handleSelect = useCallback((friendId: number) => {
    setSelectedFriendId(friendId);
    console.log({
      scope: "react-memo.demo",
      message: "Selected friend changed",
      friendId,
    });
  }, []);

  const toggleTheme = () => {
    setTheme((current) => {
      const nextTheme = current === "light" ? "dark" : "light";
      console.log({
        scope: "react-memo.demo",
        message: "Theme toggled",
        nextTheme,
      });
      return nextTheme;
    });
  };

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <h3 className={styles.title}>React.memo keeps stable lists snappy</h3>
        <p className={styles.subtitle}>
          Filter teammates then toggle the app theme. The memoized rows only
          re-render when their own selection state changes, so render counts stay
          low even as the parent re-renders.
        </p>
      </header>

      <div className={styles.controls}>
        <label className={styles.controlGroup} htmlFor="memo-search">
          <span>Filter teammates</span>
          <input
            id="memo-search"
            className={styles.input}
            value={searchTerm}
            onChange={(event) => {
              const value = event.target.value;
              console.log({
                scope: "react-memo.demo",
                message: "Search term updated",
                value,
              });
              setSearchTerm(value);
            }}
            placeholder="Search by name..."
          />
        </label>

        <button type="button" className={styles.themeToggle} onClick={toggleTheme}>
          Toggle theme (current: {theme})
        </button>
      </div>

      <div className={styles.list}>
        {filteredFriends.map((friend) => (
          <FriendRow
            key={friend.id}
            friend={friend}
            isSelected={friend.id === selectedFriendId}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </article>
  );
}
