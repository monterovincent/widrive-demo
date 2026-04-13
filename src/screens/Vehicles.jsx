// Vehicles.jsx — The second screen of the WiDrive app
// Shows all fleet vehicles in a filterable grid
// Clicking a vehicle opens a side panel with detailed health stats
//
// Props received from App.jsx:
//   setActiveScreen — allows the side panel to navigate to Maintenance

// useState lets this component remember which filter is active
// and which vehicle is currently selected
import { useState } from 'react'

// Import vehicles data and helper functions from mockData
import { vehicles, statusConfig, getBarColor } from '../data/mockData'

function Vehicles({ setActiveScreen }) {

  // ── LOCAL STATE ──

  // activeFilter — tracks which filter button is currently selected
  // Starts as 'all' so all vehicles show when screen first loads
  const [activeFilter, setActiveFilter] = useState('all')

  // selectedVehicle — tracks which vehicle the user clicked
  // Starts as null — nothing is selected when screen first loads
  // When a card is clicked, this gets set to that vehicle's id number
  const [selectedVehicle, setSelectedVehicle] = useState(null)

  // ── FILTER BUTTONS DATA ──
  // Same pattern as navItems in Sidebar — define as data, loop to render
  // Each object has:
  //   id — the filter value stored in activeFilter state
  //   label — the text shown on the button
  const filterButtons = [
    { id: 'all',     label: `All (${vehicles.length})` },
    { id: 'van',     label: `Vans (${vehicles.filter(v => v.type === 'van').length})` },
    { id: 'pickup',  label: `Pickups (${vehicles.filter(v => v.type === 'pickup').length})` },
    { id: 'action',  label: `Needs Action (${vehicles.filter(v => v.status !== 'healthy').length})` },
  ]

  // ── FILTERED VEHICLES ──
  // Calculates which vehicles to show based on activeFilter
  // This runs every time activeFilter changes
  // filter() returns a NEW array containing only matching vehicles
  const filteredVehicles = vehicles.filter(v => {
    if (activeFilter === 'all')    return true               // show all vehicles
    if (activeFilter === 'action') return v.status !== 'healthy' // show warning + critical
    return v.type === activeFilter // show only vans OR only pickups
  })

  // ── SELECTED VEHICLE OBJECT ──
  // If a vehicle is selected, find its full data object from the array
  // vehicles.find() returns the FIRST item matching the condition
  // If selectedVehicle is null, this returns undefined (no panel shown)
  const selectedVehicleData = vehicles.find(v => v.id === selectedVehicle)

  return (
    // Full height flex column — fills the entire main content area
    <div className="p-6 flex flex-col gap-6 h-full">

      {/* ── PAGE HEADER ── */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#f9fafb] tracking-tight">
            Vehicles
          </h1>
          {/* Shows count of vehicles needing attention dynamically */}
          <p className="text-sm text-[#9ca3af] mt-1">
            {vehicles.length} vehicles · {vehicles.filter(v => v.status !== 'healthy').length} require attention
          </p>
        </div>
      </div>

      {/* ── FILTER BUTTONS ── */}
      {/* flex gap-2 — puts all filter buttons in a horizontal row */}
      <div className="flex gap-2">
        {filterButtons.map((btn) => (
          <button
            key={btn.id}
            // When clicked — update activeFilter state to this button's id
            // This triggers a re-render, filteredVehicles recalculates,
            // and only matching vehicle cards appear
            onClick={() => setActiveFilter(btn.id)}

            // Dynamic className — active button gets blue style
            // inactive buttons get grey outline style
            className={`px-3 py-1.5 rounded-full text-xs font-medium
                        border transition-colors duration-150
                        ${activeFilter === btn.id
                          ? 'bg-[#2563eb] border-[#2563eb] text-white'
                          : 'bg-transparent border-[#1f2937] text-[#9ca3af] hover:border-[#374151] hover:text-[#f9fafb]'
                        }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* ── MAIN AREA — grid + optional side panel ── */}
      {/* flex gap-0 — puts vehicle grid and side panel side by side */}
      {/* flex-1 — fills remaining height after header and filters */}
      <div className="flex gap-4 flex-1 overflow-hidden">

        {/* ── VEHICLE CARDS GRID ── */}
        {/* flex-1 — takes up all space when no panel is open */}
        {/* Shrinks to make room when side panel opens */}
        {/* overflow-auto — allows scrolling if many vehicles */}
        <div className="flex-1 overflow-auto">

          {/* grid — vehicle cards in a responsive grid */}
          {/* grid-cols-2 — 2 columns when side panel is closed */}
          {/* gap-3 — 12px between cards */}
          <div className="grid grid-cols-2 gap-3">
            {filteredVehicles.map((v) => (

              // Each vehicle card
              <div
                key={v.id}
                // When clicked — set selectedVehicle to this vehicle's id
                // This triggers re-render, selectedVehicleData gets populated,
                // and the side panel appears on the right
                onClick={() => setSelectedVehicle(v.id)}
                className={`bg-[#1a1a1a] border rounded-xl p-4 cursor-pointer
                            transition-all duration-150 hover:border-[#374151]
                            ${selectedVehicle === v.id
                              ? 'border-[#2563eb] bg-[rgba(37,99,235,0.05)]'
                              : 'border-[#1f2937]'
                            }`}
              >

                {/* Card header — vehicle name and status pill */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-[#f9fafb]">
                    {v.name}
                  </span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5
                                   rounded-full ${statusConfig[v.status].pill}`}>
                    {statusConfig[v.status].label}
                  </span>
                </div>

                {/* 2x2 stat grid inside each card */}
                {/* grid-cols-2 — puts 4 stats in a 2x2 layout */}
                <div className="grid grid-cols-2 gap-2">

                  {/* Each stat box — dark inner background */}
                  {/* Brakes */}
                  <div className="bg-[#111111] rounded-lg p-2.5">
                    <p className="text-[10px] text-[#9ca3af] uppercase
                                  tracking-wide mb-1">Brakes</p>
                    <p className="text-base font-bold"
                       style={{ color: getBarColor(v.brakes) }}>
                      {v.brakes}<span className="text-xs text-[#6b7280]">%</span>
                    </p>
                  </div>

                  {/* Oil */}
                  <div className="bg-[#111111] rounded-lg p-2.5">
                    <p className="text-[10px] text-[#9ca3af] uppercase
                                  tracking-wide mb-1">Oil</p>
                    <p className="text-base font-bold"
                       style={{ color: getBarColor(v.oil) }}>
                      {v.oil}<span className="text-xs text-[#6b7280]">%</span>
                    </p>
                  </div>

                  {/* Battery */}
                  <div className="bg-[#111111] rounded-lg p-2.5">
                    <p className="text-[10px] text-[#9ca3af] uppercase
                                  tracking-wide mb-1">Battery</p>
                    <p className="text-base font-bold text-[#f9fafb]">
                      {v.battery}<span className="text-xs text-[#6b7280]">V</span>
                    </p>
                  </div>

                  {/* Temperature */}
                  <div className="bg-[#111111] rounded-lg p-2.5">
                    <p className="text-[10px] text-[#9ca3af] uppercase
                                  tracking-wide mb-1">Temp</p>
                    <p className="text-base font-bold"
                       style={{ color: v.temp > 100 ? '#dc2626' : v.temp > 94 ? '#d97706' : '#f9fafb' }}>
                      {v.temp}<span className="text-xs text-[#6b7280]">°C</span>
                    </p>
                  </div>

                </div>

              </div>
            ))}
          </div>

        </div>

        {/* ── SIDE PANEL ── */}
        {/* Only renders when a vehicle is selected */}
        {/* "selectedVehicleData &&" means: only show if a vehicle is selected */}
        {selectedVehicleData && (

          // Side panel container
          // w-72 — fixed 288px wide
          // border-l — left border separating it from the grid
          // overflow-auto — scrollable if content is tall
          <div className="w-72 min-w-[288px] bg-[#111111] border border-[#1f2937]
                          rounded-xl p-4 overflow-auto flex flex-col gap-4">

            {/* Panel header — vehicle name, status and close button */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-semibold text-[#f9fafb]">
                  {selectedVehicleData.name}
                </h3>
                {/* Vehicle type subtitle */}
                <p className="text-xs text-[#9ca3af] mt-0.5">
                  {selectedVehicleData.type === 'van' ? 'Ford Transit' : 'Ford F-150'} · OBD-II Connected
                </p>
              </div>

              {/* Close button — sets selectedVehicle back to null */}
              {/* This hides the panel */}
              <button
                onClick={() => setSelectedVehicle(null)}
                className="text-[#9ca3af] hover:text-[#f9fafb] text-lg
                           leading-none transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Status badge */}
            <span className={`text-xs font-semibold px-2 py-1 rounded-lg
                             w-fit ${statusConfig[selectedVehicleData.status].pill}`}>
              {statusConfig[selectedVehicleData.status].label}
            </span>

            {/* ── HEALTH STAT BARS ── */}
            {/* Four individual health bars for the selected vehicle */}
            <div className="flex flex-col gap-4">

              {/* We define the 4 stats as an array and map over them */}
              {/* Same data-driven pattern used throughout the project */}
              {[
                {
                  label: 'Brake Health',
                  value: `${selectedVehicleData.brakes}%`,
                  percent: selectedVehicleData.brakes,
                  color: getBarColor(selectedVehicleData.brakes)
                },
                {
                  label: 'Oil Health',
                  value: `${selectedVehicleData.oil}%`,
                  percent: selectedVehicleData.oil,
                  color: getBarColor(selectedVehicleData.oil)
                },
                {
                  label: 'Battery',
                  value: `${selectedVehicleData.battery}V`,
                  percent: Math.round(((selectedVehicleData.battery - 11.5) / 1.5) * 100),
                  color: selectedVehicleData.battery >= 12.4 ? '#16a34a' : '#d97706'
                },
                {
                  label: 'Engine Temp',
                  value: `${selectedVehicleData.temp}°C`,
                  percent: Math.round(100 - ((selectedVehicleData.temp - 85) / 20) * 100),
                  color: selectedVehicleData.temp > 100 ? '#dc2626' : selectedVehicleData.temp > 94 ? '#d97706' : '#16a34a'
                },
              ].map((stat) => (
                <div key={stat.label}
                     className="bg-[#1a1a1a] border border-[#1f2937] rounded-lg p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-[#9ca3af]">{stat.label}</span>
                    <span className="text-sm font-bold"
                          style={{ color: stat.color }}>{stat.value}</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#111111] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${stat.percent}%`, background: stat.color }}
                    />
                  </div>
                </div>
              ))}

            </div>

            {/* Book Service button — only shows for non-healthy vehicles */}
            {/* "&&" means only render if condition is true */}
            {selectedVehicleData.status !== 'healthy' && (
              <button
                onClick={() => setActiveScreen('maintenance')}
                className="w-full bg-[#2563eb] text-white text-sm font-semibold
                           py-2.5 rounded-lg hover:bg-[#1d4ed8] transition-colors
                           duration-150 mt-auto"
              >
                Book Service →
              </button>
            )}

            {/* If vehicle is healthy — show a green confirmation message */}
            {selectedVehicleData.status === 'healthy' && (
              <p className="text-center text-xs text-[#16a34a] py-2">
                ✓ No service required
              </p>
            )}

          </div>
        )}

      </div>

    </div>
  )
}

export default Vehicles