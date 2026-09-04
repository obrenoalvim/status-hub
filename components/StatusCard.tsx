import { StatusResult } from "@/lib/normalize";
import ServiceIcon from "./ServiceIcon";

const LED_VAR: Record<StatusResult["indicator"], string> = {
  operational: "var(--led-operational)",
  minor: "var(--led-minor)",
  major: "var(--led-major)",
  critical: "var(--led-critical)",
  maintenance: "var(--led-maintenance)",
  unknown: "var(--led-unknown)",
};

export default function StatusCard({ status, icon }: { status: StatusResult; icon: string }) {
  return (
    <a
      href={status.url}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center gap-3 rounded-md border border-[var(--border)] bg-[var(--panel)] px-4 py-3 transition-colors hover:border-[var(--accent)]/40 hover:bg-[var(--panel-2)]"
    >
      <ServiceIcon slug={icon} name={status.name} />
      <div className="min-w-0 flex-1">
        <p className="truncate font-[family-name:var(--font-plex-mono)] text-sm font-medium tracking-tight">
          {status.name}
        </p>
        <p className="truncate text-xs text-[var(--fg-dim)]">{status.description}</p>
      </div>
      <span
        className="led h-2.5 w-2.5 shrink-0"
        style={{ "--dot-color": LED_VAR[status.indicator], background: LED_VAR[status.indicator] } as React.CSSProperties}
      />
    </a>
  );
}
