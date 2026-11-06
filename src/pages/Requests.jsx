import { Check, Clock, Inbox, MessageCircle, RotateCcw, Sparkles, X } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import Avatar from '../components/Avatar.jsx'
import MatchScore from '../components/MatchScore.jsx'
import SkillBadge from '../components/SkillBadge.jsx'

// Tab 2: requests from other students, requests the user sent, and accepted partners.
function Requests({
  requests,
  sentStudents,
  partners,
  onAccept,
  onDecline,
  onCancelSent,
  onSimulateSentAccept,
  onOpenChat,
  onResetRequests,
  onNavigate,
}) {
  return (
    <div>
      <PageHeader title="Αιτήματα" subtitle="Συμφοιτητές που θέλουν να συνεργαστούν μαζί σου." />

      <div className="space-y-6 p-4">
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-900">Νέα αιτήματα ({requests.length})</h2>
            {requests.length < 3 && (
              <button
                type="button"
                onClick={onResetRequests}
                className="flex cursor-pointer items-center gap-1 text-xs font-medium text-indigo-600 hover:underline"
              >
                <RotateCcw size={12} /> Επαναφορά αιτημάτων
              </button>
            )}
          </div>

          {requests.map((request) => (
            <article key={request.id} className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100">
              <div className="flex items-start gap-3">
                <Avatar initials={request.initials} color={request.avatarColor} />
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-900">{request.name}</h3>
                  <p className="text-xs text-gray-500">
                    {request.department} · {request.year}
                  </p>
                  <p className="text-xs text-gray-400">{request.timeAgo}</p>
                </div>
                <MatchScore score={request.matchScore} />
              </div>

              <p className="mt-3 text-xs text-gray-500">
                Για το μάθημα: <span className="font-medium text-gray-800">{request.course}</span>
              </p>
              <p className="mt-2 rounded-xl bg-gray-50 p-3 text-sm text-gray-700">{request.message}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {request.skills.map((skill) => (
                  <SkillBadge key={skill} name={skill} />
                ))}
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => onDecline(request.id)}
                  className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-gray-200 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  <X size={16} /> Απόρριψη
                </button>
                <button
                  onClick={() => onAccept(request.id)}
                  className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-indigo-600 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                >
                  <Check size={16} /> Αποδοχή
                </button>
              </div>
            </article>
          ))}

          {requests.length === 0 && (
            <div className="rounded-2xl bg-white p-6 text-center ring-1 ring-gray-100">
              <Inbox size={32} className="mx-auto text-gray-300" />
              <p className="mt-2 font-medium text-gray-700">Δεν έχεις άλλα νέα αιτήματα</p>
              <div className="mt-3 flex justify-center gap-4">
                <button
                  onClick={() => onNavigate('discover')}
                  className="cursor-pointer text-sm font-semibold text-indigo-600 hover:underline"
                >
                  Δες τις προτάσεις σου
                </button>
                <button
                  onClick={onResetRequests}
                  className="cursor-pointer text-sm font-medium text-gray-500 hover:underline"
                >
                  Επαναφορά όλων
                </button>
              </div>
            </div>
          )}
        </section>

        {sentStudents.length > 0 && (
          <section className="space-y-2">
            <h2 className="text-sm font-semibold text-gray-900">Αιτήματα που έστειλες ({sentStudents.length})</h2>
            {sentStudents.map((student) => (
              <div key={student.id} className="rounded-2xl bg-white p-3 ring-1 ring-gray-100">
                <div className="flex items-center gap-3">
                  <Avatar initials={student.initials} color={student.avatarColor} />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-900">{student.name}</p>
                    <p className="text-xs text-gray-500">{student.selectedCourse || student.suggestedCourse}</p>
                  </div>
                  <span className="flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
                    <Clock size={12} /> Σε αναμονή
                  </span>
                </div>
                <div className="mt-2.5 flex gap-2 border-t border-gray-100 pt-2.5">
                  <button
                    type="button"
                    onClick={() => onCancelSent(student.id)}
                    className="flex-1 cursor-pointer rounded-lg border border-gray-200 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
                  >
                    Ακύρωση
                  </button>
                  <button
                    type="button"
                    onClick={() => onSimulateSentAccept(student.id)}
                    className="flex flex-1 cursor-pointer items-center justify-center gap-1 rounded-lg bg-indigo-50 py-1.5 text-xs font-semibold text-indigo-700 hover:bg-indigo-100"
                  >
                    <Sparkles size={12} /> Δοκιμή: Αποδοχή
                  </button>
                </div>
              </div>
            ))}
          </section>
        )}

        {partners.length > 0 && (
          <section className="space-y-2">
            <h2 className="text-sm font-semibold text-gray-900">Οι συνεργάτες σου ({partners.length})</h2>
            {partners.map((partner) => (
              <div key={partner.id} className="flex items-center gap-3 rounded-2xl bg-white p-3 ring-1 ring-gray-100">
                <Avatar initials={partner.initials} color={partner.avatarColor} />
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-900">{partner.name}</p>
                  <p className="text-xs text-gray-500">{partner.course || partner.suggestedCourse}</p>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenChat(partner)}
                  className="flex cursor-pointer items-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700"
                >
                  <MessageCircle size={14} /> Συνομιλία
                </button>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  )
}

export default Requests
