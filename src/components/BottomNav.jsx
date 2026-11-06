import { BrainCircuit, Inbox, Sparkles, User } from 'lucide-react'

const tabs = [
  { id: 'discover', label: 'Προτάσεις', icon: Sparkles },
  { id: 'requests', label: 'Αιτήματα', icon: Inbox },
  { id: 'profile', label: 'Προφίλ', icon: User },
  { id: 'ml', label: 'Αλγόριθμος', icon: BrainCircuit },
]

function BottomNav({ activeTab, onTabChange, requestCount }) {
  return (
    <nav className="flex shrink-0 border-t border-gray-200 bg-white pb-[max(0.25rem,env(safe-area-inset-bottom))]">
      {tabs.map((tab) => {
        const Icon = tab.icon
        const isActive = tab.id === activeTab
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`relative flex flex-1 cursor-pointer flex-col items-center gap-1 py-2 text-xs font-medium ${
              isActive ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Icon size={22} strokeWidth={isActive ? 2.4 : 2} />
            {tab.label}
            {tab.id === 'requests' && requestCount > 0 && (
              <span className="absolute right-1/2 top-1 translate-x-5 rounded-full bg-rose-500 px-1.5 text-[10px] font-bold text-white">
                {requestCount}
              </span>
            )}
          </button>
        )
      })}
    </nav>
  )
}

export default BottomNav
