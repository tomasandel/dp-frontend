export interface LogMonitor {
  monitor_id: string;
  sth_count: number;
  last_seen: string;
}

export interface LogStats {
  log_id: string;
  log_name: string | null;
  sth_count: number;
  sths_last_1h: number;
  sths_last_24h: number;
  latest_tree_size: number | null;
  latest_timestamp: number | null;
  oldest_tree_size: number | null;
  tree_growth_total: number;
  growth_per_hour: number;
  unique_root_hashes: number;
  sth_freshness_seconds: number | null;
  first_seen: string;
  last_seen: string;
  staleness_seconds: number | null;
  avg_ingestion_lag_ms: number | null;
  monitor_count: number;
  monitors: LogMonitor[];
}

export interface MonitorStats {
  monitor_id: string;
  sth_count: number;
  log_count: number;
  first_seen: string;
  last_seen: string;
  staleness_seconds: number | null;
}

export interface ConsistencyMonitorEntry {
  monitor_id: string;
  tree_size: number;
  root_hash: string;
  timestamp: number;
}

export interface ConsistencyEntry {
  log_id: string;
  log_name: string | null;
  monitor_count: number;
  consistent: boolean;
  latest_per_monitor: ConsistencyMonitorEntry[];
}

export interface StatsResponse {
  total_sths: number;
  unique_logs: number;
  unique_monitors: number;
  data_range: {
    oldest_stored_at: string | null;
    newest_stored_at: string | null;
    span_hours: number;
  };
  ingestion_rates: {
    per_hour: number;
    per_day: number;
  };
  recent_activity: {
    last_1h: number;
    last_24h: number;
    last_7d: number;
  };
  hourly_histogram: { hour: string; count: number }[];
  five_min_histogram: { time: string; count: number }[];
  logs: LogStats[];
  monitors: MonitorStats[];
  consistency: ConsistencyEntry[];
  system: {
    db_table_size: string;
    query_time_ms: number;
  };
}

const API_URL = ((window as unknown) as Record<string, unknown>).__API_URL__ || "";

export async function fetchStats(): Promise<StatsResponse> {
  const res = await fetch(`${API_URL}/api/stats`);
  if (!res.ok) {
    throw new Error(`Failed to fetch stats: ${res.status}`);
  }
  return res.json();
}
