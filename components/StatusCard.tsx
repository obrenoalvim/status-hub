import { StatusResult } from "@/lib/normalize";

const DOT_COLOR: Record<StatusResult["indicator"], string> = {
  operational: "bg-emerald-500",
  minor: "bg-yellow-500",
  major: "bg-orange-500",
  critical: "bg-red-500",
  maintenance: "bg-blue-500",
  unknown: "bg-gray-400",
};

export default function StatusCard({ status }: { status: StatusResult }) {
  return (
    <a
      href={status.url}
      target="_blank"
      rel="noreferrer"
      className="flex items-center justify-between gap-3 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 px-4 py-3 hover:border-black/20 dark:hover:border-white/20 transition-colors"
    >
      <div className="min-w-0">
        <p className="font-medium truncate">{status.name}</p>
        <p className="text-sm text-neutral-500 truncate">{status.description}</p>
      </div>
      <span className={`h-3 w-3 shrink-0 rounded-full ${DOT_COLOR[status.indicator]}`} />
    </a>
  );
}
