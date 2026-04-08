import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { StatsResponse } from "@/lib/api";

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
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Per-Monitor Statistics</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead title="Identifier of the monitor instance (set in sidecar config)">Monitor ID</TableHead>
              <TableHead className="text-right" title="Total number of STH records this monitor has pushed to the backend">STHs</TableHead>
              <TableHead className="text-right" title="Number of distinct CT logs this monitor has reported STHs for">Logs</TableHead>
              <TableHead title="Timestamp of the earliest STH record received from this monitor">First Seen</TableHead>
              <TableHead title="Timestamp of the most recent STH record received from this monitor">Last Seen</TableHead>
              <TableHead className="text-right" title="Time since the last STH was received from this monitor">Staleness</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.monitors.map((m) => (
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
