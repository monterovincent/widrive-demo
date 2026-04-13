// Sidebar.jsx — The left navigation panel of the WiDrive app
// This component renders the logo, nav items, and user profile at the bottom
// It receives two props from App.jsx:
//   - activeScreen: a string telling it which screen is currently active
//   - setActiveScreen: a function it calls to switch screens when a nav item is clicked

// "import React" is not needed in modern React (v17+) but we import useState if needed
// Here we don't need any local state — the parent App.jsx owns the screen state

// We import our data to know how many warnings/critical alerts exist
// This lets us show the red notification badges on the nav items
import { vehicles } from '../data/mockData'

// ============================================================
// SIDEBAR COMPONENT
// Props destructured from the incoming props object:
//   activeScreen — the string 'dashboard', 'vehicles', or 'maintenance'
//   setActiveScreen — the function that updates activeScreen in App.jsx
// ============================================================
function Sidebar({ activeScreen, setActiveScreen }) {

  // Count how many vehicles need attention (warning or critical status)
  // .filter() creates a NEW array containing only items where the condition is true
  // v => v.status !== 'healthy' means: keep vehicle if its status is NOT healthy
  // .length gives us the count of that filtered array
  const alertCount = vehicles.filter(v => v.status !== 'healthy').length

  // Count ONLY critical vehicles — used for the maintenance badge
  // Here we check specifically for status === 'critical'
  const criticalCount = vehicles.filter(v => v.status === 'critical').length

  // ============================================================
  // NAV ITEMS ARRAY
  // Instead of copy-pasting the same nav item HTML 3 times,
  // we define the nav items as data and loop over them below
  // Each object has:
  //   id — matches the activeScreen state value in App.jsx
  //   label — the text displayed in the nav
  //   badge — a number to show in the red dot (null means no badge)
  //   icon — an SVG path string for the nav icon
  // ============================================================
  const navItems = [
    {
      id: 'dashboard',    // clicking this sets activeScreen to 'dashboard'
      label: 'Dashboard', // text shown in the sidebar
      badge: null,        // no badge on dashboard nav item
      // SVG path for a grid/dashboard icon
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2">
          {/* Four squares arranged in a 2x2 grid — represents a dashboard */}
          <rect x="3" y="3" width="7" height="7"/>
          <rect x="14" y="3" width="7" height="7"/>
          <rect x="14" y="14" width="7" height="7"/>
          <rect x="3" y="14" width="7" height="7"/>
        </svg>
      ),
    },
    {
      id: 'vehicles',
      label: 'Vehicles',
      badge: alertCount,  // shows count of vehicles needing attention
      // SVG path for a truck/vehicle icon
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2">
          {/* Truck body, cab, wheels */}
          <path d="M1 3h15v13H1z"/>
          <path d="M16 8h4l3 3v5h-7V8z"/>
          <circle cx="5.5" cy="18.5" r="2.5"/>
          <circle cx="18.5" cy="18.5" r="2.5"/>
        </svg>
      ),
    },
    {
      id: 'maintenance',
      label: 'Maintenance',
      badge: criticalCount, // shows count of CRITICAL alerts only
      // SVG path for a wrench/tool icon
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
        </svg>
      ),
    },
  ]

  // ============================================================
  // JSX RETURN — what actually renders on screen
  // Everything inside return() is JSX — looks like HTML but is React
  // ============================================================
  return (
    // Outer container — full height, fixed 240px width, dark background
    // "flex flex-col" stacks children vertically (logo on top, nav middle, user bottom)
    // "h-screen" makes it span the full viewport height
    <div className="w-[240px] min-w-[240px] bg-[#111111] border-r border-[#1f2937]
                    flex flex-col h-screen">

      {/* ── LOGO SECTION ── */}
      {/* border-b adds the subtle dividing line below the logo */}
      <div className="px-5 py-5 border-b border-[#1f2937]">
        <div className="flex items-center gap-3">

          {/* Logo icon — blue square with a truck SVG inside */}
          <div className="w-8 h-8 bg-[#2563eb] rounded-lg flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="white" strokeWidth="2.5">
              <path d="M1 3h15v13H1z"/>
              <path d="M16 8h4l3 3v5h-7V8z"/>
              <circle cx="5.5" cy="18.5" r="2.5"/>
              <circle cx="18.5" cy="18.5" r="2.5"/>
            </svg>
          </div>

          {/* Logo text stack — "WiDrive" large, "Fleet Intelligence" small below */}
          <div>
            <div className="text-[#f9fafb] font-bold text-lg leading-none
                            tracking-tight">
              WiDrive
            </div>
            <div className="text-[#9ca3af] text-[11px] mt-0.5">
              Fleet Intelligence
            </div>
          </div>

        </div>
      </div>

      {/* ── NAVIGATION SECTION ── */}
      {/* "flex-1" makes this section grow and fill all available space */}
      {/* pushing the user profile section to the very bottom */}
      <nav className="flex-1 py-4">

        {/* Section label — "FLEET" in small uppercase letters */}
        <div className="px-4 pb-2 text-[10px] font-semibold text-[#4b5563]
                        uppercase tracking-widest">
          Fleet
        </div>

        {/* Loop over navItems array and render one nav button per item */}
        {/* .map() transforms each item in the array into JSX */}
        {/* The "key" prop is required by React when rendering lists — */}
        {/* it helps React track which item is which when the list updates */}
        {navItems.map((item) => (
          <button
            key={item.id}

            // onClick fires when the user clicks this nav item
            // It calls setActiveScreen (from App.jsx) with this item's id
            // That updates the activeScreen state, which re-renders App.jsx
            // which then shows the correct screen
            onClick={() => setActiveScreen(item.id)}

            // Dynamic className — uses a ternary to apply different styles
            // based on whether this nav item is the currently active screen
            // Ternary syntax: condition ? 'if true' : 'if false'
            // If activeScreen matches this item's id → apply active (blue) styles
            // Otherwise → apply default (grey) styles
            className={`
              w-full flex items-center gap-2.5 px-4 py-2.5 text-[13.5px]
              transition-colors duration-150 relative
              ${activeScreen === item.id
                ? 'bg-[rgba(37,99,235,0.12)] text-[#2563eb] font-medium'
                : 'text-[#9ca3af] hover:bg-[#1a1a1a] hover:text-[#f9fafb]'
              }
            `}
          >
            {/* Active indicator — the blue left border strip */}
            {/* Only renders when this item is the active screen */}
            {/* "&&" function meaning: if the left side is true, render the right side */}
            {activeScreen === item.id && (
              <div className="absolute left-0 top-0 bottom-0 w-[3px]
                              bg-[#2563eb] rounded-r-sm"/>
            )}

            {/* Nav icon — colour inherits from the button's text colour */}
            {/* "currentColor" in the SVG means it matches the parent text colour */}
            <span className={activeScreen === item.id
              ? 'text-[#2563eb]' : 'text-[#6b7280]'}>
              {item.icon}
            </span>

            {/* Nav label text */}
            <span className="flex-1 text-left">{item.label}</span>

            {/* Badge — only renders if badge value exists AND is greater than 0 */}
            {/* badge && badge > 0 means: badge is not null AND not zero */}
            {item.badge && item.badge > 0 && (
              <span className="bg-[#dc2626] text-white text-[10px] font-semibold
                               px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                {item.badge}
              </span>
            )}

          </button>
        ))}

      </nav>

      {/* ── USER PROFILE SECTION ── */}
      {/* Sits at the bottom because the nav section above has flex-1 */}
      <div className="px-4 py-3 border-t border-[#1f2937]">
        <div className="flex items-center gap-2.5">

          {/* Avatar circle — initials "JD" on a blue background */}
          <div className="w-8 h-8 rounded-full bg-[#2563eb] flex items-center
                          justify-center text-white text-[11px] font-semibold
                          flex-shrink-0">
            JD
          </div>

          {/* Name and role stacked vertically */}
          <div>
            <div className="text-[#f9fafb] text-[12.5px] font-medium leading-none">
              Jordan D.
            </div>
            <div className="text-[#9ca3af] text-[11px] mt-0.5">
              Fleet Manager
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}

// Export the component so App.jsx can import and use it
export default Sidebar