import { useState } from 'react'
import MobileShell from './components/MobileShell.jsx'
import DesktopIntro from './components/DesktopIntro.jsx'
import ChatModal from './components/ChatModal.jsx'
import Discover from './pages/Discover.jsx'
import Requests from './pages/Requests.jsx'
import Profile from './pages/Profile.jsx'
import MLLogic from './pages/MLLogic.jsx'
import {
  activePreferences as initialPreferences,
  currentUser as initialUser,
  gradeGoalOptions,
  incomingRequests,
  recommendedStudents,
  studyPreferences,
  studyTimeOptions,
} from './data/mockData.js'

const extraAutoReplies = [
  'Τέλεια! Σου στέλνω το link για το κοινό μας έγγραφο.',
  'Συμφωνώ απόλυτα! Τα λέμε το απόγευμα για να το προχωρήσουμε.',
  'Πολύ καλή ιδέα! Θα έχω έτοιμο το δικό μου κομμάτι μέχρι αύριο.',
]

// The state lives here, so the clicks are kept when the user changes tab.
function App() {
  const [activeTab, setActiveTab] = useState('discover')
  const [user, setUser] = useState(initialUser)
  const [sentRequestIds, setSentRequestIds] = useState([])
  const [savedIds, setSavedIds] = useState([])
  const [requests, setRequests] = useState(incomingRequests)
  const [partners, setPartners] = useState([])
  const [activePreferences, setActivePreferences] = useState(initialPreferences)
  const [activeChatPartner, setActiveChatPartner] = useState(null)
  const [chatsByPartnerId, setChatsByPartnerId] = useState({})
  const [toastMessage, setToastMessage] = useState(null)

  function showToast(text) {
    setToastMessage(text)
    setTimeout(() => {
      setToastMessage((current) => (current === text ? null : current))
    }, 2600)
  }

  function ensurePartnerChat(partner, initialText) {
    setChatsByPartnerId((prev) => {
      if (prev[partner.id]) return prev
      return {
        ...prev,
        [partner.id]: [
          {
            sender: 'them',
            text: initialText || partner.autoReply,
            time: 'Μόλις τώρα',
          },
        ],
      }
    })
  }

  function handleSendRequest(studentId, customMessage) {
    if (!sentRequestIds.includes(studentId)) {
      setSentRequestIds([...sentRequestIds, studentId])
    }
    const student = recommendedStudents.find((s) => s.id === studentId)
    if (student && customMessage) {
      setChatsByPartnerId((prev) => ({
        ...prev,
        [studentId]: [
          { sender: 'me', text: customMessage, time: 'Μόλις τώρα' },
          { sender: 'them', text: student.autoReply, time: 'Μόλις τώρα' },
        ],
      }))
    }
    showToast(`Το αίτημα στάλθηκε στον/στην ${student?.name}!`)
  }

  function handleCancelRequest(studentId) {
    setSentRequestIds(sentRequestIds.filter((id) => id !== studentId))
    showToast('Το αίτημα ακυρώθηκε.')
  }

  function handleToggleSave(studentId) {
    if (savedIds.includes(studentId)) {
      setSavedIds(savedIds.filter((id) => id !== studentId))
    } else {
      setSavedIds([...savedIds, studentId])
      showToast('Αποθηκεύτηκε στα αγαπημένα.')
    }
  }

  function handleAccept(requestId) {
    const accepted = requests.find((request) => request.id === requestId)
    if (!accepted) return
    setPartners([...partners, accepted])
    setRequests(requests.filter((request) => request.id !== requestId))
    ensurePartnerChat(accepted, accepted.autoReply)
    showToast(`Νέα συνεργασία με ${accepted.name}!`)
  }

  function handleDecline(requestId) {
    setRequests(requests.filter((request) => request.id !== requestId))
  }

  function handleSimulateSentAccept(studentId) {
    const student = recommendedStudents.find((s) => s.id === studentId)
    if (!student) return
    setSentRequestIds(sentRequestIds.filter((id) => id !== studentId))
    if (!partners.some((p) => p.id === student.id)) {
      setPartners([...partners, { ...student, course: student.suggestedCourse }])
    }
    ensurePartnerChat(student, student.autoReply)
    showToast(`Ο/Η ${student.name} αποδέχτηκε το αίτημά σου!`)
  }

  function handleResetRequests() {
    setRequests(incomingRequests)
    showToast('Τα αρχικά αιτήματα επανήλθαν.')
  }

  function handleSendMessage(partnerId, text) {
    const currentMessages = chatsByPartnerId[partnerId] || []
    const replyIndex = Math.floor(currentMessages.length / 2) % extraAutoReplies.length
    const autoReplyText = extraAutoReplies[replyIndex]

    setChatsByPartnerId({
      ...chatsByPartnerId,
      [partnerId]: [
        ...currentMessages,
        { sender: 'me', text, time: 'Μόλις τώρα' },
        { sender: 'them', text: autoReplyText, time: 'Μόλις τώρα' },
      ],
    })
  }

  function handleTogglePreference(preferenceId) {
    if (activePreferences.includes(preferenceId)) {
      setActivePreferences(activePreferences.filter((id) => id !== preferenceId))
    } else {
      setActivePreferences([...activePreferences, preferenceId])
    }
  }

  function handleUpdateSkillLevel(skillName, delta) {
    setUser({
      ...user,
      skills: user.skills.map((skill) =>
        skill.name === skillName
          ? { ...skill, level: Math.min(100, Math.max(10, skill.level + delta)) }
          : skill,
      ),
    })
  }

  function handleAddSkill(skillName) {
    if (user.skills.some((s) => s.name === skillName)) return
    setUser({
      ...user,
      skills: [...user.skills, { name: skillName, level: 60 }],
    })
    showToast(`Προστέθηκε η δεξιότητα ${skillName}.`)
  }

  function handleRemoveSkill(skillName) {
    setUser({
      ...user,
      skills: user.skills.filter((s) => s.name !== skillName),
    })
  }

  function handleToggleLookingFor(skillName) {
    const exists = user.lookingFor.includes(skillName)
    setUser({
      ...user,
      lookingFor: exists
        ? user.lookingFor.filter((s) => s !== skillName)
        : [...user.lookingFor, skillName],
    })
  }

  function handleToggleCourse(courseName) {
    const exists = user.courses.includes(courseName)
    if (exists && user.courses.length <= 1) return
    setUser({
      ...user,
      courses: exists
        ? user.courses.filter((c) => c !== courseName)
        : [...user.courses, courseName],
    })
  }

  function handleCycleStudyTime() {
    const currentIndex = studyTimeOptions.indexOf(user.studyTime)
    const nextIndex = (currentIndex + 1) % studyTimeOptions.length
    setUser({ ...user, studyTime: studyTimeOptions[nextIndex] })
  }

  function handleCycleGradeGoal() {
    const currentIndex = gradeGoalOptions.indexOf(user.gradeGoal)
    const nextIndex = (currentIndex + 1) % gradeGoalOptions.length
    setUser({ ...user, gradeGoal: gradeGoalOptions[nextIndex] })
  }

  const sentStudents = recommendedStudents.filter((student) => sentRequestIds.includes(student.id))
  const partnerIds = partners.map((p) => p.id)

  return (
    <div className="flex min-h-dvh items-center justify-center gap-16 bg-linear-to-br from-indigo-50 via-white to-violet-100 sm:p-6">
      <DesktopIntro onNavigate={setActiveTab} />

      <MobileShell activeTab={activeTab} onTabChange={setActiveTab} requestCount={requests.length}>
        {toastMessage && (
          <div className="sticky top-2 z-10 mx-4 mt-2 rounded-xl bg-gray-900/90 px-3.5 py-2 text-center text-xs font-medium text-white shadow-md">
            {toastMessage}
          </div>
        )}

        {activeTab === 'discover' && (
          <Discover
            currentUser={user}
            students={recommendedStudents}
            sentRequestIds={sentRequestIds}
            partnerIds={partnerIds}
            savedIds={savedIds}
            onToggleSave={handleToggleSave}
            onSendRequest={handleSendRequest}
            onCancelRequest={handleCancelRequest}
            onOpenChat={setActiveChatPartner}
          />
        )}
        {activeTab === 'requests' && (
          <Requests
            requests={requests}
            sentStudents={sentStudents}
            partners={partners}
            onAccept={handleAccept}
            onDecline={handleDecline}
            onCancelSent={handleCancelRequest}
            onSimulateSentAccept={handleSimulateSentAccept}
            onOpenChat={setActiveChatPartner}
            onResetRequests={handleResetRequests}
            onNavigate={setActiveTab}
          />
        )}
        {activeTab === 'profile' && (
          <Profile
            user={user}
            preferences={studyPreferences}
            activePreferences={activePreferences}
            onTogglePreference={handleTogglePreference}
            onUpdateSkillLevel={handleUpdateSkillLevel}
            onAddSkill={handleAddSkill}
            onRemoveSkill={handleRemoveSkill}
            onToggleLookingFor={handleToggleLookingFor}
            onToggleCourse={handleToggleCourse}
            onCycleStudyTime={handleCycleStudyTime}
            onCycleGradeGoal={handleCycleGradeGoal}
            sentCount={sentRequestIds.length}
            partnerCount={partners.length}
          />
        )}
        {activeTab === 'ml' && <MLLogic />}

        {activeChatPartner && (
          <ChatModal
            partner={activeChatPartner}
            messages={
              chatsByPartnerId[activeChatPartner.id] || [
                { sender: 'them', text: activeChatPartner.autoReply, time: 'Μόλις τώρα' },
              ]
            }
            onSendMessage={handleSendMessage}
            onClose={() => setActiveChatPartner(null)}
          />
        )}
      </MobileShell>
    </div>
  )
}

export default App
