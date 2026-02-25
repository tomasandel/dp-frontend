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

function truncateId(id: string, len = 16) {
  return id.length > len ? id.slice(0, len) + "..." : id;
}

function formatStaleness(seconds: number | null) {
  if (seconds === null) return "-";
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.round(seconds / 60)}m`;
  return `${Math.round(seconds / 3600)}h`;
}

export function LogsTable({ data }: { data: StatsResponse }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Per-Log Statistics</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Log ID</TableHead>
              <TableHead className="text-right">STHs</TableHead>
              <TableHead className="text-right">24h</TableHead>
              <TableHead className="text-right">Latest Tree Size</TableHead>
              <TableHead className="text-right">Growth</TableHead>
              <TableHead className="text-right">Staleness</TableHead>
              <TableHead className="text-right">Avg Lag</TableHead>
              <TableHead className="text-right">Monitors</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.logs.map((log) => (
              <TableRow key={log.log_id}>
                <TableCell className="font-mono text-xs" title={log.log_id}>
                  {truncateId(log.log_id)}
                </TableCell>
                <TableCell className="text-right">{log.sth_count}</TableCell>
                <TableCell className="text-right">{log.sths_last_24h}</TableCell>
                <TableCell className="text-right font-mono">
                  {log.latest_tree_size?.toLocaleString() ?? "-"}
                </TableCell>
                <TableCell className="text-right font-mono">
                  {log.tree_growth_total.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  {formatStaleness(log.staleness_seconds)}
                </TableCell>
                <TableCell className="text-right">
                  {log.avg_ingestion_lag_ms !== null
                    ? `${(log.avg_ingestion_lag_ms / 1000).toFixed(1)}s`
                    : "-"}
                </TableCell>
                <TableCell className="text-right">{log.monitor_count}</TableCell>
              </TableRow>
            ))}
            {data.logs.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-muted-foreground">
                  No log data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
