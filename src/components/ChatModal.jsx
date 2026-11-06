import { useState } from 'react'
import { Send, Sparkles, X } from 'lucide-react'
import Avatar from './Avatar.jsx'

const quickPrompts = [
  'Πότε σε βολεύει να μιλήσουμε;',
  'Έφτιαξα κοινό φάκελο για το project!',
  'Να βρεθούμε στη βιβλιοθήκη της ΑΣΟΕΕ;',
]

// Interactive chat modal with a partner. Any sent message triggers a pre-loaded reply.
function ChatModal({ partner, messages, onSendMessage, onClose }) {
  const [input, setInput] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    if (input.trim() === '') return
    onSendMessage(partner.id, input.trim())
    setInput('')
  }

  function handleQuickPrompt(text) {
    onSendMessage(partner.id, text)
  }

  return (
    <div className="absolute inset-0 z-20 flex items-end bg-black/40 sm:items-center sm:p-4" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="chat-title"
        className="flex h-[85%] w-full flex-col rounded-t-3xl bg-white sm:h-[540px] sm:rounded-3xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-gray-100 p-4">
          <Avatar initials={partner.initials} color={partner.avatarColor} />
          <div className="min-w-0 flex-1">
            <h2 id="chat-title" className="font-bold text-gray-900">
              {partner.name}
            </h2>
            <p className="text-xs text-emerald-600">
              Συνεργάτης · {partner.course || partner.suggestedCourse}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Κλείσιμο"
            className="cursor-pointer rounded-full p-1.5 text-gray-400 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto bg-gray-50 p-4">
          <p className="rounded-xl bg-indigo-50 p-2.5 text-center text-xs text-indigo-800">
            <Sparkles size={13} className="mr-1 inline" />
            Ταιριάξατε με {partner.matchScore}% συμβατότητα! Ξεκινήστε τη συνεργασία σας.
          </p>

          {messages.map((msg, idx) => (
            <div key={idx} className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}>
              <div
                className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm ${
                  msg.sender === 'me'
                    ? 'rounded-br-sm bg-indigo-600 text-white'
                    : 'rounded-bl-sm bg-white text-gray-800 shadow-xs ring-1 ring-gray-100'
                }`}
              >
                {msg.text}
              </div>
              <span className="mt-1 px-1 text-[10px] text-gray-400">{msg.time}</span>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-100 bg-white p-3">
          <div className="no-scrollbar mb-2 flex gap-1.5 overflow-x-auto pb-1">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => handleQuickPrompt(prompt)}
                className="shrink-0 cursor-pointer rounded-full bg-indigo-50 px-2.5 py-1 text-[11px] font-medium text-indigo-700 hover:bg-indigo-100"
              >
                {prompt}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Γράψε ένα μήνυμα..."
              className="flex-1 rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-800 focus:border-indigo-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={input.trim() === ''}
              aria-label="Αποστολή μηνύματος"
              className="flex cursor-pointer items-center justify-center rounded-xl bg-indigo-600 px-3.5 py-2 text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ChatModal

