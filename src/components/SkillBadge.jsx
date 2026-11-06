import { Check } from 'lucide-react'

// A small skill label. "highlight" marks a skill that matters for the match.
function SkillBadge({ name, highlight = false }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
        highlight ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-700'
      }`}
    >
      {highlight && <Check size={12} strokeWidth={3} />}
      {name}
    </span>
  )
}

export default SkillBadge
