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
import type { LogStats, StatsResponse } from "@/lib/api";

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
  const { sorted, sortKey, sortDir, toggle } = useSort<LogStats>(
    data.logs,
    "sth_count"
  );

  const onSort = (key: string) => toggle(key as keyof LogStats & string);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Per-Log Statistics</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <SortableHead label="Log" sortKey="log_name" currentKey={sortKey} currentDir={sortDir} onSort={onSort} title="CT log name and base64-encoded log ID" />
              <SortableHead label="STHs" sortKey="sth_count" currentKey={sortKey} currentDir={sortDir} onSort={onSort} className="text-right" title="Total number of STH records stored for this log" />
              <SortableHead label="1h STHs" sortKey="sths_last_1h" currentKey={sortKey} currentDir={sortDir} onSort={onSort} className="text-right" title="STHs received in the last 1 hour" />
              <SortableHead label="Latest Tree Size" sortKey="latest_tree_size" currentKey={sortKey} currentDir={sortDir} onSort={onSort} className="text-right" title="Current Merkle tree size (total certificates in the log)" />
              <SortableHead label="Growth" sortKey="tree_growth_total" currentKey={sortKey} currentDir={sortDir} onSort={onSort} className="text-right" title="Difference between the largest and smallest tree size observed (max - min)" />
              <SortableHead label="Staleness" sortKey="staleness_seconds" currentKey={sortKey} currentDir={sortDir} onSort={onSort} className="text-right" title="Time since the last STH was received from any monitor for this log" />
              <SortableHead label="Monitors" sortKey="monitor_count" currentKey={sortKey} currentDir={sortDir} onSort={onSort} className="text-right" title="Number of distinct monitors that have reported STHs for this log" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.map((log) => (
              <TableRow key={log.log_id}>
                <TableCell title={log.log_id}>
                  {log.log_name ? (
                    <div>
                      <div className="text-sm">{log.log_name}</div>
                      <div className="font-mono text-xs text-muted-foreground">{truncateId(log.log_id)}</div>
                    </div>
                  ) : (
                    <div className="font-mono text-xs">{truncateId(log.log_id)}</div>
                  )}
                </TableCell>
                <TableCell className="text-right">{log.sth_count}</TableCell>
                <TableCell className="text-right">{log.sths_last_1h}</TableCell>
                <TableCell className="text-right font-mono">
                  {log.latest_tree_size?.toLocaleString() ?? "-"}
                </TableCell>
                <TableCell className="text-right font-mono">
                  {log.tree_growth_total.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  {formatStaleness(log.staleness_seconds)}
                </TableCell>
                <TableCell className="text-right">{log.monitor_count}</TableCell>
              </TableRow>
            ))}
            {data.logs.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground">
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
