// The match percentage that the recommender system gives.
function MatchScore({ score }) {
  let color = 'text-amber-600 bg-amber-50 ring-amber-200'
  if (score >= 90) color = 'text-emerald-700 bg-emerald-50 ring-emerald-200'
  else if (score >= 80) color = 'text-indigo-700 bg-indigo-50 ring-indigo-200'

  return (
    <div className={`flex shrink-0 flex-col items-center rounded-xl px-3 py-1.5 ring-1 ${color}`}>
      <span className="text-xl font-bold leading-tight">{score}%</span>
      <span className="text-[10px] font-medium">ταίριασμα</span>
    </div>
  )
}

export default MatchScore
