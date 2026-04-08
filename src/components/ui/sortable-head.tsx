import { TableHead } from "@/components/ui/table";

interface SortableHeadProps {
  label: string;
  sortKey: string;
  currentKey: string;
  currentDir: "asc" | "desc";
  onSort: (key: string) => void;
  className?: string;
  title?: string;
}

export function SortableHead({
  label,
  sortKey,
  currentKey,
  currentDir,
  onSort,
  className,
  title,
}: SortableHeadProps) {
  const active = sortKey === currentKey;
  const arrow = active ? (currentDir === "asc" ? " \u25B2" : " \u25BC") : "";

  return (
    <TableHead
      className={`${className ?? ""} cursor-pointer select-none hover:text-foreground/80`}
      title={title}
      onClick={() => onSort(sortKey)}
    >
      {label}{arrow}
    </TableHead>
  );
}
