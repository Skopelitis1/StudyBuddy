import { useState } from 'react'
import { Bookmark, Check, ChevronDown, ChevronUp, Clock, MessageCircle, Sparkles, Target, UserPlus } from 'lucide-react'
import Avatar from './Avatar.jsx'
import MatchScore from './MatchScore.jsx'
import SkillBadge from './SkillBadge.jsx'

const breakdownLabels = {
  skills: 'Δεξιότητες',
  courses: 'Κοινά μαθήματα',
  schedule: 'Ώρες διαβάσματος',
  goal: 'Στόχος βαθμού',
}

// One recommended student on the Discover tab.
function StudentCard({
  student,
  currentUser,
  isSent,
  isPartner,
  isSaved,
  onToggleSave,
  onConnect,
  onCancelRequest,
  onOpenChat,
}) {
  const [showDetails, setShowDetails] = useState(false)
  const userSkillNames = currentUser.skills.map((skill) => skill.name)

  return (
    <article className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100">
      <div className="flex items-start gap-3">
        <Avatar initials={student.initials} color={student.avatarColor} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h2 className="font-semibold text-gray-900">{student.name}</h2>
            <button
              type="button"
              onClick={() => onToggleSave(student.id)}
              aria-label="Αποθήκευση προφίλ"
              title={isSaved ? 'Αφαίρεση από τα αποθηκευμένα' : 'Αποθήκευση προφίλ'}
              className={`cursor-pointer rounded-lg p-1 ${
                isSaved ? 'text-indigo-600' : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'
              }`}
            >
              <Bookmark size={16} fill={isSaved ? 'currentColor' : 'none'} />
            </button>
          </div>
          <p className="text-xs text-gray-500">
            {student.department} · {student.year}
          </p>
        </div>
        <MatchScore score={student.matchScore} />
      </div>

      <p className="mt-3 flex gap-2 rounded-xl bg-indigo-50 p-3 text-sm text-indigo-900">
        <Sparkles size={16} className="mt-0.5 shrink-0 text-indigo-500" />
        {student.explanation}
      </p>

      <div className="mt-3 space-y-2 text-sm">
        <div>
          <p className="mb-1 text-xs font-medium text-gray-500">Ξέρει</p>
          <div className="flex flex-wrap gap-1.5">
            {student.skills.map((skill) => (
              <SkillBadge key={skill} name={skill} highlight={currentUser.lookingFor.includes(skill)} />
            ))}
          </div>
        </div>
        <div>
          <p className="mb-1 text-xs font-medium text-gray-500">Ψάχνει</p>
          <div className="flex flex-wrap gap-1.5">
            {student.lookingFor.map((skill) => (
              <SkillBadge key={skill} name={skill} highlight={userSkillNames.includes(skill)} />
            ))}
          </div>
        </div>
        <div>
          <p className="mb-1 text-xs font-medium text-gray-500">Κοινά μαθήματα</p>
          <div className="flex flex-wrap gap-1.5">
            {student.sharedCourses.map((course) => (
              <span key={course} className="rounded-full bg-indigo-100 px-2.5 py-1 text-xs font-medium text-indigo-800">
                {course}
              </span>
            ))}
          </div>
        </div>
        <div className="flex gap-4 text-xs text-gray-600">
          <span className="flex items-center gap-1">
            <Clock size={14} /> {student.studyTime}
          </span>
          <span className="flex items-center gap-1">
            <Target size={14} /> Στόχος {student.gradeGoal}
          </span>
        </div>
      </div>

      {showDetails && (
        <div className="mt-3 space-y-2 rounded-xl bg-gray-50 p-3">
          {Object.keys(breakdownLabels).map((key) => (
            <div key={key}>
              <div className="flex justify-between text-xs text-gray-600">
                <span>{breakdownLabels[key]}</span>
                <span className="font-semibold">{student.breakdown[key]}%</span>
              </div>
              <div className="mt-1 h-1.5 rounded-full bg-gray-200">
                <div className="h-1.5 rounded-full bg-indigo-500" style={{ width: `${student.breakdown[key]}%` }} />
              </div>
            </div>
          ))}
          <p className="pt-1 text-xs text-gray-500">Το ποσοστό ταιριάσματος είναι ο μέσος όρος των τεσσάρων.</p>
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="-ml-2 flex cursor-pointer items-center gap-1 whitespace-nowrap rounded-xl px-2 py-2 text-[13px] font-medium text-indigo-600 hover:bg-indigo-50"
        >
          Γιατί αυτή η πρόταση;
          {showDetails ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {isPartner ? (
          <button
            onClick={() => onOpenChat(student)}
            className="ml-auto flex cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-xl bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            <MessageCircle size={16} /> Συνομιλία
          </button>
        ) : isSent ? (
          <button
            onClick={() => onCancelRequest(student.id)}
            title="Πάτα για ακύρωση αιτήματος"
            className="ml-auto flex cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-xl bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-600 hover:bg-rose-50 hover:text-rose-600"
          >
            <Check size={16} /> Στάλθηκε (Ακύρωση)
          </button>
        ) : (
          <button
            onClick={() => onConnect(student)}
            className="ml-auto flex cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-xl bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            <UserPlus size={16} /> Στείλε αίτημα
          </button>
        )}
      </div>
    </article>
  )
}

export default StudentCard
