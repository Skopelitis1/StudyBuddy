import { useState } from 'react'
import { CalendarDays, Clock, Library, Minus, Moon, Plus, Sunrise, Target, Video, X } from 'lucide-react'
import Avatar from '../components/Avatar.jsx'
import { extraCoursesPool, extraSkillsPool, gradeGoalOptions, studyTimeOptions } from '../data/mockData.js'

const preferenceIcons = {
  'night-owl': Moon,
  'early-bird': Sunrise,
  weekend: CalendarDays,
  online: Video,
  library: Library,
}

function levelLabel(level) {
  if (level >= 80) return 'Προχωρημένο'
  if (level >= 60) return 'Μέτριο'
  return 'Βασικό'
}

// Tab 3: the user's own profile. All sections are interactive.
function Profile({
  user,
  preferences,
  activePreferences,
  onTogglePreference,
  onUpdateSkillLevel,
  onAddSkill,
  onRemoveSkill,
  onToggleLookingFor,
  onToggleCourse,
  onCycleStudyTime,
  onCycleGradeGoal,
  sentCount,
  partnerCount,
}) {
  const [showAddSkill, setShowAddSkill] = useState(false)

  const stats = [
    { label: 'Προτάσεις', value: 3 },
    { label: 'Αιτήματα που έστειλες', value: sentCount },
    { label: 'Συνεργάτες', value: partnerCount },
  ]

  const currentSkillNames = user.skills.map((s) => s.name)
  const addableSkills = extraSkillsPool.filter((skill) => !currentSkillNames.includes(skill))

  return (
    <div>
      <div className="flex flex-col items-center bg-white px-5 pb-5 pt-6 text-center">
        <Avatar initials={user.initials} color={user.avatarColor} size="lg" />
        <h1 className="mt-3 text-xl font-bold text-gray-900">{user.name}</h1>
        <p className="text-sm text-gray-500">
          {user.department} · {user.year}
        </p>
        <div className="mt-2.5 flex flex-wrap justify-center gap-2 text-xs">
          <button
            type="button"
            onClick={onCycleStudyTime}
            title={`Πάτα για αλλαγή (${studyTimeOptions.join(', ')})`}
            className="flex cursor-pointer items-center gap-1 rounded-full bg-indigo-50 px-3 py-1 font-medium text-indigo-700 hover:bg-indigo-100"
          >
            <Clock size={13} /> {user.studyTime}
          </button>
          <button
            type="button"
            onClick={onCycleGradeGoal}
            title={`Πάτα για αλλαγή (${gradeGoalOptions.join(', ')})`}
            className="flex cursor-pointer items-center gap-1 rounded-full bg-indigo-50 px-3 py-1 font-medium text-indigo-700 hover:bg-indigo-100"
          >
            <Target size={13} /> Στόχος {user.gradeGoal}
          </button>
        </div>
        <div className="mt-4 grid w-full grid-cols-3 gap-2">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-xl bg-gray-50 p-2">
              <p className="text-lg font-bold text-indigo-600">{stat.value}</p>
              <p className="text-[11px] leading-tight text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4 p-4">
        <section className="rounded-2xl bg-white p-4 ring-1 ring-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Οι δεξιότητές μου</h2>
            <button
              type="button"
              onClick={() => setShowAddSkill(!showAddSkill)}
              className="flex cursor-pointer items-center gap-1 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600 hover:bg-indigo-100"
            >
              <Plus size={14} /> Προσθήκη
            </button>
          </div>
          <p className="mt-1 text-xs text-gray-500">Ρύθμισε το επίπεδό σου με τα κουμπιά − / +.</p>

          {showAddSkill && addableSkills.length > 0 && (
            <div className="mt-2.5 rounded-xl bg-gray-50 p-2.5">
              <p className="mb-1.5 text-xs font-medium text-gray-600">Επίλεξε δεξιότητα για προσθήκη:</p>
              <div className="flex flex-wrap gap-1.5">
                {addableSkills.map((skillName) => (
                  <button
                    key={skillName}
                    type="button"
                    onClick={() => {
                      onAddSkill(skillName)
                      setShowAddSkill(false)
                    }}
                    className="cursor-pointer rounded-full bg-white px-2.5 py-1 text-xs font-medium text-gray-700 shadow-2xs ring-1 ring-gray-200 hover:bg-indigo-50 hover:text-indigo-700"
                  >
                    + {skillName}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-3 space-y-3">
            {user.skills.map((skill) => (
              <div key={skill.name}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-800">{skill.name}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-gray-500">
                      {levelLabel(skill.level)} ({skill.level}%)
                    </span>
                    <button
                      type="button"
                      onClick={() => onUpdateSkillLevel(skill.name, -10)}
                      aria-label={`Μείωση ${skill.name}`}
                      className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200"
                    >
                      <Minus size={12} />
                    </button>
                    <button
                      type="button"
                      onClick={() => onUpdateSkillLevel(skill.name, 10)}
                      aria-label={`Αύξηση ${skill.name}`}
                      className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200"
                    >
                      <Plus size={12} />
                    </button>
                    {user.skills.length > 1 && (
                      <button
                        type="button"
                        onClick={() => onRemoveSkill(skill.name)}
                        aria-label={`Αφαίρεση ${skill.name}`}
                        className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-md text-gray-400 hover:bg-rose-50 hover:text-rose-600"
                      >
                        <X size={12} />
                      </button>
                    )}
                  </div>
                </div>
                <div className="mt-1.5 h-2 rounded-full bg-gray-100">
                  <div
                    className="h-2 rounded-full bg-indigo-500 transition-all"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl bg-white p-4 ring-1 ring-gray-100">
          <h2 className="font-semibold text-gray-900">Ψάχνω κάποιον που ξέρει</h2>
          <p className="mt-1 text-xs text-gray-500">
            Πάτα για προσθήκη ή αφαίρεση. Ενημερώνει τα πράσινα badges στις προτάσεις.
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {extraSkillsPool.map((skill) => {
              const isSelected = user.lookingFor.includes(skill)
              return (
                <button
                  key={skill}
                  type="button"
                  onClick={() => onToggleLookingFor(skill)}
                  aria-pressed={isSelected}
                  className={`cursor-pointer rounded-full px-2.5 py-1 text-xs font-medium ${
                    isSelected
                      ? 'bg-emerald-100 text-emerald-800 ring-1 ring-emerald-300'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {isSelected ? `✓ ${skill}` : `+ ${skill}`}
                </button>
              )
            })}
          </div>
        </section>

        <section className="rounded-2xl bg-white p-4 ring-1 ring-gray-100">
          <h2 className="font-semibold text-gray-900">Μαθήματα εξαμήνου</h2>
          <p className="mt-1 text-xs text-gray-500">Πάτα για να επιλέξεις τα μαθήματα που παρακολουθείς.</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {extraCoursesPool.map((course) => {
              const isEnrolled = user.courses.includes(course)
              return (
                <button
                  key={course}
                  type="button"
                  onClick={() => onToggleCourse(course)}
                  aria-pressed={isEnrolled}
                  className={`cursor-pointer rounded-full px-2.5 py-1 text-xs font-medium ${
                    isEnrolled
                      ? 'bg-indigo-100 text-indigo-800 ring-1 ring-indigo-300'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {isEnrolled ? `✓ ${course}` : `+ ${course}`}
                </button>
              )
            })}
          </div>
        </section>

        <section className="rounded-2xl bg-white p-4 ring-1 ring-gray-100">
          <h2 className="font-semibold text-gray-900">Προτιμήσεις διαβάσματος</h2>
          <p className="mt-1 text-xs text-gray-500">Πάτα για να τις αλλάξεις. Ο αλγόριθμος τις χρησιμοποιεί για τις ώρες διαβάσματος.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {preferences.map((preference) => {
              const Icon = preferenceIcons[preference.id]
              const isActive = activePreferences.includes(preference.id)
              return (
                <button
                  key={preference.id}
                  onClick={() => onTogglePreference(preference.id)}
                  aria-pressed={isActive}
                  className={`flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium ${
                    isActive ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Icon size={16} /> {preference.label}
                </button>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Profile
