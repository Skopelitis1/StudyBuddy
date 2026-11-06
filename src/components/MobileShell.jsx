import StatusBar from './StatusBar.jsx'
import BottomNav from './BottomNav.jsx'

// Looks like a phone on a laptop screen and fills the whole screen on a real phone.
function MobileShell({ activeTab, onTabChange, requestCount, children }) {
  return (
    <div className="relative mx-auto flex h-dvh w-full max-w-md flex-col overflow-hidden bg-gray-50 sm:h-[820px] sm:max-h-[calc(100dvh-3rem)] sm:w-[400px] sm:rounded-[2.5rem] sm:border-[10px] sm:border-gray-900 sm:shadow-2xl">
      <StatusBar />

      {/* key resets the scroll position when the tab changes.
          Do not make this element "relative": the modal uses the shell as its frame. */}
      <main key={activeTab} className="flex-1 overflow-y-auto">
        {children}
      </main>

      <BottomNav activeTab={activeTab} onTabChange={onTabChange} requestCount={requestCount} />
    </div>
  )
}

export default MobileShell
