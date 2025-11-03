/**
 * Application constants
 */

export const APP_NAME = "GuillenIA";
export const APP_DESCRIPTION = "Portal de Gestão de Agentes de IA";

// Subscription Plans
export const PLANS = {
  FREE: {
    name: "Free",
    price: { monthly: 0, yearly: 0 },
    agents: 1,
    messages: 100,
  },
  STARTER: {
    name: "Starter",
    price: { monthly: 97, yearly: 970 },
    agents: 3,
    messages: 1000,
  },
  BUSINESS: {
    name: "Business",
    price: { monthly: 297, yearly: 2970 },
    agents: 10,
    messages: 5000,
  },
  ENTERPRISE: {
    name: "Enterprise",
    price: { monthly: 997, yearly: 9970 },
    agents: -1, // unlimited
    messages: -1, // unlimited
  },
} as const;

// Agent Configuration Defaults
export const AGENT_DEFAULTS = {
  TEMPERATURE: 0.7,
  MAX_TOKENS: 1000,
  IS_ACTIVE: false,
} as const;

// Conversation Status
export const CONVERSATION_STATUS = {
  ACTIVE: "active",
  CLOSED: "closed",
  ARCHIVED: "archived",
} as const;

// Appointment Status
export const APPOINTMENT_STATUS = {
  SCHEDULED: "scheduled",
  CONFIRMED: "confirmed",
  CANCELED: "canceled",
  COMPLETED: "completed",
} as const;

// Connection Types
export const CONNECTION_TYPES = {
  WHATSAPP: "whatsapp",
  GOOGLE_CALENDAR: "google_calendar",
} as const;

// Routes
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  AGENTS: "/agents",
  AGENTS_NEW: "/agents/new",
  AGENTS_TEMPLATES: "/agents/templates",
  CONVERSATIONS: "/conversations",
  APPOINTMENTS: "/appointments",
  REPORTS: "/reports",
  PRICING: "/pricing",
  CREATE_ORGANIZATION: "/create-organization",
} as const;

// Layout Constants
export const CONTAINER_SIZES = {
  page: "max-w-7xl",
  form: "max-w-md",
  narrow: "max-w-4xl",
  wide: "max-w-7xl",
} as const;

export const PAGE_PADDING = {
  mobile: "p-4",
  tablet: "p-6",
  desktop: "p-8",
  horizontal: {
    mobile: "px-4",
    tablet: "px-6",
    desktop: "px-8",
  },
  vertical: {
    mobile: "py-12",
    tablet: "py-16",
    desktop: "py-24",
  },
  responsive: {
    all: "p-4 sm:p-6 lg:p-8",
    horizontal: "px-4 sm:px-6 lg:px-8",
    vertical: "py-12 sm:py-16 lg:py-24",
  },
} as const;

export const HEIGHT_RULES = {
  fullscreen: "h-screen overflow-hidden",
  minimal: "min-h-screen",
  auto: "h-auto",
} as const;

export const SPACING = {
  vertical: {
    mobile: "space-y-6",
    tablet: "space-y-8",
    responsive: "space-y-6 sm:space-y-8",
  },
} as const;

