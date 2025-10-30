import { useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import styles from "./TanstackReactVirtualListExample.module.css";

type ShipmentStatus = "on-time" | "delayed" | "critical";

interface ShipmentEntry {
  id: number;
  route: string;
  carrier: string;
  departure: string;
  arrival: string;
  status: ShipmentStatus;
}

const TOTAL_SHIPMENTS = 18000;
const ROW_HEIGHT = 54;
const INITIAL_VISIBLE_ROWS = 11;

const carriers = [
  "Atlas Logistics",
  "Northwind Freight",
  "Skyline Express",
  "Nimbus Cargo",
  "Velocity Haulage",
];

const routes = [
  "NYC → Berlin",
  "Paris → Singapore",
  "Tokyo → Seattle",
  "Cape Town → Dubai",
  "Austin → Toronto",
  "Sydney → San Francisco",
];

const statusLabel: Record<ShipmentStatus, string> = {
  "on-time": "On schedule",
  delayed: "Delayed",
  critical: "Critical",
};

function createShipmentDataset(): ShipmentEntry[] {
  return Array.from({ length: TOTAL_SHIPMENTS }, (_, index) => {
    const carrier = carriers[index % carriers.length];
    const route = routes[index % routes.length];

    const departure = new Date(Date.now() - index * 4800)
      .toISOString()
      .slice(11, 16);

    const arrival = new Date(Date.now() + index * 3600)
      .toISOString()
      .slice(11, 16);

    const statusRoll = (Math.sin(index * 0.17) + 1) / 2;
    const status: ShipmentStatus =
      statusRoll > 0.9 ? "critical" : statusRoll > 0.68 ? "delayed" : "on-time";

    return {
      id: index + 1,
      route,
      carrier,
      departure,
      arrival,
      status,
    };
  });
}

export function TanStackVirtualListExample() {
  const shipments = useMemo(() => createShipmentDataset(), []);
  const [visibleRows, setVisibleRows] = useState(INITIAL_VISIBLE_ROWS);
  const viewportHeight = visibleRows * ROW_HEIGHT;
  const parentRef = useRef<HTMLDivElement | null>(null);

  const statusClassMap: Record<ShipmentStatus, string> = {
    "on-time": styles.statusOnTime,
    delayed: styles.statusDelayed,
    critical: styles.statusCritical,
  };

  const rowVirtualizer = useVirtualizer({
    count: shipments.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 6,
    getItemKey: (index) => shipments[index].id,
  });

  const virtualItems = rowVirtualizer.getVirtualItems();
  const totalShipments = shipments.length;
  const delayedCount = useMemo(
    () => shipments.filter((shipment) => shipment.status === "delayed").length,
    [shipments],
  );
  const criticalCount = useMemo(
    () => shipments.filter((shipment) => shipment.status === "critical").length,
    [shipments],
  );

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <h3 className={styles.title}>TanStack virtual list for live fleets</h3>
        <p className={styles.subtitle}>
          <code>@tanstack/react-virtual</code> gives you fine-grained control of
          windowing. Scroll through {totalShipments.toLocaleString()} shipments
          backed by absolute positioning and buttery smooth virtualization.
        </p>
      </header>

      <div className={styles.controls}>
        <label className={styles.controlLabel} htmlFor="tanstack-visible-rows">
          Rows in view: {visibleRows}
        </label>
        <input
          id="tanstack-visible-rows"
          className={styles.slider}
          type="range"
          min="8"
          max="22"
          step="1"
          value={visibleRows}
          onChange={(event) =>
            setVisibleRows(Number(event.currentTarget.value))
          }
        />
      </div>

      <div
        ref={parentRef}
        className={styles.listViewport}
        style={{ height: viewportHeight }}
      >
        <div
          style={
            {
              height: rowVirtualizer.getTotalSize(),
              position: "relative",
            } satisfies CSSProperties
          }
        >
          {virtualItems.map((virtualItem) => {
            const shipment = shipments[virtualItem.index];
            const statusClass = statusClassMap[shipment.status];

            return (
              <div
                key={virtualItem.key}
                className={styles.listRow}
                style={
                  {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    transform: `translateY(${virtualItem.start}px)`,
                    height: virtualItem.size,
                  } satisfies CSSProperties
                }
              >
                <div className={styles.listRowPrimary}>
                  <span className={styles.shipmentId}>
                    SHP-{shipment.id.toString().padStart(5, "0")}
                  </span>
                  <span className={styles.route}>{shipment.route}</span>
                </div>
                <div className={styles.listRowSecondary}>
                  <span className={styles.carrier}>{shipment.carrier}</span>
                  <span className={styles.schedule}>
                    {shipment.departure} → {shipment.arrival}
                  </span>
                </div>
                <span className={`${styles.statusBadge} ${statusClass}`}>
                  {statusLabel[shipment.status]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <footer className={styles.footer}>
        <span>
          Delayed shipments: {delayedCount.toLocaleString()} (
          {Math.round((delayedCount / totalShipments) * 100)}%)
        </span>
        <span>
          Critical alerts: {criticalCount.toLocaleString()} (
          {Math.round((criticalCount / totalShipments) * 100)}%)
        </span>
      </footer>
    </article>
  );
}
