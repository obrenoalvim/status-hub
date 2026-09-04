export type ProviderType = "statuspage" | "gcloud";

export interface Provider {
  id: string;
  name: string;
  category: string;
  type: ProviderType;
  /** Base URL used to build the JSON endpoint. */
  baseUrl: string;
}

export const PROVIDERS: Provider[] = [
  { id: "github", name: "GitHub", category: "Dev Tools", type: "statuspage", baseUrl: "https://www.githubstatus.com" },
  { id: "cloudflare", name: "Cloudflare", category: "Infra", type: "statuspage", baseUrl: "https://www.cloudflarestatus.com" },
  { id: "openai", name: "OpenAI", category: "AI", type: "statuspage", baseUrl: "https://status.openai.com" },
  { id: "anthropic", name: "Anthropic (Claude)", category: "AI", type: "statuspage", baseUrl: "https://status.claude.com" },
  { id: "discord", name: "Discord", category: "Comms", type: "statuspage", baseUrl: "https://discordstatus.com" },
  { id: "dropbox", name: "Dropbox", category: "Storage", type: "statuspage", baseUrl: "https://status.dropbox.com" },
  { id: "figma", name: "Figma", category: "Design", type: "statuspage", baseUrl: "https://status.figma.com" },
  { id: "notion", name: "Notion", category: "Productivity", type: "statuspage", baseUrl: "https://www.notion-status.com" },
  { id: "npm", name: "npm", category: "Dev Tools", type: "statuspage", baseUrl: "https://status.npmjs.org" },
  { id: "digitalocean", name: "DigitalOcean", category: "Infra", type: "statuspage", baseUrl: "https://status.digitalocean.com" },
  { id: "vercel", name: "Vercel", category: "Infra", type: "statuspage", baseUrl: "https://www.vercel-status.com" },
  { id: "netlify", name: "Netlify", category: "Infra", type: "statuspage", baseUrl: "https://www.netlifystatus.com" },
  { id: "atlassian", name: "Atlassian", category: "Productivity", type: "statuspage", baseUrl: "https://status.atlassian.com" },
  { id: "twilio", name: "Twilio", category: "Comms", type: "statuspage", baseUrl: "https://status.twilio.com" },
  { id: "datadog", name: "Datadog", category: "Monitoring", type: "statuspage", baseUrl: "https://status.datadoghq.com" },
  { id: "reddit", name: "Reddit", category: "Social", type: "statuspage", baseUrl: "https://www.redditstatus.com" },
  { id: "hubspot", name: "HubSpot", category: "Marketing", type: "statuspage", baseUrl: "https://status.hubspot.com" },
  { id: "mongodb", name: "MongoDB Cloud", category: "Database", type: "statuspage", baseUrl: "https://status.mongodb.com" },
  { id: "circleci", name: "CircleCI", category: "Dev Tools", type: "statuspage", baseUrl: "https://status.circleci.com" },
  { id: "linear", name: "Linear", category: "Productivity", type: "statuspage", baseUrl: "https://linearstatus.com" },
  { id: "zoom", name: "Zoom", category: "Comms", type: "statuspage", baseUrl: "https://www.zoomstatus.com" },
  { id: "supabase", name: "Supabase", category: "Database", type: "statuspage", baseUrl: "https://status.supabase.com" },
  { id: "render", name: "Render", category: "Infra", type: "statuspage", baseUrl: "https://status.render.com" },
  { id: "asana", name: "Asana", category: "Productivity", type: "statuspage", baseUrl: "https://status.asana.com" },
  { id: "intercom", name: "Intercom", category: "Support", type: "statuspage", baseUrl: "https://www.finstatus.com" },
  { id: "canva", name: "Canva", category: "Design", type: "statuspage", baseUrl: "https://www.canvastatus.com" },
  { id: "gcloud", name: "Google Cloud", category: "Infra", type: "gcloud", baseUrl: "https://status.cloud.google.com" },
];

export function getProvider(id: string): Provider | undefined {
  return PROVIDERS.find((p) => p.id === id);
}
