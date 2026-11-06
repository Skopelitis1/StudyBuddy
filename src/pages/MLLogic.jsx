import { useState } from 'react'
import { BookOpen, Clock, Info, Minus, Plus, Puzzle, RotateCcw, Target } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'

// Example for the "Skills" category. A is what the user NEEDS, B is what Alex KNOWS.
const skillNames = ['UI Design', 'React', 'Στατιστική', 'Java', 'Python']
const initialUserNeeds = [1.0, 0.8, 0.3, 0.1, 0.0]
const initialAlexKnows = [0.8, 0.7, 0.1, 0.2, 0.1]

const features = [
  { icon: BookOpen, title: 'Κοινά μαθήματα', text: 'Ποια μαθήματα παρακολουθείτε και οι δύο.' },
  { icon: Puzzle, title: 'Δεξιότητες', text: 'Τι ξέρει ο καθένας και σε ποιο επίπεδο.' },
  { icon: Clock, title: 'Ώρες διαβάσματος', text: 'Πρωί, απόγευμα, βράδυ, Σαββατοκύριακο.' },
  { icon: Target, title: 'Στόχος βαθμού', text: 'Πόσο ψηλά θέλει να φτάσει ο καθένας.' },
]

function Step({ number, title, action, children }) {
  return (
    <section className="rounded-2xl bg-white p-4 ring-1 ring-gray-100">
      <div className="flex items-center justify-between gap-2">
        <h2 className="flex items-center gap-2 font-semibold text-gray-900">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
            {number}
          </span>
          {title}
        </h2>
        {action}
      </div>
      <div className="mt-3 space-y-3 text-sm text-gray-700">{children}</div>
    </section>
  )
}

