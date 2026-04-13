// mockData.js — The single source of truth for all fake fleet data
// Every screen and component reads from here note:  nothing is hardcoded elsewhere
// "export" makes these variables available to any file that imports them

// ============================================================
// VEHICLES ARRAY
// Each object represents one truck/van in the fleet
// ============================================================
export const vehicles = [
  {
    id: 1,              // unique identifier — used to find/select a specific vehicle
    name: "Van #1",     // display name shown in the UI
    type: "van",        // vehicle category — used by filter buttons (van / pickup)
    status: "healthy",  // overall health status — drives colour coding throughout the app
    oil: 78,            // oil health as a percentage (0-100) — below 40 = warning
    brakes: 82,         // brake pad wear remaining as a percentage — below 20 = critical
    battery: 12.8,      // battery voltage — healthy range is 12.4V–12.9V
    temp: 91,           // engine temperature in Celsius — above 100 = warning
  },
  {
    id: 2,
    name: "Van #2",
    type: "van",
    status: "critical", // this vehicle triggers the red alert banner on the dashboard
    oil: 23,            // low oil — warning territory
    brakes: 12,         // CRITICAL — only 12% brake pad remaining, must be serviced
    battery: 12.1,      // slightly low battery voltage
    temp: 103,          // overheating — above 100°C threshold
  },
  {
    id: 3,
    name: "Van #3",
    type: "van",
    status: "healthy",
    oil: 91,
    brakes: 74,
    battery: 12.9,
    temp: 88,
  },
  {
    id: 4,
    name: "Van #4",
    type: "van",
    status: "warning",  // warning — not critical yet but needs attention soon
    oil: 41,            // oil approaching low threshold
    brakes: 55,         // brakes at midpoint — worth monitoring
    battery: 11.8,      // below healthy voltage range
    temp: 97,           // elevated temperature, not yet critical
  },
  {
    id: 5,
    name: "Pickup #1",
    type: "pickup",
    status: "healthy",
    oil: 85,
    brakes: 90,
    battery: 12.7,
    temp: 89,
  },
  {
    id: 6,
    name: "Pickup #2",
    type: "pickup",
    status: "healthy",
    oil: 67,
    brakes: 78,
    battery: 12.6,
    temp: 92,
  },
  {
    id: 7,
    name: "Pickup #3",
    type: "pickup",
    status: "warning",
    oil: 38,            // oil below 40 — approaching warning threshold
    brakes: 61,
    battery: 11.9,      // slightly low voltage
    temp: 95,
  },
  {
    id: 8,
    name: "Pickup #4",
    type: "pickup",
    status: "healthy",
    oil: 72,
    brakes: 88,
    battery: 12.5,
    temp: 90,
  },
]

// ============================================================
// ACTIVE ALERT
// Represents the ONE critical issue currently requiring action
// This populates the red banner on Dashboard and the full
// Maintenance screen booking flow
// ============================================================
export const activeAlert = {
  vehicle: "Van #2",                            // which vehicle triggered the alert
  issue: "Brake wear critical — 12% remaining", // the human-readable problem description
  mechanic: "Alex R.",                          // assigned mechanic's name
  mechanicCert: "Red Seal Certified",           // certification — builds trust with fleet manager
  mechanicRating: "4.9★",                       // rating shown on maintenance screen
  mechanicJobs: 847,                            // job count — social proof
  location: "407 9 Ave SE, Calgary AB",         // service location address
  arrival: "Tonight at 11:00 PM",               // when the mechanic arrives
  duration: "~45 minutes",                      // estimated job duration
  estimatedSavings: "$2,400",                   // money saved vs emergency breakdown repair
}

// ============================================================
// HELPER: STATUS CONFIG
// Maps a status string to its display colour and label
// Used by components to avoid repeating colour logic everywhere
// ============================================================
export const statusConfig = {
  healthy:  { color: "#16a34a", label: "Healthy",  pill: "bg-green-900 text-green-400"  },
  warning:  { color: "#d97706", label: "Warning",  pill: "bg-amber-900 text-amber-400"  },
  critical: { color: "#dc2626", label: "Critical", pill: "bg-red-900 text-red-400"      },
}

// ============================================================
// HELPER: BAR COLOR
// Given a percentage value, returns the right health colour
// Used by progress bars, metric cards, and stat panels
// ============================================================
export function getBarColor(value) {
  if (value >= 70) return "#16a34a" // green — healthy
  if (value >= 40) return "#d97706" // amber — warning
  return "#dc2626"                  // red — critical
}