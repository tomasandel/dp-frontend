import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { StatsResponse } from "@/lib/api";

export function ActivityCards({ data }: { data: StatsResponse }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle
            className="text-sm font-medium text-muted-foreground"
            title="Number of STHs ingested in the last 1 hour"
          >
            Last 1h
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{data.recent_activity.last_1h}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle
            className="text-sm font-medium text-muted-foreground"
            title="Number of STHs ingested in the last 24 hours"
          >
            Last 24h
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{data.recent_activity.last_24h}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle
            className="text-sm font-medium text-muted-foreground"
            title="Average number of STHs ingested per hour across the entire data span"
          >
            Rate / hour
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{data.ingestion_rates.per_hour}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle
            className="text-sm font-medium text-muted-foreground"
            title="Average number of STHs ingested per day across the entire data span"
          >
            Rate / day
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{data.ingestion_rates.per_day}</p>
        </CardContent>
      </Card>
    </div>
  );
}
