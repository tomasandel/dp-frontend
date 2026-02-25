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

export function FastestGrowingLogs({ data }: { data: StatsResponse }) {
  const top5 = [...data.logs]
    .filter((l) => l.growth_per_hour > 0)
    .sort((a, b) => b.growth_per_hour - a.growth_per_hour)
    .slice(0, 5);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Fastest Growing Logs</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Log ID</TableHead>
              <TableHead className="text-right">Certs/h</TableHead>
              <TableHead className="text-right">Tree Size</TableHead>
              <TableHead className="text-right">1h STHs</TableHead>
              <TableHead className="text-right">24h STHs</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {top5.map((log) => (
              <TableRow key={log.log_id}>
                <TableCell className="font-mono text-xs" title={log.log_id}>
                  {truncateId(log.log_id)}
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
                  No growing logs detected
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
