import { useCallback, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { AutoSizer, Grid, List } from "react-virtualized";
import "react-virtualized/styles.css";
import styles from "./ReactVirtualizedExample.module.css";

type AutoSizerSize = {
  height: number;
  width: number;
};

type ListRowRendererParams = {
  index: number;
  key: string;
  style: CSSProperties;
};

type GridCellRendererParams = {
  columnIndex: number;
  rowIndex: number;
  key: string;
  style: CSSProperties;
};

type RequestStatus = "ok" | "slow" | "down";

interface RequestLogEntry {
  id: number;
  service: string;
  region: string;
  endpoint: string;
  durationMs: number;
  status: RequestStatus;
  timestamp: string;
}

const LIST_ROW_HEIGHT = 56;
const INITIAL_VISIBLE_ROWS = 12;
const TOTAL_REQUESTS = 15000;
const GRID_ROW_COUNT = 180;
const GRID_COLUMN_COUNT = 36;
const GRID_ROW_HEIGHT = 52;
const GRID_COLUMN_WIDTH = 110;
const GRID_VISIBLE_ROWS = 6;

const services = [
  "Auth API",
  "Catalog API",
  "Payments",
  "Orders",
  "Search",
  "Messaging",
  "Inventory",
];
const regions = ["us-east-1", "us-west-2", "eu-west-1", "ap-south-1"];
const endpoints = [
  "/login",
  "/logout",
  "/search",
  "/checkout",
  "/orders",
  "/inventory",
  "/analytics",
  "/notifications",
];

const statusLabel: Record<RequestStatus, string> = {
  ok: "Healthy",
  slow: "Contended",
  down: "Outage",
};

function createRequestDataset(): RequestLogEntry[] {
  return Array.from({ length: TOTAL_REQUESTS }, (_, index) => {
    const service = services[index % services.length];
    const region = regions[index % regions.length];
    const endpoint = endpoints[index % endpoints.length];

    const durationSeed = Math.sin(index * 0.37) * 80 + Math.cos(index * 0.13) * 120;
    const durationMs = Math.max(40, Math.round(220 + durationSeed));

    const statusRoll = (Math.sin(index * 0.11) + 1) / 2;
    const status: RequestStatus =
      statusRoll > 0.92 ? "down" : statusRoll > 0.68 ? "slow" : "ok";

    const timestamp = new Date(Date.now() - index * 3500)
      .toISOString()
      .slice(11, 19);

    return {
      id: index + 1,
      service,
      region,
      endpoint,
      durationMs,
      status,
      timestamp,
    };
  });
}

function createThroughputMatrix(rows: number, columns: number): number[][] {
  return Array.from({ length: rows }, (_, rowIndex) =>
    Array.from({ length: columns }, (_, columnIndex) => {
      const radial = Math.sin(rowIndex / 5) * 40 + Math.cos(columnIndex / 7) * 52;
      const trend = (rowIndex / rows) * 55 + (columnIndex / columns) * 35;
      const value = 120 + radial + trend;
      return Math.max(10, Math.round(value));
    }),
  );
}

export function ReactVirtualizedExample() {
  const [visibleRows, setVisibleRows] = useState(INITIAL_VISIBLE_ROWS);

  const requestLogs = useMemo(() => createRequestDataset(), []);
  const throughputMatrix = useMemo(
    () => createThroughputMatrix(GRID_ROW_COUNT, GRID_COLUMN_COUNT),
    [],
  );

  const listViewportHeight = visibleRows * LIST_ROW_HEIGHT;
  const gridViewportHeight = GRID_VISIBLE_ROWS * GRID_ROW_HEIGHT;

  const statusClassMap: Record<RequestStatus, string> = {
    ok: styles.statusOk,
    slow: styles.statusSlow,
    down: styles.statusDown,
  };

  const rowRenderer = useCallback(
    ({ index, key, style }: ListRowRendererParams) => {
      const entry = requestLogs[index];
      const statusClass = statusClassMap[entry.status];

      return (
        <div key={key} style={style} className={styles.listRow}>
          <div className={styles.listRowPrimary}>
            <span className={styles.requestId}>
              REQ-{entry.id.toString().padStart(5, "0")}
            </span>
            <span className={styles.serviceName}>{entry.service}</span>
            <span className={styles.regionBadge}>{entry.region}</span>
          </div>
          <div className={styles.listRowSecondary}>
            <span className={styles.endpoint}>{entry.endpoint}</span>
            <span className={styles.timestamp}>{entry.timestamp}</span>
          </div>
          <div className={styles.listRowMeta}>
            <span className={styles.duration}>{entry.durationMs} ms</span>
            <span className={`${styles.statusBadge} ${statusClass}`}>
              {statusLabel[entry.status]}
            </span>
          </div>
        </div>
      );
    },
    [requestLogs, statusClassMap],
  );

  const cellRenderer = useCallback(
    ({ columnIndex, rowIndex, key, style }: GridCellRendererParams) => {
      const value = throughputMatrix[rowIndex][columnIndex];
      const normalized = Math.min(1, value / 320);
      const backgroundAlpha = 0.18 + normalized * 0.55;

      const cellStyle: CSSProperties = {
        ...style,
        backgroundColor: `rgba(16, 185, 129, ${backgroundAlpha.toFixed(2)})`,
        ...(value > 260 ? { color: "#0b1120" } : {}),
      };

      return (
        <div key={key} style={cellStyle} className={styles.gridCell}>
          <span className={styles.gridCellValue}>{value}</span>
          <span className={styles.gridCellLabel}>
            Zone {columnIndex + 1}
          </span>
        </div>
      );
    },
    [throughputMatrix],
  );

  const totalRequests = requestLogs.length;
  const slowCount = useMemo(
    () => requestLogs.filter((entry) => entry.status === "slow").length,
    [requestLogs],
  );
  const outageCount = useMemo(
    () => requestLogs.filter((entry) => entry.status === "down").length,
    [requestLogs],
  );
  const totalCells = throughputMatrix.length * throughputMatrix[0]?.length;

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <h3 className={styles.title}>Streamline your dashboards with virtualization</h3>
        <p className={styles.subtitle}>
          <code>react-virtualized</code> renders only the pieces of large data
          sets that the user can see. Explore a 15k row request log and a
          datacenter heatmap without overwhelming the DOM.
        </p>
      </header>

      <section className={styles.examples}>
        <div className={styles.example}>
          <h4 className={styles.exampleTitle}>
            Live request log (List)
          </h4>
          <p className={styles.exampleDescription}>
            Resize the viewport to see how the list reuses a handful of rows to
            render {totalRequests.toLocaleString()} entries.
          </p>

          <div className={styles.controls}>
            <label className={styles.controlLabel} htmlFor="rv-visible-rows">
              Rows in view: {visibleRows}
            </label>
            <input
              id="rv-visible-rows"
              className={styles.slider}
              type="range"
              min="6"
              max="24"
              step="1"
              value={visibleRows}
              onChange={(event) =>
                setVisibleRows(Number(event.currentTarget.value))
              }
            />
          </div>

          <div
            className={styles.listViewport}
            style={{ height: listViewportHeight }}
          >
            <AutoSizer>
              {({ width, height }: AutoSizerSize) => (
                <List
                  width={width}
                  height={height}
                  rowCount={requestLogs.length}
                  rowHeight={LIST_ROW_HEIGHT}
                  rowRenderer={rowRenderer}
                  overscanRowCount={4}
                />
              )}
            </AutoSizer>
          </div>

          <div className={styles.listMeta}>
            <span>
              Slow requests: {slowCount.toLocaleString()} (
              {Math.round((slowCount / totalRequests) * 100)}%)
            </span>
            <span>
              Outages: {outageCount.toLocaleString()} (
              {Math.round((outageCount / totalRequests) * 100)}%)
            </span>
          </div>
        </div>

        <div className={styles.example}>
          <h4 className={styles.exampleTitle}>Throughput heatmap (Grid)</h4>
          <p className={styles.exampleDescription}>
            The grid scrolls through {totalCells.toLocaleString()} cells worth of
            metrics, yet maintains a tiny DOM footprint thanks to virtualization.
          </p>

          <div
            className={styles.gridViewport}
            style={{ height: gridViewportHeight }}
          >
            <AutoSizer>
              {({ width, height }: AutoSizerSize) => (
                <Grid
                  cellRenderer={cellRenderer}
                  columnCount={GRID_COLUMN_COUNT}
                  columnWidth={GRID_COLUMN_WIDTH}
                  height={height}
                  overscanColumnCount={2}
                  overscanRowCount={2}
                  rowCount={GRID_ROW_COUNT}
                  rowHeight={GRID_ROW_HEIGHT}
                  width={width}
                />
              )}
            </AutoSizer>
          </div>

          <div className={styles.gridMeta}>
            <span>Rows virtualized: {GRID_ROW_COUNT.toLocaleString()}</span>
            <span>Columns virtualized: {GRID_COLUMN_COUNT}</span>
            <span>
              Viewport rows rendered: {GRID_VISIBLE_ROWS} (≈{" "}
              {GRID_VISIBLE_ROWS * GRID_COLUMN_COUNT} cells)
            </span>
          </div>
        </div>
      </section>
    </article>
  );
}
