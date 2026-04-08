import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { StatsResponse } from "@/lib/api";

export function OverviewCards({ data }: { data: StatsResponse }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle
            className="text-sm font-medium text-muted-foreground"
            title="Total number of Signed Tree Head records stored in the database"
          >
            Total STHs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{data.total_sths.toLocaleString()}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle
            className="text-sm font-medium text-muted-foreground"
            title="Number of distinct CT logs the backend has received STHs for"
          >
            Unique Logs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{data.unique_logs}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle
            className="text-sm font-medium text-muted-foreground"
            title="Number of distinct monitor instances pushing STHs to the backend"
          >
            Unique Monitors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{data.unique_monitors}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle
            className="text-sm font-medium text-muted-foreground"
            title="Time span between the oldest and newest STH record in the database"
          >
            Data Span
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">
            {data.data_range.span_hours > 48
              ? `${Math.round(data.data_range.span_hours / 24)}d`
              : `${data.data_range.span_hours}h`}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
