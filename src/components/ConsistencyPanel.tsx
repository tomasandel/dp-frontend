import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { StatsResponse } from "@/lib/api";

function truncateId(id: string, len = 16) {
  return id.length > len ? id.slice(0, len) + "..." : id;
}

function truncateHash(hash: string, len = 12) {
  return hash.length > len ? hash.slice(0, len) + "..." : hash;
}

export function ConsistencyPanel({ data }: { data: StatsResponse }) {
  const hasConflicts = data.consistency.some((c) => !c.consistent);

  return (
    <Card className={hasConflicts ? "border-destructive" : ""}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Cross-Monitor Consistency</CardTitle>
          {hasConflicts ? (
            <Badge variant="destructive">CONFLICT DETECTED</Badge>
          ) : (
            <Badge className="bg-green-600 hover:bg-green-700">ALL CONSISTENT</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Log ID</TableHead>
              <TableHead className="text-right">Monitors</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.consistency.map((entry) => (
              <TableRow
                key={entry.log_id}
                className={!entry.consistent ? "bg-destructive/10" : ""}
              >
                <TableCell className="font-mono text-xs" title={entry.log_id}>
                  {truncateId(entry.log_id)}
                </TableCell>
                <TableCell className="text-right">{entry.monitor_count}</TableCell>
                <TableCell>
                  {entry.consistent ? (
                    <Badge variant="outline" className="border-green-600 text-green-600">
                      OK
                    </Badge>
                  ) : (
                    <Badge variant="destructive">CONFLICT</Badge>
                  )}
                </TableCell>
                <TableCell>
                  {!entry.consistent && (
                    <div className="space-y-1">
                      {entry.latest_per_monitor.map((m) => (
                        <div key={m.monitor_id} className="text-xs font-mono">
                          {m.monitor_id}: tree={m.tree_size.toLocaleString()}{" "}
                          hash={truncateHash(m.root_hash)}
                        </div>
                      ))}
                    </div>
                  )}
                  {entry.consistent && entry.latest_per_monitor.length > 0 && (
                    <span className="text-xs text-muted-foreground">
                      tree_size={entry.latest_per_monitor[0].tree_size.toLocaleString()}
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {data.consistency.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground">
                  No consistency data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
