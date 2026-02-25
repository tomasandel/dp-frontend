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
              <TableHead>Monitor ID</TableHead>
              <TableHead className="text-right">STHs</TableHead>
              <TableHead>First Seen</TableHead>
              <TableHead>Last Seen</TableHead>
              <TableHead className="text-right">Staleness</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.monitors.map((m) => (
              <TableRow key={m.monitor_id}>
                <TableCell className="font-mono text-sm">{m.monitor_id}</TableCell>
                <TableCell className="text-right">{m.sth_count}</TableCell>
                <TableCell className="text-sm">{formatDate(m.first_seen)}</TableCell>
                <TableCell className="text-sm">{formatDate(m.last_seen)}</TableCell>
                <TableCell className="text-right">
                  {formatStaleness(m.staleness_seconds)}
                </TableCell>
              </TableRow>
            ))}
            {data.monitors.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
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
