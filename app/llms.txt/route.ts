import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

export function GET() {
  const body = `# ${SITE_NAME}

> ${SITE_DESCRIPTION}

Status Hub polls each provider's public Statuspage.io (or equivalent) JSON status endpoint through a server-side proxy, normalizes the response into one shape, and refreshes the dashboard automatically every 12 seconds. Built for developers who track multiple vendor status pages and want one page instead of a dozen browser tabs. No account, no backend database — the selection of tracked services is saved to the visitor's browser only.

## Pages

- [Dashboard](${SITE_URL}/): the main grid of selected services, grouped by category, with an all-clear/incident summary bar.
- [Service picker](${SITE_URL}/select): choose which of the 50+ supported services to track; selection persists in localStorage.

## Source

- [GitHub repository](https://github.com/obrenoalvim/status-hub): full source, the provider catalog (\`lib/providers.ts\`), and instructions for adding a new service.
`;

  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
