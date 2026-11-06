import { MousePointerClick } from 'lucide-react'

const thingsToTry = [
  { tab: 'discover', text: 'Αναζήτησε δεξιότητα, αποθήκευσε προφίλ και στείλε αίτημα συνεργασίας.' },
  { tab: 'discover', text: 'Πάτα «Γιατί αυτή η πρόταση;» για να δεις την ανάλυση του ποσοστού.' },
  { tab: 'requests', text: 'Αποδέξου αιτήματα και άνοιξε τη Συνομιλία (Chat) με τους συνεργάτες σου.' },
  { tab: 'profile', text: 'Άλλαξε επίπεδα δεξιοτήτων, τι ψάχνεις, μαθήματα και προτιμήσεις.' },
  { tab: 'ml', text: 'Πειραματίσου ζωντανά με τις τιμές των διανυσμάτων στον αλγόριθμο.' },
]

// Short introduction next to the phone. Only on large screens.
function DesktopIntro({ onNavigate }) {
  return (
    <aside className="hidden max-w-sm lg:block">
      <p className="text-sm font-semibold text-indigo-600">HW1 · Interactive Mockup</p>
      <h1 className="mt-2 text-4xl font-bold text-gray-900">StudyBuddy Matcher</h1>
      <p className="mt-4 text-gray-600">
        Βρες συμφοιτητές με δεξιότητες που συμπληρώνουν τις δικές σου, για projects και διάβασμα. Ένα σύστημα συστάσεων
        προτείνει τους καλύτερους συνεργάτες με βάση μαθήματα, δεξιότητες, ώρες διαβάσματος και στόχο βαθμού.
      </p>

      <h2 className="mt-8 flex items-center gap-2 font-semibold text-gray-900">
        <MousePointerClick size={18} /> Δοκίμασε
      </h2>
      <ol className="mt-3 space-y-2">
        {thingsToTry.map((item, index) => (
          <li key={item.text}>
            <button
              onClick={() => onNavigate(item.tab)}
              className="flex w-full cursor-pointer gap-3 rounded-xl p-2 text-left text-sm text-gray-700 hover:bg-white/70"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                {index + 1}
              </span>
              {item.text}
            </button>
          </li>
        ))}
      </ol>

      <p className="mt-8 text-xs text-gray-500">Όλα τα δεδομένα είναι ενδεικτικά. Η εφαρμογή δεν έχει backend.</p>
    </aside>
  )
}

export default DesktopIntro
