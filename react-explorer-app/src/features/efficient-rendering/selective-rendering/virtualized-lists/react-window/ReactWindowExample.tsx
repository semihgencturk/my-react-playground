import { useMemo, useState } from "react";
import {
  Grid,
  List,
  type CellComponentProps,
  type RowComponentProps,
} from "react-window";
import styles from "./ReactWindowExample.module.css";

interface LogEntry {
  id: number;
  severity: "info" | "warn" | "error";
  message: string;
}

const TOTAL_ROWS = 5000;
const ROW_HEIGHT = 52;
const GRID_ROWS = 160;
const GRID_COLUMNS = 32;
const GRID_ROW_HEIGHT = 44;
const GRID_COLUMN_WIDTH = 96;
const GRID_VISIBLE_ROWS = 7;

function createLogDataset(): LogEntry[] {
  const severities: Array<LogEntry["severity"]> = ["info", "warn", "error"];

  return Array.from({ length: TOTAL_ROWS }, (_, index) => {
    const id = index + 1;
    const severity = severities[index % severities.length];

    return {
      id,
      severity,
      message: `Log message #${id} generated at ${new Date()
        .toISOString()
        .slice(11, 19)}`,
    };
  });
}

function createHeatmapDataset(
  rows: number,
  columns: number,
): Array<Array<number>> {
  return Array.from({ length: rows }, (_, rowIndex) =>
    Array.from({ length: columns }, (_, columnIndex) => {
      const wave =
        Math.sin(rowIndex / 4) * 0.35 + Math.cos(columnIndex / 5) * 0.4;
      const trend = (rowIndex / rows) * 0.5 + (columnIndex / columns) * 0.45;
      const rawValue = 48 + wave * 40 + trend * 55;
      return Math.max(0, Math.min(100, Math.round(rawValue)));
    }),
  );
}

function getSeverityLabel(severity: LogEntry["severity"]) {
  switch (severity) {
    case "info":
      return "Info";
    case "warn":
      return "Warning";
    case "error":
      return "Error";
    default:
      return "Info";
  }
}

export function ReactWindowExample() {
  const [visibleRows, setVisibleRows] = useState(12);
  const logs = useMemo(() => createLogDataset(), []);
  const viewportHeight = visibleRows * ROW_HEIGHT;
  const rowProps = useMemo(() => ({ logs }), [logs]);
  const listStyle = useMemo(
    () => ({ height: viewportHeight, width: "100%" }),
    [viewportHeight],
  );
  const heatmap = useMemo(
    () => createHeatmapDataset(GRID_ROWS, GRID_COLUMNS),
    [],
  );
  const totalHeatmapCells = GRID_ROWS * GRID_COLUMNS;
  const gridViewportHeight = GRID_VISIBLE_ROWS * GRID_ROW_HEIGHT;
  const cellProps = useMemo(() => ({ heatmap }), [heatmap]);
  const gridStyle = useMemo(
    () => ({ height: gridViewportHeight, width: "100%" }),
    [gridViewportHeight],
  );

  // v2 RowComponent signature
  const Row = ({
    index,
    style,
    logs: rowLogs,
  }: RowComponentProps<{ logs: LogEntry[] }>) => {
    const entry = rowLogs[index];
    return (
      <div style={style} className={styles.row}>
        <span className={styles.rowId}>#{entry.id}</span>
        <span>{entry.message}</span>
        <span className={styles.rowMeta}>
          {getSeverityLabel(entry.severity)}
        </span>
      </div>
    );
  };

  const Cell = ({
    columnIndex,
    rowIndex,
    style,
    heatmap: matrix,
  }: CellComponentProps<{ heatmap: Array<Array<number>> }>) => {
    const value = matrix[rowIndex][columnIndex];
    const intensity = value / 100;
    const backgroundAlpha = 0.18 + intensity * 0.55;
    const cellStyle = {
      ...style,
      backgroundColor: `rgba(59, 130, 246, ${backgroundAlpha.toFixed(2)})`,
      ...(value > 62 ? { color: "#f8fafc" } : {}),
    };

    return (
      <div style={cellStyle} className={styles.gridCell}>
        <span className={styles.gridCellValue}>{value}%</span>
        <span className={styles.gridCellLabel}>Node {columnIndex + 1}</span>
      </div>
    );
  };

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <h3 className={styles.title}>Window only the items the user can see</h3>
        <p className={styles.subtitle}>
          This panel renders 5k log entries and an infrastructure heatmap with{" "}
          <code>react-window</code>. Each widget only creates DOM nodes for the
          window that is currently visible.
        </p>
      </header>

      <section className={styles.examples}>
        <div className={styles.example}>
          <h4 className={styles.exampleTitle}>Virtualized log stream (List)</h4>
          <p className={styles.exampleDescription}>
            Adjust the slider to shrink or grow the viewport while the list
            reuses a small set of row components.
          </p>

          <div className={styles.controls}>
            <label className={styles.controlLabel} htmlFor="visible-rows">
              Rows in view: {visibleRows}
            </label>
            <input
              id="visible-rows"
              className={styles.slider}
              type="range"
              min="6"
              max="24"
              step="1"
              value={visibleRows}
              onChange={(e) => setVisibleRows(Number(e.target.value))}
            />
          </div>

          <div className={styles.listContainer}>
            <List
              rowComponent={Row}
              rowCount={logs.length}
              rowHeight={ROW_HEIGHT}
              rowProps={rowProps}
              style={listStyle}
            />
          </div>

          <div className={styles.listFooter}>
            <span>Total dataset size: {logs.length.toLocaleString()} rows</span>
            <span>Rendered DOM nodes at any moment: {visibleRows}</span>
          </div>
        </div>

        <div className={styles.example}>
          <h4 className={styles.exampleTitle}>
            Operations heatmap (Grid)
          </h4>
          <p className={styles.exampleDescription}>
            The grid scrolls through {totalHeatmapCells.toLocaleString()} cells,
            but only a handful are mounted as you pan around the data.
          </p>

          <div className={styles.gridContainer}>
            <Grid
              cellComponent={Cell}
              cellProps={cellProps}
              columnCount={GRID_COLUMNS}
              columnWidth={GRID_COLUMN_WIDTH}
              rowCount={GRID_ROWS}
              rowHeight={GRID_ROW_HEIGHT}
              style={gridStyle}
            />
          </div>

          <div className={styles.gridMeta}>
            <span>Rows virtualized: {GRID_ROWS.toLocaleString()}</span>
            <span>Columns virtualized: {GRID_COLUMNS}</span>
            <span>Viewport rows rendered: {GRID_VISIBLE_ROWS}</span>
          </div>
        </div>
      </section>
    </article>
  );
}
