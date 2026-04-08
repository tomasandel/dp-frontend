import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SortableHead } from "@/components/ui/sortable-head";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSort } from "@/lib/use-sort";
import type { MonitorStats, StatsResponse } from "@/lib/api";

function formatStaleness(seconds: number | null) {
  if (seconds === null) return "-";
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.round(seconds / 60)}m`;
  return `${Math.round(seconds / 3600)}h`;
}

function formatDate(iso: string | null) {
  if (!iso) return "-";
  return new Date(iso).toLocaleString();
}

export function MonitorsTable({ data }: { data: StatsResponse }) {
  const { sorted, sortKey, sortDir, toggle } = useSort<MonitorStats>(
    data.monitors,
    "sth_count"
  );

  const onSort = (key: string) => toggle(key as keyof MonitorStats & string);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Per-Monitor Statistics</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <SortableHead label="Monitor ID" sortKey="monitor_id" currentKey={sortKey} currentDir={sortDir} onSort={onSort} title="Identifier of the monitor instance (set in sidecar config)" />
              <SortableHead label="STHs" sortKey="sth_count" currentKey={sortKey} currentDir={sortDir} onSort={onSort} className="text-right" title="Total number of STH records this monitor has pushed to the backend" />
              <SortableHead label="Logs" sortKey="log_count" currentKey={sortKey} currentDir={sortDir} onSort={onSort} className="text-right" title="Number of distinct CT logs this monitor has reported STHs for" />
              <SortableHead label="First Seen" sortKey="first_seen" currentKey={sortKey} currentDir={sortDir} onSort={onSort} title="Timestamp of the earliest STH record received from this monitor" />
              <SortableHead label="Last Seen" sortKey="last_seen" currentKey={sortKey} currentDir={sortDir} onSort={onSort} title="Timestamp of the most recent STH record received from this monitor" />
              <SortableHead label="Staleness" sortKey="staleness_seconds" currentKey={sortKey} currentDir={sortDir} onSort={onSort} className="text-right" title="Time since the last STH was received from this monitor" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.map((m) => (
              <TableRow key={m.monitor_id}>
                <TableCell className="font-mono text-sm">{m.monitor_id}</TableCell>
                <TableCell className="text-right">{m.sth_count}</TableCell>
                <TableCell className="text-right">{m.log_count}</TableCell>
                <TableCell className="text-sm">{formatDate(m.first_seen)}</TableCell>
                <TableCell className="text-sm">{formatDate(m.last_seen)}</TableCell>
                <TableCell className="text-right">
                  {formatStaleness(m.staleness_seconds)}
                </TableCell>
              </TableRow>
            ))}
            {data.monitors.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  No monitor data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
