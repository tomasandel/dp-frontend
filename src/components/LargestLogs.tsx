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

export function LargestLogs({ data }: { data: StatsResponse }) {
  const filtered = data.logs.filter((l) => l.latest_tree_size !== null);
  const { sorted, sortKey, sortDir, toggle } = useSort<LogStats>(
    filtered,
    "latest_tree_size"
  );
  const top5 = sorted.slice(0, 5);

  const onSort = (key: string) => toggle(key as keyof LogStats & string);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Largest Logs</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <SortableHead label="Log" sortKey="log_name" currentKey={sortKey} currentDir={sortDir} onSort={onSort} title="CT log name and base64-encoded log ID" />
              <SortableHead label="Certs/h" sortKey="growth_per_hour" currentKey={sortKey} currentDir={sortDir} onSort={onSort} className="text-right" title="Certificates added to the log per hour (based on tree growth over observation window)" />
              <SortableHead label="Tree Size" sortKey="latest_tree_size" currentKey={sortKey} currentDir={sortDir} onSort={onSort} className="text-right" title="Current Merkle tree size (total certificates in the log)" />
              <SortableHead label="1h STHs" sortKey="sths_last_1h" currentKey={sortKey} currentDir={sortDir} onSort={onSort} className="text-right" title="Number of STHs received from monitors for this log in the last 1 hour" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {top5.map((log) => (
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
                <TableCell className="text-right font-mono">
                  {log.growth_per_hour.toLocaleString()}
                </TableCell>
                <TableCell className="text-right font-mono">
                  {log.latest_tree_size?.toLocaleString() ?? "-"}
                </TableCell>
                <TableCell className="text-right">{log.sths_last_1h}</TableCell>
              </TableRow>
            ))}
            {top5.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground">
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
