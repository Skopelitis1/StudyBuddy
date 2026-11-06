import { BatteryFull, Signal, Wifi } from 'lucide-react'

// Fake phone status bar. Hidden on real phones, they already have one.
function StatusBar() {
  return (
    <div className="relative hidden h-10 shrink-0 items-center justify-between bg-white px-6 text-sm font-semibold text-gray-900 sm:flex">
      <span>9:41</span>
      <div className="absolute left-1/2 top-2 h-6 w-24 -translate-x-1/2 rounded-full bg-gray-900" />
      <div className="flex items-center gap-1">
        <Signal size={15} />
        <Wifi size={15} />
        <BatteryFull size={18} />
      </div>
    </div>
  )
}

export default StatusBar
