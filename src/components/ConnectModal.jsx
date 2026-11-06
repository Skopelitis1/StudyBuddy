import { useState } from 'react'
import { Send, X } from 'lucide-react'

// Pop-up with a ready message. "Αποστολή" does not send anything, it only updates the screen.
function ConnectModal({ student, onClose, onSend }) {
  const [selectedCourse, setSelectedCourse] = useState(student.suggestedCourse)
  const [activeTemplate, setActiveTemplate] = useState('project')
  const [message, setMessage] = useState(student.suggestedMessage)

  const templates = [
    {
      id: 'project',
      label: 'Για Project',
      text: student.suggestedMessage,
    },
    {
      id: 'study',
      label: 'Για Εξεταστική',
      text: `Γεια σου ${student.vocative}! Είδα ότι παρακολουθούμε μαζί το μάθημα «${selectedCourse}» και έχουμε παρόμοιο στόχο βαθμού (${student.gradeGoal}). Θέλεις να οργανώσουμε κοινό διάβασμα;`,
    },
    {
      id: 'exchange',
      label: 'Ανταλλαγή γνώσεων',
      text: `Γεια σου ${student.vocative}! Βγήκαμε ${student.matchScore}% ταίριασμα. Εγώ μπορώ να σε βοηθήσω σε ${student.lookingFor.join(' & ')} και εσύ σε ${student.skills.slice(0, 2).join(' & ')}. Κάνουμε ομάδα;`,
    },
  ]

  function handleSelectTemplate(template) {
    setActiveTemplate(template.id)
    setMessage(template.text)
  }

  function handleSelectCourse(course) {
    setSelectedCourse(course)
  }

  return (
    <div className="absolute inset-0 z-20 flex items-end bg-black/40 sm:items-center sm:p-4" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="connect-title"
        className="w-full rounded-t-3xl bg-white p-5 sm:rounded-3xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 id="connect-title" className="text-lg font-bold text-gray-900">
            Αίτημα συνεργασίας
          </h2>
          <button onClick={onClose} aria-label="Κλείσιμο" className="cursor-pointer rounded-full p-1 text-gray-400 hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        <p className="mt-3 text-sm text-gray-600">
          Προς: <span className="font-semibold text-gray-900">{student.name}</span>
        </p>

        <div className="mt-2">
          <span className="text-xs font-medium text-gray-500">Επίλεξε μάθημα:</span>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {student.sharedCourses.map((course) => (
              <button
                key={course}
                type="button"
                onClick={() => handleSelectCourse(course)}
                className={`cursor-pointer rounded-full px-2.5 py-1 text-xs font-medium ${
                  selectedCourse === course
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {course}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-3">
          <span className="text-xs font-medium text-gray-500">Έτοιμα πρότυπα μηνύματος:</span>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {templates.map((tpl) => (
              <button
                key={tpl.id}
                type="button"
                onClick={() => handleSelectTemplate(tpl)}
                className={`cursor-pointer rounded-lg px-2.5 py-1 text-xs font-medium ${
                  activeTemplate === tpl.id
                    ? 'bg-indigo-100 text-indigo-800 ring-1 ring-indigo-300'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tpl.label}
              </button>
            ))}
          </div>
        </div>

        <label htmlFor="connect-message" className="mt-3 block text-xs font-medium text-gray-500">
          Μήνυμα
        </label>
        <textarea
          id="connect-message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          rows={4}
          className="mt-1 w-full resize-none rounded-xl border border-gray-200 p-3 text-sm text-gray-800 focus:border-indigo-500 focus:outline-none"
        />

        <div className="mt-4 flex gap-2">
          <button onClick={onClose} className="flex-1 cursor-pointer rounded-xl border border-gray-200 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50">
            Ακύρωση
          </button>
          <button
            onClick={() => onSend(student.id, message, selectedCourse)}
            disabled={message.trim() === ''}
            className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-indigo-600 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            <Send size={16} /> Αποστολή
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConnectModal
