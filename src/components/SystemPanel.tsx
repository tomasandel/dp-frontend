import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { StatsResponse } from "@/lib/api";

export function SystemPanel({ data }: { data: StatsResponse }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">System</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">DB Table Size</p>
            <p className="text-lg font-semibold">{data.system.db_table_size}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Rows</p>
            <p className="text-lg font-semibold">
              {data.total_sths.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Query Time</p>
            <p className="text-lg font-semibold">{data.system.query_time_ms}ms</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
