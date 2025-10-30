import { useState } from "react";
import styles from "./ReconcilliationSection.module.css";

type Guest = {
  id: string;
  name: string;
  role: string;
};

const overviewPoints = [
  "React reuses DOM nodes based on keys, so stable identifiers keep local state attached to the right item.",
  "Using array indices as keys breaks that contract whenever list order changes or items are inserted.",
  "Try reordering the guests below—notes stay with the same person only when their id is used as the key.",
];

const initialGuests: Guest[] = [
  { id: "ada", name: "Ada Lovelace", role: "Keynote" },
  { id: "grace", name: "Grace Hopper", role: "Panel" },
  { id: "linus", name: "Linus Torvalds", role: "Workshop" },
  { id: "margaret", name: "Margaret Hamilton", role: "Lightning talk" },
];

export function ReconcilliationSection() {
  const [guests, setGuests] = useState(initialGuests);

  const rotateGuests = () => {
    setGuests((prev) => {
      if (prev.length <= 1) {
        return prev;
      }

      const [first, ...rest] = prev;
      return [...rest, first];
    });
  };

  const reverseGuests = () => {
    setGuests((prev) => [...prev].reverse());
  };

  const resetGuests = () => {
    setGuests(initialGuests);
  };

  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>Reconciliation</span>
        <h2 className={styles.title}>Keep keys stable so state follows data</h2>
        <p className={styles.lead}>
          React reconciliation finds the minimum DOM changes by comparing keys.
          Stable keys make sure React reuses the right subtree, while index keys
          can cause state to hop between items after reordering.
        </p>
        <ul className={styles.bulletList}>
          {overviewPoints.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </header>

      <div className={styles.controls}>
        <button type="button" onClick={rotateGuests}>
          Rotate order
        </button>
        <button type="button" onClick={reverseGuests}>
          Reverse order
        </button>
        <button type="button" onClick={resetGuests}>
          Reset
        </button>
      </div>

      <div className={styles.examples}>
        <StableKeysCard guests={guests} />
        <IndexKeysCard guests={guests} />
      </div>
    </section>
  );
}

function StableKeysCard({ guests }: { guests: Guest[] }) {
  return (
    <article className={styles.card}>
      <header className={styles.cardHeader}>
        <h3>Stable keys (preferred)</h3>
        <p>
          Each guest keeps their personal note even as the list is reordered.
        </p>
      </header>
      <ul className={styles.guestList}>
        {guests.map((guest) => (
          <GuestRow key={guest.id} guest={guest} />
        ))}
      </ul>
    </article>
  );
}

function IndexKeysCard({ guests }: { guests: Guest[] }) {
  return (
    <article className={styles.card}>
      <header className={styles.cardHeader}>
        <h3>Index keys (buggy)</h3>
        <p className={styles.warning}>
          Type a note, then rotate the list—the note jumps to a different
          person because the DOM nodes are reused in place.
        </p>
      </header>
      <ul className={styles.guestList}>
        {guests.map((guest, index) => (
          <GuestRow key={index} guest={guest} />
        ))}
      </ul>
    </article>
  );
}

function GuestRow({ guest }: { guest: Guest }) {
  const [note, setNote] = useState("");

  return (
    <li className={styles.guestRow}>
      <div>
        <p className={styles.guestName}>{guest.name}</p>
        <p className={styles.guestRole}>{guest.role}</p>
      </div>
      <input
        className={styles.noteInput}
        value={note}
        onChange={(event) => setNote(event.target.value)}
        placeholder="Add a personal note"
        aria-label={`Personal note for ${guest.name}`}
      />
    </li>
  );
}
