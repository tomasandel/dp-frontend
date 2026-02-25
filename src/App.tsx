import { useQuery } from "@tanstack/react-query";
import { fetchStats } from "@/lib/api";
import { OverviewCards } from "@/components/OverviewCards";
import { ActivityCards } from "@/components/ActivityCards";
import { HourlyChart } from "@/components/HourlyChart";
import { FiveMinChart } from "@/components/FiveMinChart";
import { LogsTable } from "@/components/LogsTable";
import { MonitorsTable } from "@/components/MonitorsTable";
import { ConsistencyPanel } from "@/components/ConsistencyPanel";
import { Separator } from "@/components/ui/separator";

export default function App() {
  const { data, isLoading, error, dataUpdatedAt } = useQuery({
    queryKey: ["stats"],
    queryFn: fetchStats,
    refetchInterval: 30_000,
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <h1 className="text-xl font-bold">CT Guard Dashboard</h1>
          <span className="text-sm text-muted-foreground">
            {dataUpdatedAt
              ? `Updated ${new Date(dataUpdatedAt).toLocaleTimeString()}`
              : ""}
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-6 px-6 py-6">
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <p className="text-muted-foreground">Loading stats...</p>
          </div>
        )}

        {error && (
          <div className="rounded-md border border-destructive bg-destructive/10 p-4">
            <p className="text-destructive">
              Failed to load stats: {(error as Error).message}
            </p>
          </div>
        )}

        {data && (
          <>
            <OverviewCards data={data} />
            <ActivityCards data={data} />
            <Separator />
            <div className="grid gap-4 md:grid-cols-2">
              <HourlyChart data={data} />
              <FiveMinChart data={data} />
            </div>
            <Separator />
            <ConsistencyPanel data={data} />
            <LogsTable data={data} />
            <MonitorsTable data={data} />
          </>
        )}
      </main>

      {data && (
        <footer className="border-t px-6 py-3">
          <div className="mx-auto flex max-w-7xl justify-end gap-4 text-xs text-muted-foreground">
            <span>DB table size: {data.system.db_table_size}</span>
            <span>Query time: {data.system.query_time_ms}ms</span>
          </div>
        </footer>
      )}
    </div>
  );
}
