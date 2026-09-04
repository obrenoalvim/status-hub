"use client";

import { useState } from "react";

export default function ServiceIcon({ slug, name }: { slug: string; name: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-[var(--panel-2)] font-mono text-xs text-[var(--fg-dim)]">
        {name.charAt(0).toUpperCase()}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://cdn.simpleicons.org/${slug}`}
      alt=""
      width={20}
      height={20}
      className="h-8 w-8 shrink-0 rounded bg-[var(--panel-2)] p-1.5"
      onError={() => setFailed(true)}
    />
  );
}
