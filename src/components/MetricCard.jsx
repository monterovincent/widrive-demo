// MetricCard.jsx — A reusable card component used 4 times on the Dashboard
// Instead of writing the same card HTML 4 times, we write it once here
// and pass different data into it each time via props
//
// Props this component receives:
//   label — the small text above the number e.g. "Fleet Health Score"
//   value — the main large number e.g. "74"
//   unit — the smaller text after the number e.g. "/ 100"
//   pill — the small status badge text e.g. "Needs Attention"
//   pillColor — which colour the pill should be: 'green', 'amber', or 'red'
//   bottomBorder — the colour of the thin line at the bottom of the card
//   subtext — the small muted text below the pill e.g. "↓ 8pts from last week"

function MetricCard({ label, value, unit, pill, pillColor, bottomBorder, subtext }) {

  // pillColor prop determines which colour classes to apply to the badge
  // This is a lookup object — same concept as statusConfig in mockData
  // instead of writing if/else, we look up the right classes by colour name
  const pillStyles = {
    green: 'bg-[rgba(22,163,74,0.15)] text-[#4ade80]',   // green background, green text
    amber: 'bg-[rgba(217,119,6,0.15)] text-[#fbbf24]',   // amber background, amber text
    red:   'bg-[rgba(220,38,38,0.15)] text-[#f87171]',   // red background, red text
  }

  return (
    // The card outer container
    // bg-[#1a1a1a] — dark card background from CLAUDE.md spec
    // border border-[#1f2937] — subtle border around the card
    // rounded-xl — rounded corners on the card
    // p-4 — padding inside the card
    // flex flex-col — stacks label, value, footer vertically
    // gap-2 — 8px space between each section
    // relative — needed so the bottom border can be positioned absolutely
    // overflow-hidden — clips the bottom border to the card's rounded corners
    <div className="bg-[#1a1a1a] border border-[#1f2937] rounded-xl p-4
                    flex flex-col gap-2 relative overflow-hidden">

      {/* ── LABEL ── */}
      {/* The small uppercase text at the top of the card */}
      {/* text-xs — extra small font size */}
      {/* uppercase tracking-wide — all caps with slightly wider letter spacing */}
      {/* text-[#9ca3af] — muted grey colour */}
      <p className="text-xs uppercase tracking-wide text-[#9ca3af] font-medium">
        {label}
      </p>

      {/* ── VALUE ROW ── */}
      {/* flex items-baseline — aligns the big number and small unit on their text baselines */}
      {/* items-baseline is important here — it makes "74" and "/ 100" line up neatly */}
      {/* at the bottom of the text rather than the centre */}
      <div className="flex items-baseline gap-1">

        {/* The main large number — text-3xl makes it big and instantly readable */}
        {/* font-bold — heavy weight */}
        {/* tracking-tight — tighter letter spacing looks more professional on large numbers */}
        <span className="text-3xl font-bold text-[#f9fafb] tracking-tight">
          {value}
        </span>

        {/* The unit text next to the number — smaller and muted */}
        {/* Only renders if a unit was passed in */}
        {/* "unit &&" means: only show this if unit is not null/undefined */}
        {unit && (
          <span className="text-sm text-[#6b7280]">{unit}</span>
        )}

      </div>

      {/* ── FOOTER ROW ── */}
      {/* flex items-center gap-2 — puts pill and subtext side by side */}
      <div className="flex items-center gap-2">

        {/* The status pill badge */}
        {/* pillStyles[pillColor] looks up the right colour classes */}
        {/* e.g. pillStyles['green'] returns the green background and text classes */}
        {/* text-xs — small text */}
        {/* font-semibold — semi bold weight */}
        {/* px-2 py-0.5 — small horizontal and vertical padding */}
        {/* rounded-full — pill shape */}
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full
                         ${pillStyles[pillColor]}`}>
          {pill}
        </span>

        {/* Subtext — the small muted description next to the pill */}
        {/* text-xs — extra small */}
        {/* text-[#6b7280] — muted grey */}
        <span className="text-xs text-[#6b7280]">{subtext}</span>

      </div>

      {/* ── BOTTOM BORDER ── */}
      {/* This is the coloured line at the very bottom of the card */}
      {/* absolute — positioned relative to the card container */}
      {/* bottom-0 left-0 right-0 — stretches full width at the bottom */}
      {/* h-[3px] — exactly 3px tall */}
      {/* The colour comes from the bottomBorder prop passed in */}
      {/* style={{ background: bottomBorder }} — inline style for dynamic colour */}
      {/* We use inline style here because Tailwind can't generate dynamic colour */}
      {/* values at runtime — it only knows classes written in the source code */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[3px]"
        style={{ background: bottomBorder }}
      />

    </div>
  )
}

// Export so Dashboard.jsx can import and use it
export default MetricCard