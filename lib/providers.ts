export type ProviderType = "statuspage" | "gcloud";

export interface Provider {
  id: string;
  name: string;
  category: string;
  type: ProviderType;
  /** Base URL used to build the JSON endpoint. */
  baseUrl: string;
  /** Simple Icons slug (cdn.simpleicons.org/<slug>) for the card icon. */
  icon: string;
}

export const PROVIDERS: Provider[] = [
  { id: "github", name: "GitHub", category: "Dev Tools", type: "statuspage", baseUrl: "https://www.githubstatus.com", icon: "github" },
  { id: "cloudflare", name: "Cloudflare", category: "Infra", type: "statuspage", baseUrl: "https://www.cloudflarestatus.com", icon: "cloudflare" },
  { id: "openai", name: "OpenAI", category: "AI", type: "statuspage", baseUrl: "https://status.openai.com", icon: "openai" },
  { id: "anthropic", name: "Anthropic (Claude)", category: "AI", type: "statuspage", baseUrl: "https://status.claude.com", icon: "claude" },
  { id: "discord", name: "Discord", category: "Games", type: "statuspage", baseUrl: "https://discordstatus.com", icon: "discord" },
  { id: "dropbox", name: "Dropbox", category: "Storage", type: "statuspage", baseUrl: "https://status.dropbox.com", icon: "dropbox" },
  { id: "figma", name: "Figma", category: "Design", type: "statuspage", baseUrl: "https://status.figma.com", icon: "figma" },
  { id: "notion", name: "Notion", category: "Productivity", type: "statuspage", baseUrl: "https://www.notion-status.com", icon: "notion" },
  { id: "npm", name: "npm", category: "Dev Tools", type: "statuspage", baseUrl: "https://status.npmjs.org", icon: "npm" },
  { id: "digitalocean", name: "DigitalOcean", category: "Infra", type: "statuspage", baseUrl: "https://status.digitalocean.com", icon: "digitalocean" },
  { id: "vercel", name: "Vercel", category: "Infra", type: "statuspage", baseUrl: "https://www.vercel-status.com", icon: "vercel" },
  { id: "netlify", name: "Netlify", category: "Infra", type: "statuspage", baseUrl: "https://www.netlifystatus.com", icon: "netlify" },
  { id: "atlassian", name: "Atlassian", category: "Productivity", type: "statuspage", baseUrl: "https://status.atlassian.com", icon: "atlassian" },
  { id: "twilio", name: "Twilio", category: "Comms", type: "statuspage", baseUrl: "https://status.twilio.com", icon: "twilio" },
  { id: "datadog", name: "Datadog", category: "Monitoring", type: "statuspage", baseUrl: "https://status.datadoghq.com", icon: "datadog" },
  { id: "reddit", name: "Reddit", category: "Social", type: "statuspage", baseUrl: "https://www.redditstatus.com", icon: "reddit" },
  { id: "hubspot", name: "HubSpot", category: "Marketing", type: "statuspage", baseUrl: "https://status.hubspot.com", icon: "hubspot" },
  { id: "mongodb", name: "MongoDB Cloud", category: "Database", type: "statuspage", baseUrl: "https://status.mongodb.com", icon: "mongodb" },
  { id: "circleci", name: "CircleCI", category: "Dev Tools", type: "statuspage", baseUrl: "https://status.circleci.com", icon: "circleci" },
  { id: "linear", name: "Linear", category: "Productivity", type: "statuspage", baseUrl: "https://linearstatus.com", icon: "linear" },
  { id: "zoom", name: "Zoom", category: "Comms", type: "statuspage", baseUrl: "https://www.zoomstatus.com", icon: "zoom" },
  { id: "supabase", name: "Supabase", category: "Database", type: "statuspage", baseUrl: "https://status.supabase.com", icon: "supabase" },
  { id: "render", name: "Render", category: "Infra", type: "statuspage", baseUrl: "https://status.render.com", icon: "render" },
  { id: "asana", name: "Asana", category: "Productivity", type: "statuspage", baseUrl: "https://status.asana.com", icon: "asana" },
  { id: "intercom", name: "Intercom", category: "Support", type: "statuspage", baseUrl: "https://www.finstatus.com", icon: "intercom" },
  { id: "canva", name: "Canva", category: "Design", type: "statuspage", baseUrl: "https://www.canvastatus.com", icon: "canva" },
  { id: "gcloud", name: "Google Cloud", category: "Infra", type: "gcloud", baseUrl: "https://status.cloud.google.com", icon: "googlecloud" },
  { id: "epicgames", name: "Epic Games", category: "Games", type: "statuspage", baseUrl: "https://status.epicgames.com", icon: "epicgames" },
  { id: "twitch", name: "Twitch", category: "Games", type: "statuspage", baseUrl: "https://status.twitch.tv", icon: "twitch" },
  { id: "uber", name: "Uber", category: "Apps", type: "statuspage", baseUrl: "https://uber.statuspage.io", icon: "uber" },
  { id: "shopify", name: "Shopify", category: "Apps", type: "statuspage", baseUrl: "https://status.shopify.com", icon: "shopify" },
  { id: "coinbase", name: "Coinbase", category: "Apps", type: "statuspage", baseUrl: "https://status.coinbase.com", icon: "coinbase" },
  { id: "sentry", name: "Sentry", category: "Monitoring", type: "statuspage", baseUrl: "https://status.sentry.io", icon: "sentry" },
  { id: "newrelic", name: "New Relic", category: "Monitoring", type: "statuspage", baseUrl: "https://status.newrelic.com", icon: "newrelic" },
  { id: "airtable", name: "Airtable", category: "Productivity", type: "statuspage", baseUrl: "https://status.airtable.com", icon: "airtable" },
  { id: "miro", name: "Miro", category: "Productivity", type: "statuspage", baseUrl: "https://status.miro.com", icon: "miro" },
  { id: "trello", name: "Trello", category: "Productivity", type: "statuspage", baseUrl: "https://status.trello.com", icon: "trello" },
  { id: "postman", name: "Postman", category: "Dev Tools", type: "statuspage", baseUrl: "https://status.postman.com", icon: "postman" },
  { id: "bitbucket", name: "Bitbucket", category: "Dev Tools", type: "statuspage", baseUrl: "https://status.bitbucket.org", icon: "bitbucket" },
  { id: "hashicorp", name: "HashiCorp", category: "Dev Tools", type: "statuspage", baseUrl: "https://status.hashicorp.com", icon: "hashicorp" },
  { id: "clerk", name: "Clerk", category: "Dev Tools", type: "statuspage", baseUrl: "https://status.clerk.com", icon: "clerk" },
  { id: "contentful", name: "Contentful", category: "Dev Tools", type: "statuspage", baseUrl: "https://status.contentful.com", icon: "contentful" },
  { id: "flyio", name: "Fly.io", category: "Infra", type: "statuspage", baseUrl: "https://status.fly.io", icon: "flydotio" },
  { id: "linode", name: "Linode", category: "Infra", type: "statuspage", baseUrl: "https://status.linode.com", icon: "linode" },
  { id: "elastic", name: "Elastic Cloud", category: "Infra", type: "statuspage", baseUrl: "https://status.elastic.co", icon: "elastic" },
  { id: "upstash", name: "Upstash", category: "Database", type: "statuspage", baseUrl: "https://status.upstash.com", icon: "upstash" },
  { id: "convex", name: "Convex", category: "Database", type: "statuspage", baseUrl: "https://status.convex.dev", icon: "convex" },
  { id: "mailgun", name: "Mailgun", category: "Comms", type: "statuspage", baseUrl: "https://status.mailgun.com", icon: "mailgun" },
  { id: "1password", name: "1Password", category: "Security", type: "statuspage", baseUrl: "https://status.1password.com", icon: "1password" },
  { id: "heygen", name: "HeyGen", category: "AI", type: "statuspage", baseUrl: "https://status.heygen.com", icon: "heygen" },
  { id: "elevenlabs", name: "ElevenLabs", category: "AI", type: "statuspage", baseUrl: "https://status.elevenlabs.io", icon: "elevenlabs" },
  { id: "grammarly", name: "Grammarly", category: "Apps", type: "statuspage", baseUrl: "https://status.grammarly.com", icon: "grammarly" },
  { id: "medium", name: "Medium", category: "Apps", type: "statuspage", baseUrl: "https://status.medium.com", icon: "medium" },
  { id: "robinhood", name: "Robinhood", category: "Apps", type: "statuspage", baseUrl: "https://status.robinhood.com", icon: "robinhood" },
  { id: "pinterest", name: "Pinterest", category: "Social", type: "statuspage", baseUrl: "https://status.pinterest.com", icon: "pinterest" },
  { id: "duolingo", name: "Duolingo", category: "Apps", type: "statuspage", baseUrl: "https://status.duolingo.com", icon: "duolingo" },
  { id: "strava", name: "Strava", category: "Apps", type: "statuspage", baseUrl: "https://status.strava.com", icon: "strava" },
  { id: "dailymotion", name: "Dailymotion", category: "Media", type: "statuspage", baseUrl: "https://status.dailymotion.com", icon: "dailymotion" },
  { id: "vimeo", name: "Vimeo", category: "Media", type: "statuspage", baseUrl: "https://status.vimeo.com", icon: "vimeo" },
];

export function getProvider(id: string): Provider | undefined {
  return PROVIDERS.find((p) => p.id === id);
}
