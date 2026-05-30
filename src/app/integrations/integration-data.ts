export type IntegrationStatus = "Live" | "Beta" | "Coming soon";

export type IntegrationLogo =
  | "shopify"
  | "woocommerce"
  | "bigcommerce"
  | "magento"
  | "hubspot"
  | "salesforce"
  | "klaviyo"
  | "zapier"
  | "slack"
  | "sheets"
  | "wix"
  | "webflow";

export type Integration = {
  slug: string;
  name: string;
  category: string;
  description: string;
  longDescription: string;
  status: IntegrationStatus;
  sync: string;
  logo: IntegrationLogo;
  setupTime: string;
  authMethod: string;
  dataSynced: string[];
  setupSteps: string[];
  bestFor: string[];
};

export const integrations: Integration[] = [
  {
    slug: "shopify",
    name: "Shopify",
    category: "Commerce",
    description: "Orders, carts, customers, discounts, and recovery events.",
    longDescription:
      "Connect Shopify to VaakuOS to capture abandoned checkout intent, sync customer context, and attribute recovered revenue back to orders without custom storefront code.",
    status: "Live",
    sync: "2 min setup",
    logo: "shopify",
    setupTime: "2 minutes",
    authMethod: "Shopify app install",
    dataSynced: ["Customers", "Carts", "Orders", "Discount codes"],
    setupSteps: [
      "Install the VaakuOS app from your Shopify admin or integration link.",
      "Approve access for carts, customers, orders, and discount creation.",
      "Choose the storefront events and recovery channels you want to activate.",
      "Run a test abandoned checkout and confirm the event appears in VaakuOS.",
    ],
    bestFor: ["DTC stores", "Multi-channel recovery", "Fast launch"],
  },
  {
    slug: "woocommerce",
    name: "WooCommerce",
    category: "Commerce",
    description: "WordPress plugin with cart, order, and customer sync.",
    longDescription:
      "Use the WooCommerce plugin to send cart activity, order outcomes, and customer fields into VaakuOS while keeping setup manageable for WordPress teams.",
    status: "Live",
    sync: "Plugin",
    logo: "woocommerce",
    setupTime: "5 minutes",
    authMethod: "WordPress plugin key",
    dataSynced: ["Cart sessions", "Orders", "Products", "Customer profile"],
    setupSteps: [
      "Install the VaakuOS plugin in WordPress and activate it.",
      "Paste your VaakuOS workspace key into the plugin settings.",
      "Select cart, checkout, and order events for synchronization.",
      "Place a test order to verify recovered revenue attribution.",
    ],
    bestFor: ["WordPress stores", "Plugin-led setup", "Order attribution"],
  },
  {
    slug: "bigcommerce",
    name: "BigCommerce",
    category: "Commerce",
    description: "Storefront events, catalog context, and order attribution.",
    longDescription:
      "BigCommerce connects storefront behavior and order data to VaakuOS so teams can recover high-intent shoppers and measure recovery impact by channel.",
    status: "Beta",
    sync: "OAuth",
    logo: "bigcommerce",
    setupTime: "10 minutes",
    authMethod: "OAuth app",
    dataSynced: ["Storefront events", "Customers", "Orders", "Catalog context"],
    setupSteps: [
      "Create or select your BigCommerce store from VaakuOS integrations.",
      "Authorize VaakuOS through the BigCommerce OAuth flow.",
      "Confirm the storefront script is enabled for checkout activity.",
      "Send a test cart event and review the event timeline.",
    ],
    bestFor: ["Growing commerce teams", "Catalog-aware recovery", "Beta rollout"],
  },
  {
    slug: "magento-2",
    name: "Magento 2",
    category: "Commerce",
    description: "Enterprise storefront recovery with flexible webhooks.",
    longDescription:
      "Magento 2 teams can connect VaakuOS through API credentials and webhooks for a controlled enterprise setup across carts, customers, and completed orders.",
    status: "Live",
    sync: "API key",
    logo: "magento",
    setupTime: "20 minutes",
    authMethod: "API key and webhook secret",
    dataSynced: ["Quotes", "Customers", "Orders", "Webhook events"],
    setupSteps: [
      "Create an integration token in Magento with cart, customer, and order scopes.",
      "Add the API key and webhook secret inside VaakuOS.",
      "Configure event endpoints for quote updates and order completion.",
      "Run QA with a staging checkout before enabling production traffic.",
    ],
    bestFor: ["Enterprise commerce", "Custom storefronts", "Staged rollout"],
  },
  {
    slug: "hubspot",
    name: "HubSpot",
    category: "CRM",
    description: "Contacts, lifecycle stages, deals, and conversation history.",
    longDescription:
      "Sync VaakuOS recovery activity into HubSpot so sales and lifecycle teams can see abandoned cart context directly on contacts, deals, and timelines.",
    status: "Live",
    sync: "Timeline",
    logo: "hubspot",
    setupTime: "6 minutes",
    authMethod: "HubSpot OAuth",
    dataSynced: ["Contacts", "Deals", "Timeline events", "Lifecycle stages"],
    setupSteps: [
      "Connect HubSpot from VaakuOS using an admin account.",
      "Map VaakuOS customer fields to HubSpot contact properties.",
      "Choose which recovery events should be written to the CRM timeline.",
      "Open a test contact and confirm the VaakuOS activity card is visible.",
    ],
    bestFor: ["Lifecycle teams", "Sales handoff", "CRM visibility"],
  },
  {
    slug: "salesforce",
    name: "Salesforce",
    category: "CRM",
    description: "Lead, account, and opportunity handoff for revenue teams.",
    longDescription:
      "Salesforce integration routes qualified recovery signals to revenue teams with field mapping, ownership rules, and bi-directional status updates.",
    status: "Beta",
    sync: "Bi-sync",
    logo: "salesforce",
    setupTime: "15 minutes",
    authMethod: "Connected app OAuth",
    dataSynced: ["Leads", "Accounts", "Opportunities", "Recovery status"],
    setupSteps: [
      "Authorize VaakuOS with a Salesforce connected app user.",
      "Map lead, account, and opportunity fields to your CRM schema.",
      "Define ownership and routing rules for high-value recovery events.",
      "Test bi-directional status updates with a sandbox record.",
    ],
    bestFor: ["Revenue operations", "Complex CRM rules", "Enterprise handoff"],
  },
  {
    slug: "klaviyo",
    name: "Klaviyo",
    category: "Marketing",
    description: "Blend VaakuOS recovery signals into email and SMS flows.",
    longDescription:
      "Klaviyo receives VaakuOS intent and recovery events so marketers can personalize email and SMS flows using richer cart and conversation context.",
    status: "Live",
    sync: "Events",
    logo: "klaviyo",
    setupTime: "8 minutes",
    authMethod: "Private API key",
    dataSynced: ["Profiles", "Custom events", "Cart context", "Recovery outcomes"],
    setupSteps: [
      "Create a Klaviyo private API key with profile and event permissions.",
      "Paste the key into VaakuOS and select the target account.",
      "Map VaakuOS events to Klaviyo metric names for flows.",
      "Trigger a test recovery event and confirm it appears on a profile.",
    ],
    bestFor: ["Email flows", "SMS campaigns", "Audience enrichment"],
  },
  {
    slug: "zapier",
    name: "Zapier",
    category: "Automation",
    description: "Trigger workflows across 5,000+ apps with no-code actions.",
    longDescription:
      "Zapier lets non-technical teams connect VaakuOS events to operational workflows, spreadsheets, CRMs, support tools, and custom notification paths.",
    status: "Live",
    sync: "Triggers",
    logo: "zapier",
    setupTime: "5 minutes",
    authMethod: "Zapier connection",
    dataSynced: ["Recovery triggers", "Customer fields", "Cart value", "Campaign state"],
    setupSteps: [
      "Choose VaakuOS as the trigger app in Zapier.",
      "Connect your VaakuOS workspace using the generated key.",
      "Pick a trigger such as recovered order, abandoned cart, or failed handoff.",
      "Test the Zap and turn it on for production events.",
    ],
    bestFor: ["No-code workflows", "Ops alerts", "Custom routing"],
  },
  {
    slug: "slack",
    name: "Slack",
    category: "Ops",
    description: "Revenue alerts, escalation messages, and daily digests.",
    longDescription:
      "Slack brings VaakuOS alerts into team channels for high-value carts, failed automations, recovered revenue, and daily performance summaries.",
    status: "Live",
    sync: "Alerts",
    logo: "slack",
    setupTime: "3 minutes",
    authMethod: "Slack OAuth",
    dataSynced: ["Alerts", "Digests", "Escalations", "Recovery milestones"],
    setupSteps: [
      "Authorize VaakuOS in Slack and choose a workspace.",
      "Select the channels for revenue alerts and operational escalations.",
      "Configure alert thresholds by cart value, segment, or campaign.",
      "Send a test notification and confirm formatting in Slack.",
    ],
    bestFor: ["Team visibility", "Ops escalation", "Daily reporting"],
  },
  {
    slug: "google-sheets",
    name: "Google Sheets",
    category: "Data",
    description: "Export customer recovery logs and campaign performance.",
    longDescription:
      "Google Sheets exports VaakuOS recovery data into a live spreadsheet for lightweight reporting, analysis, and operational review.",
    status: "Live",
    sync: "Rows",
    logo: "sheets",
    setupTime: "4 minutes",
    authMethod: "Google OAuth",
    dataSynced: ["Rows", "Campaign metrics", "Customer records", "Order outcomes"],
    setupSteps: [
      "Connect your Google account and select a spreadsheet.",
      "Choose the worksheet and columns VaakuOS should update.",
      "Pick whether rows are appended for events or updated by customer.",
      "Run a sample export and verify the row format.",
    ],
    bestFor: ["Lightweight reporting", "Manual review", "Finance exports"],
  },
  {
    slug: "wix",
    name: "Wix",
    category: "Commerce",
    description: "Capture abandoned sessions and recover shoppers on Wix.",
    longDescription:
      "Wix support is planned for teams that want VaakuOS recovery on Wix storefronts with minimal setup and native checkout event capture.",
    status: "Coming soon",
    sync: "Waitlist",
    logo: "wix",
    setupTime: "Planned",
    authMethod: "Marketplace app",
    dataSynced: ["Carts", "Customers", "Orders", "Storefront events"],
    setupSteps: [
      "Join the Wix integration waitlist from VaakuOS.",
      "Share your storefront setup and recovery channel requirements.",
      "Review the beta install guide when your workspace is enabled.",
      "Validate checkout events with the VaakuOS launch team.",
    ],
    bestFor: ["Wix storefronts", "Early access", "Guided beta"],
  },
  {
    slug: "webflow",
    name: "Webflow",
    category: "Sites",
    description: "Route forms, landing pages, and intent events into VaakuOS.",
    longDescription:
      "Webflow integration is designed for teams that capture campaign intent through landing pages and want those events routed into VaakuOS workflows.",
    status: "Coming soon",
    sync: "Waitlist",
    logo: "webflow",
    setupTime: "Planned",
    authMethod: "Site script and webhooks",
    dataSynced: ["Forms", "Page intent", "UTM context", "Webhook events"],
    setupSteps: [
      "Join the Webflow waitlist and identify the sites to connect.",
      "Prepare form fields and campaign events that should route to VaakuOS.",
      "Add the VaakuOS site script when beta access is enabled.",
      "Submit a test form and confirm the event payload in VaakuOS.",
    ],
    bestFor: ["Landing pages", "Lead capture", "Campaign intent"],
  },
];

export function getIntegration(slug: string) {
  return integrations.find((integration) => integration.slug === slug);
}
