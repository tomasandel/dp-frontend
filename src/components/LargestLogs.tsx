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
              <TableHead>Log ID</TableHead>
              <TableHead className="text-right">Tree Size</TableHead>
              <TableHead className="text-right">Growth</TableHead>
              <TableHead className="text-right">Unique Hashes</TableHead>
              <TableHead className="text-right">STHs</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {top5.map((log) => (
              <TableRow key={log.log_id}>
                <TableCell className="font-mono text-xs" title={log.log_id}>
                  {truncateId(log.log_id)}
                </TableCell>
                <TableCell className="text-right font-mono">
                  {log.latest_tree_size?.toLocaleString() ?? "-"}
                </TableCell>
                <TableCell className="text-right font-mono">
                  {log.tree_growth_total.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  {log.unique_root_hashes}
                </TableCell>
                <TableCell className="text-right">{log.sth_count}</TableCell>
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
