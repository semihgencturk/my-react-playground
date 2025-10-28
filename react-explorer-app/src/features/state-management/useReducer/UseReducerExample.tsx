// ReducerExample.tsx
import { useReducer } from "react";
import styles from "../stateManagement.module.css";

// --- STATE + ACTION TYPES ---
interface State {
  updateCount: number;
  userName: string;
}

type Action =
  | { type: "UPDATE_NAME"; newUserName: string }
  | { type: "GET_INITIAL_NAME" };

const initialState: State = {
  updateCount: 0,
  userName: "Initial Name",
};

// --- REDUCER ---
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "UPDATE_NAME":
      return {
        updateCount: state.updateCount + 1,
        userName: action.newUserName,
      };
    case "GET_INITIAL_NAME":
      return { ...state, userName: initialState.userName };
    default:
      return state;
  }
}

// --- PROPS INTERFACE ---
interface UserProps {
  userName: string;
  updateCount: number;
  onUpdate: (newName: string) => void;
  onGetInitialName: () => void;
}

// --- PARENT COMPONENT ---
export default function UseReducerExample() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleUpdate = (newName: string) =>
    dispatch({ type: "UPDATE_NAME", newUserName: newName });

  const handleGetInitialName = () => dispatch({ type: "GET_INITIAL_NAME" });

  return (
    <div className={styles.card}>
      <span className={styles.badge}>useReducer</span>
      <h3 className={styles.stackTitle}>Reducer Powered Prop Drilling</h3>
      <p className={styles.textMuted}>
        A reducer centralises updates and shares a single dispatch path through
        the component tree.
      </p>

      <div className={styles.statStack}>
        <div className={styles.statRow}>
          <span className={styles.statLabel}>Current Name</span>
          <span className={styles.statValue}>{state.userName}</span>
        </div>
        <div className={styles.statRow}>
          <span className={styles.statLabel}>Update Count</span>
          <span className={styles.statValue}>{state.updateCount}</span>
        </div>
      </div>

      <div className={styles.buttons}>
        <button
          className={styles.button}
          onClick={() => handleUpdate("new Name")}
        >
          Update from Parent
        </button>
        <button
          className={`${styles.button} ${styles.buttonGhost}`}
          onClick={handleGetInitialName}
        >
          Get Initial Name
        </button>
      </div>

      <div className={styles.nestedStack}>
        <Child
          userName={state.userName}
          updateCount={state.updateCount}
          onUpdate={handleUpdate}
          onGetInitialName={handleGetInitialName}
        />
      </div>
    </div>
  );
}

// --- CHILD COMPONENTS ---
function Child({
  userName,
  updateCount,
  onUpdate,
  onGetInitialName,
}: UserProps) {
  return (
    <div className={`${styles.nestedCard} ${styles.nestedCardLevel2}`}>
      <h4 className={styles.stackTitle}>Child Component</h4>
      <p className={styles.textMuted}>
        Receives the same reducer bindings and forwards them to descendants.
      </p>
      <GrandChild
        userName={userName}
        updateCount={updateCount}
        onUpdate={onUpdate}
        onGetInitialName={onGetInitialName}
      />
    </div>
  );
}

function GrandChild({
  userName,
  updateCount,
  onUpdate,
  onGetInitialName,
}: UserProps) {
  return (
    <div className={`${styles.nestedCard} ${styles.nestedCardLevel3}`}>
      <h4 className={styles.stackTitle}>Grand Child Component</h4>
      <p className={styles.textMuted}>
        Still relies on the parent's reducer but does not own the state.
      </p>
      <GrandGrandChild
        userName={userName}
        updateCount={updateCount}
        onUpdate={onUpdate}
        onGetInitialName={onGetInitialName}
      />
    </div>
  );
}

function GrandGrandChild({
  userName,
  updateCount,
  onUpdate,
  onGetInitialName,
}: UserProps) {
  return (
    <div className={`${styles.nestedCard} ${styles.nestedCardLevel4}`}>
      <p className={styles.stackTitle}>
        Grand Grand Child: {userName} ({updateCount})
      </p>
      <p className={styles.textMuted}>
        Dispatching from the deepest node still flows through the single reducer
        above.
      </p>
      <div className={styles.buttons}>
        <button className={styles.button} onClick={() => onUpdate("new Name")}>
          Update From Grand Grand Child
        </button>
        <button
          className={`${styles.button} ${styles.buttonGhost}`}
          onClick={onGetInitialName}
        >
          Get Initial Name
        </button>
      </div>
    </div>
  );
}
