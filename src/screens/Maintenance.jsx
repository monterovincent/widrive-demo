import { useState } from 'react'
import { activeAlert, vehicles, getBarColor } from '../data/mockData'

function Maintenance() {

  const [bookingStarted, setBookingStarted] = useState(false)
  const [currentStep, setCurrentStep] = useState(-1)
  const [bookingComplete, setBookingComplete] = useState(false)

  const bookingSteps = [
    { label: 'Booking confirmed',  sub: 'Service request sent to Alex R.' },
    { label: 'Mechanic notified',  sub: 'ETA confirmation received' },
    { label: 'Parts reserved',     sub: 'Brake pads sourced from local supplier' },
    { label: 'Service tonight',    sub: 'Van #2 ready for tomorrow' },
  ]

  const van2 = vehicles.find(v => v.id === 2)

  function handleBooking() {
    setBookingStarted(true)
    bookingSteps.forEach((step, index) => {
      setTimeout(() => {
        setCurrentStep(index)
        if (index === bookingSteps.length - 1) {
          setTimeout(() => setBookingComplete(true), 700)
        }
      }, index * 700)
    })
  }

  return (
    <div className="p-6 flex flex-col gap-6 max-w-3xl">

      {/* ── PAGE HEADER ── */}
      <div>
        <h1 className="text-2xl font-bold text-[#f9fafb] tracking-tight">
          Maintenance
        </h1>
        <p className="text-sm text-[#9ca3af] mt-1">
          1 critical alert · Service booking available
        </p>
      </div>

      {/* ── CRITICAL ALERT CARD ── */}
      <div className="bg-[rgba(220,38,38,0.08)] border border-[rgba(220,38,38,0.25)]
                      rounded-xl p-5">
        <div className="flex gap-3 mb-4">
          <div className="w-10 h-10 bg-[rgba(220,38,38,0.15)] rounded-lg
                          flex items-center justify-center flex-shrink-0">
            <span className="text-lg">⚠</span>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-[#f9fafb]">
              {activeAlert.vehicle} — Brake System Critical
            </h2>
            <p className="text-xs text-[#9ca3af] mt-1 leading-relaxed">
              Brake pad wear at 12% remaining. Vehicle must be serviced
              before next dispatch or risk brake failure.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          <div className="bg-[#111111] rounded-lg p-3">
            <p className="text-[10px] text-[#9ca3af] uppercase tracking-wide mb-1">Brake Wear</p>
            <p className="text-sm font-bold" style={{ color: getBarColor(van2.brakes) }}>
              {van2.brakes}% remaining
            </p>
          </div>
          <div className="bg-[#111111] rounded-lg p-3">
            <p className="text-[10px] text-[#9ca3af] uppercase tracking-wide mb-1">Oil Health</p>
            <p className="text-sm font-bold" style={{ color: getBarColor(van2.oil) }}>
              {van2.oil}%
            </p>
          </div>
          <div className="bg-[#111111] rounded-lg p-3">
            <p className="text-[10px] text-[#9ca3af] uppercase tracking-wide mb-1">Engine Temp</p>
            <p className="text-sm font-bold"
               style={{ color: van2.temp > 100 ? '#dc2626' : '#d97706' }}>
              {van2.temp}°C
            </p>
          </div>
          <div className="bg-[#111111] rounded-lg p-3">
            <p className="text-[10px] text-[#9ca3af] uppercase tracking-wide mb-1">Battery</p>
            <p className="text-sm font-bold text-[#f9fafb]">{van2.battery}V</p>
          </div>
        </div>
      </div>
      {/* ── END CRITICAL ALERT CARD ── */}

      {/* ── MECHANIC CARD ── */}
      <div className="bg-[#1a1a1a] border border-[#1f2937] rounded-xl p-5">
        <h2 className="text-sm font-semibold text-[#f9fafb] mb-4">
          Assigned Mechanic
        </h2>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 bg-[#2563eb] rounded-full flex items-center
                          justify-center text-white text-sm font-bold flex-shrink-0">
            AR
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-[#f9fafb]">{activeAlert.mechanic}</p>
            <p className="text-xs text-[#9ca3af] mt-0.5">
              {activeAlert.mechanicCert} · {activeAlert.mechanicRating} · {activeAlert.mechanicJobs} jobs
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full
                           bg-[rgba(22,163,74,0.15)] text-[#4ade80]">
            Available Tonight
          </span>
        </div>

        {/* Map */}
        <div className="relative h-36 bg-[#111111] rounded-xl overflow-hidden mb-4">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'linear-gradient(#1f2937 1px, transparent 1px), linear-gradient(90deg, #1f2937 1px, transparent 1px)',
              backgroundSize: '30px 30px'
            }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                            w-8 h-8 rounded-full border-2 border-[rgba(37,99,235,0.4)]
                            animate-ping"/>
            <div className="relative z-10 w-3 h-3 bg-[#2563eb] rounded-full border-2 border-white"/>
          </div>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
            <span className="text-xs text-[#9ca3af] bg-[#1a1a1a] px-3 py-1
                             rounded-full border border-[#1f2937] whitespace-nowrap">
              {activeAlert.location}
            </span>
          </div>
        </div>

        {/* Arrival and Duration */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#111111] rounded-lg p-3">
            <p className="text-[10px] text-[#9ca3af] uppercase tracking-wide mb-1">Arrival</p>
            <p className="text-sm font-semibold text-[#f9fafb]">{activeAlert.arrival}</p>
          </div>
          <div className="bg-[#111111] rounded-lg p-3">
            <p className="text-[10px] text-[#9ca3af] uppercase tracking-wide mb-1">Est. Duration</p>
            <p className="text-sm font-semibold text-[#f9fafb]">{activeAlert.duration}</p>
          </div>
        </div>
      </div>
      {/* ── END MECHANIC CARD ── */}

      {/* ── SAVINGS BADGE ── */}
      <div className="flex items-center gap-3 bg-[rgba(22,163,74,0.08)]
                      border border-[rgba(22,163,74,0.2)] rounded-xl p-4">
        <span className="text-2xl">💰</span>
        <div>
          <p className="text-lg font-bold text-[#4ade80]">
            {activeAlert.estimatedSavings} saved
          </p>
          <p className="text-xs text-[#9ca3af] mt-0.5">
            vs. emergency roadside brake failure repair
          </p>
        </div>
      </div>

      {/* ── BOOKING BUTTON ── */}
      <button
        onClick={handleBooking}
        disabled={bookingStarted}
        className={`w-full py-3 rounded-xl text-sm font-bold
                    transition-all duration-300
                    ${bookingComplete
                      ? 'bg-[#16a34a] text-white cursor-default'
                      : bookingStarted
                        ? 'bg-[#1f2937] text-[#6b7280] cursor-not-allowed'
                        : 'bg-[#2563eb] text-white hover:bg-[#1d4ed8] cursor-pointer'
                    }`}
      >
        {bookingComplete
          ? '✓ Service Booked for Tonight'
          : bookingStarted
            ? 'Booking...'
            : 'Confirm & Book Service Tonight'
        }
      </button>

      {/* ── ANIMATED PROGRESS STEPS ── */}
      {/* Only appears after booking button is clicked */}
      {bookingStarted && (
        <div className="bg-[#1a1a1a] border border-[#1f2937] rounded-xl p-5">
          <p className="text-xs text-[#9ca3af] mb-4 uppercase tracking-wide">
            Booking confirmation
          </p>
          <div className="flex flex-col">
            {bookingSteps.map((step, index) => (
              <div key={index} className="flex items-start gap-3 relative">

                {/* Vertical connector line between steps */}
                {index < bookingSteps.length - 1 && (
                  <div className="absolute left-[11px] top-6 w-[2px] h-8 bg-[#1f2937]"/>
                )}

                {/* Step circle — grey pending, blue active, green done */}
                <div className={`w-6 h-6 rounded-full border-2 flex-shrink-0 z-10
                                mt-0.5 text-[10px] font-bold flex justify-center
                                items-center transition-all duration-500
                                ${index < currentStep
                                  ? 'bg-[#16a34a] border-[#16a34a] text-white'
                                  : index === currentStep
                                    ? 'bg-[#2563eb] border-[#2563eb] text-white animate-pulse'
                                    : 'bg-transparent border-[#374151] text-[#6b7280]'
                                }`}>
                  {index < currentStep ? '✓' : index + 1}
                </div>

                {/* Step label and subtitle */}
                <div className="pb-6">
                  <p className={`text-sm font-medium transition-colors duration-500
                                ${index <= currentStep
                                  ? 'text-[#f9fafb]'
                                  : 'text-[#6b7280]'
                                }`}>
                    {step.label}
                  </p>
                  <p className="text-xs text-[#9ca3af] mt-0.5">{step.sub}</p>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}

export default Maintenance