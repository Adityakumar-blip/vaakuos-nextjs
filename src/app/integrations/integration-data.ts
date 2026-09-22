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
  /** Short badge shown on each row; also used to group the directory. */
  category: string;
  /** Which way data moves, e.g. "Shopify → VaakuOS" or "VaakuOS → Slack". */
  flow: string;
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
    flow: "Shopify → VaakuOS",
    description:
      "Orders, carts, customers and discount codes sync in, so VaakuOS can message a shopper the moment they leave checkout or a package ships.",
    longDescription:
      "Connect Shopify so VaakuOS sees carts, orders and customer activity as they happen. Message a shopper on WhatsApp when they abandon checkout, confirm on email once an order ships, and keep one record per customer without custom storefront code.",
    status: "Live",
    sync: "2 min setup",
    logo: "shopify",
    setupTime: "2 minutes",
    authMethod: "Shopify app install",
    dataSynced: ["Customers", "Carts", "Orders", "Discount codes"],
    setupSteps: [
      "Install the VaakuOS app from your Shopify admin or integration link.",
      "Approve access for carts, customers, orders, and discount creation.",
      "Choose the storefront events and messaging channels you want to activate.",
      "Run a test abandoned checkout and confirm the event appears in VaakuOS.",
    ],
    bestFor: ["DTC stores", "Multi-channel follow-ups", "Fast launch"],
  },
  {
    slug: "woocommerce",
    name: "WooCommerce",
    category: "Commerce",
    flow: "WooCommerce → VaakuOS",
    description:
      "The WordPress plugin sends cart sessions, orders, products and customer profiles, so you can message shoppers without leaving WordPress.",
    longDescription:
      "Install the WooCommerce plugin to send cart activity, order outcomes and customer fields into VaakuOS. Set up follow-ups for abandoned carts and order updates while keeping the WordPress admin your team already knows.",
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
      "Place a test order to verify the message and its attribution.",
    ],
    bestFor: ["WordPress stores", "Plugin-led setup", "Order updates"],
  },
  {
    slug: "bigcommerce",
    name: "BigCommerce",
    category: "Commerce",
    flow: "BigCommerce → VaakuOS",
    description:
      "Storefront events, customers, orders and catalog context sync in through OAuth, so a follow-up knows what a shopper looked at.",
    longDescription:
      "BigCommerce sends storefront behaviour and order data to VaakuOS, so you can message shoppers with the right product context and measure which follow-ups lead to a sale.",
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
    bestFor: ["Growing commerce teams", "Catalog-aware follow-ups", "Beta rollout"],
  },
  {
    slug: "magento-2",
    name: "Magento 2",
    category: "Commerce",
    flow: "Magento 2 → VaakuOS",
    description:
      "Quotes, customers, orders and webhook events sync through an API key, built for a staged enterprise rollout.",
    longDescription:
      "Magento 2 teams connect through API credentials and webhooks for a controlled setup. Message customers about abandoned quotes and completed orders while QA runs on staging before production traffic is enabled.",
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
    flow: "VaakuOS → HubSpot",
    description:
      "Contacts, deals, lifecycle stages and message activity write to the HubSpot timeline, so sales sees what a customer was told.",
    longDescription:
      "Sync VaakuOS message activity into HubSpot so sales and lifecycle teams see WhatsApp, email, Instagram and Messenger conversations directly on contacts, deals and timelines.",
    status: "Live",
    sync: "Timeline",
    logo: "hubspot",
    setupTime: "6 minutes",
    authMethod: "HubSpot OAuth",
    dataSynced: ["Contacts", "Deals", "Timeline events", "Lifecycle stages"],
    setupSteps: [
      "Connect HubSpot from VaakuOS using an admin account.",
      "Map VaakuOS customer fields to HubSpot contact properties.",
      "Choose which message events should be written to the CRM timeline.",
      "Open a test contact and confirm the VaakuOS activity card is visible.",
    ],
    bestFor: ["Lifecycle teams", "Sales handoff", "CRM visibility"],
  },
  {
    slug: "salesforce",
    name: "Salesforce",
    category: "CRM",
    flow: "VaakuOS ↔ Salesforce",
    description:
      "Leads, accounts and opportunities sync both ways, with message status written back so revenue teams route follow-ups by field rules.",
    longDescription:
      "Salesforce integration routes qualified message signals to revenue teams with field mapping, ownership rules and status updates that sync in both directions.",
    status: "Beta",
    sync: "Bi-sync",
    logo: "salesforce",
    setupTime: "15 minutes",
    authMethod: "Connected app OAuth",
    dataSynced: ["Leads", "Accounts", "Opportunities", "Message status"],
    setupSteps: [
      "Authorize VaakuOS with a Salesforce connected app user.",
      "Map lead, account, and opportunity fields to your CRM schema.",
      "Define ownership and routing rules for high-value message events.",
      "Test bi-directional status updates with a sandbox record.",
    ],
    bestFor: ["Revenue operations", "Complex CRM rules", "Enterprise handoff"],
  },
  {
    slug: "klaviyo",
    name: "Klaviyo",
    category: "Marketing",
    flow: "VaakuOS → Klaviyo",
    description:
      "Profiles, custom events and message outcomes flow out, so email and SMS flows can use the same customer context.",
    longDescription:
      "Klaviyo receives VaakuOS message and cart events so marketers can personalize email and SMS flows using the same customer context VaakuOS uses for WhatsApp, Instagram and Messenger.",
    status: "Live",
    sync: "Events",
    logo: "klaviyo",
    setupTime: "8 minutes",
    authMethod: "Private API key",
    dataSynced: ["Profiles", "Custom events", "Cart context", "Message outcomes"],
    setupSteps: [
      "Create a Klaviyo private API key with profile and event permissions.",
      "Paste the key into VaakuOS and select the target account.",
      "Map VaakuOS events to Klaviyo metric names for flows.",
      "Trigger a test event and confirm it appears on a profile.",
    ],
    bestFor: ["Email flows", "SMS campaigns", "Audience enrichment"],
  },
  {
    slug: "zapier",
    name: "Zapier",
    category: "Automation",
    flow: "VaakuOS → Zapier",
    description:
      "Message triggers, customer fields and cart value push out to 5,000+ apps, no code required.",
    longDescription:
      "Zapier lets non-technical teams connect VaakuOS triggers, such as a recovered order or an abandoned cart, to spreadsheets, CRMs, support tools and custom notification paths.",
    status: "Live",
    sync: "Triggers",
    logo: "zapier",
    setupTime: "5 minutes",
    authMethod: "Zapier connection",
    dataSynced: ["Message triggers", "Customer fields", "Cart value", "Campaign state"],
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
    flow: "VaakuOS → Slack",
    description:
      "Alerts, digests and escalations land in your channels, so the team knows when a high-value message needs a human.",
    longDescription:
      "Slack brings VaakuOS alerts into team channels for high-value carts, failed automations, recovered orders and daily performance summaries.",
    status: "Live",
    sync: "Alerts",
    logo: "slack",
    setupTime: "3 minutes",
    authMethod: "Slack OAuth",
    dataSynced: ["Alerts", "Digests", "Escalations", "Recovery milestones"],
    setupSteps: [
      "Authorize VaakuOS in Slack and choose a workspace.",
      "Select the channels for alerts and operational escalations.",
      "Configure alert thresholds by cart value, segment, or campaign.",
      "Send a test notification and confirm formatting in Slack.",
    ],
    bestFor: ["Team visibility", "Ops escalation", "Daily reporting"],
  },
  {
    slug: "google-sheets",
    name: "Google Sheets",
    category: "Data",
    flow: "VaakuOS → Google Sheets",
    description:
      "Rows for campaign metrics, customer records and order outcomes export automatically, for teams who report in a spreadsheet.",
    longDescription:
      "Google Sheets exports VaakuOS message and campaign data into a live spreadsheet for lightweight reporting and manual review, no dashboard login required.",
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
    flow: "Wix → VaakuOS",
    description:
      "Carts, customers, orders and storefront events are planned to sync in for Wix stores on the waitlist.",
    longDescription:
      "Wix support is planned for stores that want VaakuOS message follow-ups with minimal setup and native checkout event capture.",
    status: "Coming soon",
    sync: "Waitlist",
    logo: "wix",
    setupTime: "Planned",
    authMethod: "Marketplace app",
    dataSynced: ["Carts", "Customers", "Orders", "Storefront events"],
    setupSteps: [
      "Join the Wix integration waitlist from VaakuOS.",
      "Share your storefront setup and messaging channel requirements.",
      "Review the beta install guide when your workspace is enabled.",
      "Validate checkout events with the VaakuOS launch team.",
    ],
    bestFor: ["Wix storefronts", "Early access", "Guided beta"],
  },
  {
    slug: "webflow",
    name: "Webflow",
    category: "Sites",
    flow: "Webflow → VaakuOS",
    description:
      "Forms, page intent and UTM context are planned to route in, so a campaign lead can trigger a message automatically.",
    longDescription:
      "Webflow integration is designed for teams that capture campaign intent through landing pages and want those events routed into VaakuOS follow-ups.",
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