// Tab 4: how the recommender system works, with an interactive vector playground in Step 4.
function MLLogic() {
  const [userNeeds, setUserNeeds] = useState(initialUserNeeds)
  const [alexKnows, setAlexKnows] = useState(initialAlexKnows)

  const isModified =
    userNeeds.some((v, i) => v !== initialUserNeeds[i]) || alexKnows.some((v, i) => v !== initialAlexKnows[i])

  function adjustValue(vector, setVector, index, delta) {
    const next = [...vector]
    const updated = Math.round(Math.min(1, Math.max(0, next[index] + delta)) * 10) / 10
    next[index] = updated
    setVector(next)
  }

  function handleReset() {
    setUserNeeds(initialUserNeeds)
    setAlexKnows(initialAlexKnows)
  }

  // Plain arithmetic for the worked example, so the numbers on the page always agree.
  const dotProduct = userNeeds.reduce((sum, value, i) => sum + value * alexKnows[i], 0)
  const lengthA = Math.sqrt(userNeeds.reduce((sum, value) => sum + value * value, 0))
  const lengthB = Math.sqrt(alexKnows.reduce((sum, value) => sum + value * value, 0))
  const cosine = lengthA * lengthB > 0 ? dotProduct / (lengthA * lengthB) : 0
  const skillsScore = Number(cosine.toFixed(2))

  const finalScores = [
    { label: 'Δεξιότητες', value: skillsScore },
    { label: 'Κοινά μαθήματα', value: 0.95 },
    { label: 'Ώρες διαβάσματος', value: 0.94 },
    { label: 'Στόχος βαθμού', value: 0.97 },
  ]

  const average = finalScores.reduce((sum, item) => sum + item.value, 0) / finalScores.length
  const alexFinalScore = Number(average.toFixed(2))

  const ranking = [
    { name: 'Αλέξης', score: alexFinalScore },
    { name: 'Μαρία', score: 0.88 },
    { name: 'Νίκος', score: 0.74 },
  ].sort((a, b) => b.score - a.score)

  return (
    <div>
      <PageHeader
        title="Πώς βγαίνει το ποσοστό;"
        subtitle="Σύστημα συστάσεων με ομοιότητα διανυσμάτων (cosine similarity)."
      />

      <div className="space-y-4 p-4">
        <Step number={1} title="Κάθε φοιτητής γίνεται διάνυσμα">
          <p>Από το προφίλ κάθε φοιτητή φτιάχνουμε αριθμούς από 0 έως 1, σε τέσσερις κατηγορίες:</p>
          <div className="grid grid-cols-2 gap-2">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <div key={feature.title} className="rounded-xl bg-gray-50 p-3">
                  <Icon size={18} className="text-indigo-600" />
                  <p className="mt-1 text-xs font-semibold text-gray-900">{feature.title}</p>
                  <p className="text-xs text-gray-500">{feature.text}</p>
                </div>
              )
            })}
          </div>
        </Step>

        <Step number={2} title="Συμπληρωματικές δεξιότητες">
          <p>
            Στις δεξιότητες δεν ψάχνουμε κάποιον ίδιο με σένα. Συγκρίνουμε <b>τι σου λείπει</b> με <b>τι ξέρει ο άλλος</b>.
            Στα μαθήματα, στις ώρες και στον στόχο βαθμού θέλουμε να μοιάζετε.
          </p>
        </Step>

        <Step number={3} title="Ο τύπος">
          <p className="rounded-xl bg-indigo-50 p-3 text-center font-mono text-base text-indigo-900">
            cos(θ) = (A · B) / (‖A‖ × ‖B‖)
          </p>
          <p>
            Το αποτέλεσμα είναι από 0 έως 1. Όσο πιο κοντά στο 1, τόσο καλύτερο το ταίρι. Η απόσταση συνημιτόνου
            (cosine distance) είναι 1 − cos(θ), άρα το καλύτερο ταίρι έχει τη μικρότερη απόσταση.
          </p>
        </Step>

        <Step
          number={4}
          title="Παράδειγμα: εσύ και ο Αλέξης"
          action={
            isModified && (
              <button
                type="button"
                onClick={handleReset}
                className="flex cursor-pointer items-center gap-1 rounded-lg bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-600 hover:bg-indigo-100"
              >
                <RotateCcw size={12} /> Επαναφορά
              </button>
            )
          }
        >
          <p className="text-xs text-gray-500">
            Δοκίμασε να αλλάξεις τις τιμές με τα κουμπιά − / + για να δεις πώς αλλάζει ζωντανά το cos(θ):
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-gray-500">
                  <th className="py-1 font-medium">Δεξιότητα</th>
                  <th className="py-1 text-right font-medium">A: σου λείπει</th>
                  <th className="py-1 text-right font-medium">B: ξέρει ο Αλέξης</th>
                </tr>
              </thead>
              <tbody>
                {skillNames.map((skill, i) => (
                  <tr key={skill} className="border-t border-gray-100">
                    <td className="py-1.5 font-medium text-gray-800">{skill}</td>
                    <td className="py-1.5 text-right">
                      <div className="inline-flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => adjustValue(userNeeds, setUserNeeds, i, -0.1)}
                          aria-label={`Μείωση A για ${skill}`}
                          className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-sm bg-gray-100 text-gray-600 hover:bg-gray-200"
                        >
                          <Minus size={10} />
                        </button>
                        <span className="w-7 text-center font-mono">{userNeeds[i].toFixed(1)}</span>
                        <button
                          type="button"
                          onClick={() => adjustValue(userNeeds, setUserNeeds, i, 0.1)}
                          aria-label={`Αύξηση A για ${skill}`}
                          className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-sm bg-gray-100 text-gray-600 hover:bg-gray-200"
                        >
                          <Plus size={10} />
                        </button>
                      </div>
                    </td>
                    <td className="py-1.5 text-right">
                      <div className="inline-flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => adjustValue(alexKnows, setAlexKnows, i, -0.1)}
                          aria-label={`Μείωση B για ${skill}`}
                          className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-sm bg-gray-100 text-gray-600 hover:bg-gray-200"
                        >
                          <Minus size={10} />
                        </button>
                        <span className="w-7 text-center font-mono">{alexKnows[i].toFixed(1)}</span>
                        <button
                          type="button"
                          onClick={() => adjustValue(alexKnows, setAlexKnows, i, 0.1)}
                          aria-label={`Αύξηση B για ${skill}`}
                          className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-sm bg-gray-100 text-gray-600 hover:bg-gray-200"
                        >
                          <Plus size={10} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="space-y-1 rounded-xl bg-gray-50 p-3 font-mono text-xs">
            <p>A · B = {userNeeds.map((value, i) => `${value.toFixed(1)}×${alexKnows[i].toFixed(1)}`).join(' + ')}</p>
            <p>A · B = {dotProduct.toFixed(2)}</p>
            <p>‖A‖ = {lengthA.toFixed(2)}, ‖B‖ = {lengthB.toFixed(2)}</p>
            <p className="font-bold text-indigo-700">
              cos(θ) = {dotProduct.toFixed(2)} / ({lengthA.toFixed(2)} × {lengthB.toFixed(2)}) = {cosine.toFixed(2)}
            </p>
          </div>
          <p>Ο Αλέξης ξέρει σχεδόν όλα όσα σου λείπουν, γι' αυτό η ομοιότητα στις δεξιότητες είναι {cosine.toFixed(2)}.</p>
        </Step>

        <Step number={5} title="Τελικό ποσοστό και κατάταξη">
          <p>Το ίδιο γίνεται για κάθε κατηγορία. Το τελικό ποσοστό είναι ο μέσος όρος:</p>
          <div className="space-y-1 rounded-xl bg-gray-50 p-3 text-xs">
            {finalScores.map((item) => (
              <p key={item.label} className="flex justify-between">
                <span>{item.label}</span>
                <span className="font-mono">{item.value.toFixed(2)}</span>
              </p>
            ))}
            <p className="flex justify-between border-t border-gray-200 pt-1 font-bold text-indigo-700">
              <span>Μέσος όρος</span>
              <span className="font-mono">{average.toFixed(2)} = {Math.round(average * 100)}%</span>
            </p>
          </div>
          <p>Οι προτάσεις εμφανίζονται από το μεγαλύτερο ποσοστό προς το μικρότερο:</p>
          <ol className="space-y-1">
            {ranking.map((item, index) => (
              <li key={item.name} className="flex justify-between rounded-lg bg-gray-50 px-3 py-1.5 text-xs">
                <span>
                  {index + 1}. {item.name}
                </span>
                <span className="font-mono">
                  cos = {item.score.toFixed(2)}, απόσταση = {(1 - item.score).toFixed(2)}
                </span>
              </li>
            ))}
          </ol>
        </Step>

        <p className="flex gap-2 rounded-xl bg-amber-50 p-3 text-xs text-amber-900">
          <Info size={16} className="shrink-0" />
          Σε αυτό το mockup τα ποσοστά είναι έτοιμα δεδομένα. Η πραγματική εφαρμογή θα τα υπολογίζει από τα προφίλ όλων των
          φοιτητών.
        </p>
      </div>
    </div>
  )
}

export default MLLogic
