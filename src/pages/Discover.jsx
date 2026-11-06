import { useState } from 'react'
import { ArrowUpDown, Bookmark, Search, X } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import StudentCard from '../components/StudentCard.jsx'
import ConnectModal from '../components/ConnectModal.jsx'

// Tab 1: the recommender system's suggestions.
function Discover({
  currentUser,
  students,
  sentRequestIds,
  partnerIds,
  savedIds,
  onToggleSave,
  onSendRequest,
  onCancelRequest,
  onOpenChat,
}) {
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [selectedCourse, setSelectedCourse] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('matchScore')

  const filteredStudents = students
    .filter((student) => {
      if (selectedCourse === 'saved') return savedIds.includes(student.id)
      if (selectedCourse !== 'all' && !student.sharedCourses.includes(selectedCourse)) return false
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase()
        const matchesName = student.name.toLowerCase().includes(query)
        const matchesSkill = student.skills.some((skill) => skill.toLowerCase().includes(query))
        const matchesCourse = student.sharedCourses.some((course) => course.toLowerCase().includes(query))
        return matchesName || matchesSkill || matchesCourse
      }
      return true
    })
    .sort((a, b) => {
      if (sortBy === 'skills') return b.breakdown.skills - a.breakdown.skills
      if (sortBy === 'schedule') return b.breakdown.schedule - a.breakdown.schedule
      return b.matchScore - a.matchScore
    })

  function handleSend(studentId, customMessage, course) {
    onSendRequest(studentId, customMessage, course)
    setSelectedStudent(null)
  }

  return (
    <div>
      <PageHeader
        title={`Γεια σου, ${currentUser.firstName}`}
        subtitle="Προτάσεις για σένα, με βάση τα μαθήματα, τις δεξιότητες και το πρόγραμμά σου."
      />

      <div className="space-y-2.5 bg-white px-5 pb-3">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Αναζήτηση δεξιότητας ή ονόματος..."
              className="w-full rounded-xl bg-gray-100 py-1.5 pl-8 pr-7 text-xs text-gray-800 placeholder:text-gray-400 focus:bg-white focus:ring-1 focus:ring-indigo-500 focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Καθαρισμός αναζήτησης"
                className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="relative flex items-center">
            <ArrowUpDown size={13} className="pointer-events-none absolute left-2.5 text-gray-500" />
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              aria-label="Ταξινόμηση προτάσεων"
              className="cursor-pointer rounded-xl bg-gray-100 py-1.5 pl-7 pr-2.5 text-xs font-medium text-gray-700 hover:bg-gray-200 focus:outline-none"
            >
              <option value="matchScore">Ταίριασμα %</option>
              <option value="skills">Δεξιότητες</option>
              <option value="schedule">Κοινές ώρες</option>
            </select>
          </div>
        </div>

        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          {['all', 'saved', ...currentUser.courses].map((course) => (
            <button
              key={course}
              onClick={() => setSelectedCourse(course)}
              className={`flex shrink-0 cursor-pointer items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium ${
                selectedCourse === course ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {course === 'saved' && <Bookmark size={12} fill={selectedCourse === 'saved' ? 'currentColor' : 'none'} />}
              {course === 'all'
                ? 'Όλα τα μαθήματα'
                : course === 'saved'
                  ? `Αποθηκευμένα (${savedIds.length})`
                  : course}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4 p-4">
        <p className="text-xs text-gray-500">
          Με πράσινο: δεξιότητες που ψάχνεις εσύ ή που ψάχνουν από σένα.
        </p>
        {filteredStudents.map((student) => (
          <StudentCard
            key={student.id}
            student={student}
            currentUser={currentUser}
            isSent={sentRequestIds.includes(student.id)}
            isPartner={partnerIds.includes(student.id)}
            isSaved={savedIds.includes(student.id)}
            onToggleSave={onToggleSave}
            onConnect={setSelectedStudent}
            onCancelRequest={onCancelRequest}
            onOpenChat={onOpenChat}
          />
        ))}
        {filteredStudents.length === 0 && (
          <div className="rounded-2xl bg-white py-10 text-center ring-1 ring-gray-100">
            <p className="text-sm text-gray-500">Δεν βρέθηκαν προτάσεις με αυτά τα φίλτρα.</p>
            <button
              type="button"
              onClick={() => {
                setSelectedCourse('all')
                setSearchQuery('')
              }}
              className="mt-2 cursor-pointer text-xs font-semibold text-indigo-600 hover:underline"
            >
              Επαναφορά φίλτρων
            </button>
          </div>
        )}
      </div>

      {selectedStudent && (
        <ConnectModal student={selectedStudent} onClose={() => setSelectedStudent(null)} onSend={handleSend} />
      )}
    </div>
  )
}

export default Discover
