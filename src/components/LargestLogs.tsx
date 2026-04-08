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

export function LargestLogs({ data }: { data: StatsResponse }) {
  const top5 = [...data.logs]
    .filter((l) => l.latest_tree_size !== null)
    .sort((a, b) => (b.latest_tree_size ?? 0) - (a.latest_tree_size ?? 0))
    .slice(0, 5);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Largest Logs</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead title="CT log name and base64-encoded log ID">Log</TableHead>
              <TableHead className="text-right" title="Certificates added to the log per hour (based on tree growth over observation window)">Certs/h</TableHead>
              <TableHead className="text-right" title="Current Merkle tree size (total certificates in the log)">Tree Size</TableHead>
              <TableHead className="text-right" title="Number of STHs received from monitors for this log in the last 1 hour">1h STHs</TableHead>
              <TableHead className="text-right" title="Number of STHs received from monitors for this log in the last 24 hours">24h STHs</TableHead>
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
                <TableCell className="text-right">{log.sths_last_24h}</TableCell>
              </TableRow>
            ))}
            {top5.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
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
