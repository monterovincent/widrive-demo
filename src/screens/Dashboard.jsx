// Import everything we need from mockData
import { vehicles, activeAlert, statusConfig, getBarColor } from '../data/mockData'
import MetricCard from '../components/MetricCard'

function Dashboard({ setActiveScreen }) {

  // ── COMPUTED FLEET AVERAGES ──
  // These calculate real averages from the vehicles array
  // instead of hardcoding numbers

  // reduce() adds all brake values together, then we divide by total vehicles
  // e.g. (82+12+74+55+90+78+61+88) / 8 = 67.5 → rounded to 68
  const avgBrakes = Math.round(
    vehicles.reduce((sum, v) => sum + v.brakes, 0) / vehicles.length
  )

  // Same pattern for oil health average
  const avgOil = Math.round(
    vehicles.reduce((sum, v) => sum + v.oil, 0) / vehicles.length
  )

  // Average battery voltage — kept to 1 decimal place with toFixed(1)
  // e.g. 12.4875 becomes "12.5"
  const avgBattery = (
    vehicles.reduce((sum, v) => sum + v.battery, 0) / vehicles.length
  ).toFixed(1)

  // Average engine temperature — rounded to whole number
  const avgTemp = Math.round(
    vehicles.reduce((sum, v) => sum + v.temp, 0) / vehicles.length
  )

  // ── HEALTH METRICS ARRAY ──
  // Instead of copy-pasting bar HTML 4 times, we define the bars as data
  // and loop over them below — same pattern as navItems in Sidebar.jsx
  // Each object has everything one bar needs to render:
  //   label — the text shown above the bar
  //   value — the display value shown on the right
  //   percent — the width of the filled bar (0-100)
  //   color — the fill colour of the bar
  const healthMetrics = [
    {
      label: 'Avg Brake Health',
      value: `${avgBrakes}%`,      // e.g. "68%"
      percent: avgBrakes,           // drives the bar width
      color: getBarColor(avgBrakes) // green/amber/red based on value
    },
    {
      label: 'Avg Oil Health',
      value: `${avgOil}%`,
      percent: avgOil,
      color: getBarColor(avgOil)
    },
    {
      // Battery: convert voltage to a 0-100 percentage for the bar width
      // Healthy battery is 12.4V-12.9V
      // We map this range: 11.5V = 0%, 13V = 100%
      // Formula: (actual - min) / (max - min) * 100
      label: 'Battery (avg)',
      value: `${avgBattery}V`,
      percent: Math.round(((avgBattery - 11.5) / (13 - 11.5)) * 100),
      color: avgBattery >= 12.4 ? '#16a34a' : '#d97706'
    },
    {
      // Temperature: invert the scale because LOWER temp is healthier
      // 85°C = 100% healthy, 105°C = 0% healthy
      // Formula: 100 - ((actual - 85) / (105 - 85) * 100)
      label: 'Engine Temp (avg)',
      value: `${avgTemp}°C`,
      percent: Math.round(100 - ((avgTemp - 85) / (105 - 85)) * 100),
      color: avgTemp > 100 ? '#dc2626' : avgTemp > 95 ? '#d97706' : '#16a34a'
    },
  ]

  return (
    <div className="p-6 flex flex-col gap-6">

      {/* ── PAGE HEADER ── */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#f9fafb] tracking-tight">
            Fleet Overview
          </h1>
          <p className="text-sm text-[#9ca3af] mt-1">
            Monday, March 30 · 8 vehicles connected via OBD-II
          </p>
        </div>
        <div className="flex items-center gap-2 bg-[rgba(22,163,74,0.12)]
                        border border-[rgba(22,163,74,0.3)] rounded-full px-3 py-1">
          <div className="w-1.5 h-1.5 bg-[#16a34a] rounded-full"></div>
          <span className="text-xs font-medium text-[#4ade80]">Live Monitoring</span>
        </div>
      </div>

      {/* ── ALERT BANNER ── */}
      <div className="animate-pulse bg-[rgba(220,38,38,0.08)] border
                      border-[rgba(220,38,38,0.4)] rounded-xl p-4
                      flex items-center gap-3">
        <div className="w-2.5 h-2.5 bg-[#dc2626] rounded-full flex-shrink-0"></div>
        <p className="flex-1 text-sm text-[#fca5a5]">
          <strong className="text-[#f87171]">{activeAlert.vehicle} — Critical Alert: </strong>
          {activeAlert.issue}
        </p>
        <button
          onClick={() => setActiveScreen('maintenance')}
          className="text-sm text-[#2563eb] font-medium cursor-pointer
                     whitespace-nowrap hover:underline flex-shrink-0"
        >
          Book Service →
        </button>
      </div>

      {/* ── METRIC CARDS GRID ── */}
      <div className="grid grid-cols-4 gap-4">
        <MetricCard
          label="Fleet Health Score"
          value="74" unit="/ 100"
          pill="Needs Attention" pillColor="amber"
          bottomBorder="#d97706" subtext="↓ 8pts from last week"
        />
        <MetricCard
          label="Vehicles Healthy"
          value="5" unit="/ 8"
          pill="62% Healthy" pillColor="green"
          bottomBorder="#16a34a" subtext="3 need action"
        />
        <MetricCard
          label="Active Warnings"
          value="3" unit={null}
          pill="2 Warning" pillColor="amber"
          bottomBorder="#d97706" subtext="1 Critical"
        />
        <MetricCard
          label="Projected Savings"
          value="$2.4k" unit={null}
          pill="vs Reactive" pillColor="green"
          bottomBorder="#16a34a" subtext="This service cycle"
        />
      </div>

      {/* ── TWO COLUMN SECTION ── */}
      <div className="grid grid-cols-2 gap-4">

        {/* ── LEFT CARD — VEHICLE STATUS LIST ── */}
        <div className="bg-[#1a1a1a] border border-[#1f2937] rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-[#f9fafb]">Vehicle Status</h2>
            <span className="text-xs text-[#9ca3af] bg-[#111111]
                             border border-[#1f2937] px-2 py-0.5 rounded-lg">
              {vehicles.length} connected
            </span>
          </div>
          <div className="flex flex-col gap-1">
            {vehicles.map((v) => (
              <div
                key={v.id}
                className="flex items-center gap-3 px-2 py-2 rounded-lg
                           hover:bg-[#111111] cursor-pointer
                           transition-colors duration-150"
              >
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: statusConfig[v.status].color }}
                />
                <span className="flex-1 text-sm text-[#f9fafb] font-medium">
                  {v.name}
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-[#9ca3af]">Brakes</span>
                  <span className="text-xs font-semibold"
                    style={{ color: getBarColor(v.brakes) }}>
                    {v.brakes}%
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-[#9ca3af]">Oil</span>
                  <span className="text-xs font-semibold"
                    style={{ color: getBarColor(v.oil) }}>
                    {v.oil}%
                  </span>
                </div>
                <span className={`text-[10px] font-semibold px-2 py-0.5
                                 rounded-full ${statusConfig[v.status].pill}`}>
                  {statusConfig[v.status].label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT CARD — FLEET COMPONENT HEALTH ── */}
        <div className="bg-[#1a1a1a] border border-[#1f2937] rounded-xl p-4">

          {/* Card title */}
          <h2 className="text-sm font-semibold text-[#f9fafb] mb-4">
            Fleet Component Health
          </h2>

          {/* Loop over healthMetrics array — same .map() pattern as vehicles */}
          {/* Each item becomes one labelled progress bar */}
          <div className="flex flex-col gap-4">
            {healthMetrics.map((metric) => (

              // Each bar section — label row on top, bar track below
              // "key={metric.label}" — unique key required by React for lists
              <div key={metric.label}>

                {/* Label row — metric name on left, value on right */}
                {/* flex justify-between — pushes name and value to opposite ends */}
                <div className="flex justify-between items-center mb-1.5">

                  {/* Metric name e.g. "Avg Brake Health" */}
                  <span className="text-xs text-[#9ca3af]">
                    {metric.label}
                  </span>

                  {/* Metric value e.g. "68%" or "12.5V" */}
                  {/* font-semibold — slightly bold so it stands out */}
                  <span className="text-xs font-semibold text-[#f9fafb]">
                    {metric.value}
                  </span>

                </div>

                {/* Bar track — the grey background the coloured fill sits on */}
                {/* w-full — spans full width of the card */}
                {/* h-1.5 — 6px tall, a thin sleek bar */}
                {/* bg-[#111111] — dark grey track background */}
                {/* rounded-full — fully rounded ends on the track */}
                {/* overflow-hidden — clips the fill bar to the track's rounded corners */}
                <div className="w-full h-1.5 bg-[#111111] rounded-full overflow-hidden">

                  {/* The coloured fill bar — sits inside the track */}
                  {/* h-full — fills the full height of the track */}
                  {/* rounded-full — rounded ends on the fill */}
                  {/* style={{ width: metric.percent + '%' }} — sets fill width dynamically */}
                  {/* e.g. if avgBrakes is 68, width becomes "68%" */}
                  {/* style={{ background: metric.color }} — green/amber/red fill colour */}
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${metric.percent}%`,
                      background: metric.color
                    }}
                  />

                </div>

              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  )
}

export default Dashboard