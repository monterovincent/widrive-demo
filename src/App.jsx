// App.jsx — Root component, parent of everything
// It owns the activeScreen state and passes it down to Sidebar
import { useState } from 'react'

// Import the Sidebar component we built
import Sidebar from './components/Sidebar'

// Import the Dashboard screen  just created
import Dashboard from './screens/Dashboard'

// Import the Vehicles screen
import Vehicles from './screens/Vehicles'


//import Maintenance screen  
import Maintenance from './screens/Maintenance'


function App() {
  // activeScreen controls which screen is visible
  // Starts as 'dashboard' — the default view when the app loads
  const [activeScreen, setActiveScreen] = useState('dashboard')

  return (
    // flex — sidebar and main content sit side by side
    // h-screen — fills the full browser height
    // bg-[#0a0a0a] — WiDrive dark background
    // overflow-hidden — prevents unwanted scrollbars on the outer container
    <div className="flex h-screen bg-[#0a0a0a] text-[#f9fafb] overflow-hidden">

      {/* Sidebar receives activeScreen so it knows what to highlight */}
      {/* and setActiveScreen so it can switch screens when clicked */}
      <Sidebar activeScreen={activeScreen} setActiveScreen={setActiveScreen} />

      {/* Main content area — fills all remaining width after the 240px sidebar */}
      {/* overflow-auto — allows this area to scroll if content is tall */}
      {/* p-6 — 24px padding so content never touches the edges */}
      <div className="flex-1 overflow-auto p-6">
        {activeScreen === 'dashboard' && <Dashboard setActiveScreen={setActiveScreen} />}
        {activeScreen === 'vehicles' && <Vehicles setActiveScreen={setActiveScreen} />}
        {activeScreen === 'maintenance' && <Maintenance />}
      </div>

    </div>
  )
}

export default App