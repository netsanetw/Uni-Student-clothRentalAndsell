import React, { useState, useRef, useEffect } from 'react'
import {
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  PaperAirplaneIcon,
  SparklesIcon,
  ArrowPathIcon,
  AcademicCapIcon,
  ShoppingBagIcon,
  QuestionMarkCircleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: 'bot',
    text: "👋 Hi! I'm **AttireAI**, your Smart Assistant for University Ceremony Attire & Marketplace.",
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    quickReplies: [
      "🎓 How do I verify my Student ID?",
      "👗 What attire is available for rent?",
      "📅 How does rental duration work?",
      "🏪 How can vendors list items?"
    ]
  }
]

const BOT_KNOWLEDGE_BASE = [
  {
    keywords: ['student', 'verify', 'id', 'discount', '20%', 'card'],
    response: "🎓 **Student Verification & Discount:**\n- Go to your **Student Dashboard** > **ID Verification** tab.\n- Upload a photo of your valid University ID.\n- Once approved by Admin, a **20% student discount** automatically applies to all rental bookings!"
  },
  {
    keywords: ['rent', 'attire', 'gown', 'habesha', 'suit', 'catalog', 'gown', 'dress'],
    response: "👗 **Available Attire & Packages:**\n- We offer official Graduation Gowns, Habesha Traditional Wear, Formal Suits, Blazers, and Accessories.\n- Browse our **Product Catalog** to filter by size, color, vendor, and daily rental rates."
  },
  {
    keywords: ['duration', 'days', 'return', 'late', 'fee', 'schedule', 'booking'],
    response: "📅 **Rental Duration & Returns:**\n- Standard rentals run for **3 to 7 days**.\n- Pickup details & return countdown timers are tracked in your **Student Dashboard**.\n- Late returns incur a standard daily fee of 50 ETB/day."
  },
  {
    keywords: ['vendor', 'sell', 'list', 'shop', 'boutique', 'commission'],
    response: "🏪 **Vendor Storefront:**\n- Boutique owners can register as a **Vendor** to manage inventory, track active rentals, and approve student requests directly from the **Vendor Portal**."
  },
  {
    keywords: ['payment', 'telebirr', 'chapa', 'price', 'cost'],
    response: "💳 **Payment Methods:**\n- We support Telebirr, Chapa, and major cards.\n- Payments are held securely in escrow until attire inspection at pickup."
  }
]

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const chatEndRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isOpen, isTyping])

  const handleSend = (textToSend) => {
    const query = textToSend || inputValue
    if (!query.trim()) return

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages((prev) => [...prev, userMsg])
    if (!textToSend) setInputValue('')
    setIsTyping(true)

    // Simulate AI response matching keywords
    setTimeout(() => {
      const lowerQuery = query.toLowerCase()
      const match = BOT_KNOWLEDGE_BASE.find((item) =>
        item.keywords.some((kw) => lowerQuery.includes(kw))
      )

      let botResponseText =
        match
          ? match.response
          : "✨ I'm trained on University Attire Rentals! You can ask about student ID verification, rental periods, gown sizes, vendor storefronts, or payment methods."

      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: botResponseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickReplies: !match
          ? ["🎓 How do I verify my Student ID?", "👗 Browse Gowns Catalog", "💳 Supported Payments"]
          : null
      }

      setMessages((prev) => [...prev, botMsg])
      setIsTyping(false)
    }, 800)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Chat Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center justify-center p-4 bg-gradient-to-r from-amber-600 via-yellow-600 to-indigo-700 text-white rounded-full shadow-2xl hover:scale-105 transition-all duration-300 ring-4 ring-amber-400/30"
          aria-label="Open AI Assistant"
        >
          <SparklesIcon className="w-6 h-6 animate-pulse mr-1 text-amber-200" />
          <ChatBubbleLeftRightIcon className="w-7 h-7" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white"></span>
          </span>
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-sm font-semibold pl-2">
            Ask AttireAI
          </span>
        </button>
      )}

      {/* Expanded Chatbot Modal / Drawer */}
      {isOpen && (
        <div className="w-[90vw] sm:w-[380px] h-[520px] bg-slate-900/95 backdrop-blur-md text-slate-100 rounded-2xl shadow-2xl border border-slate-700/60 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-amber-950 border-b border-slate-700/50 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative p-2 bg-amber-500/20 rounded-xl border border-amber-500/40 text-amber-400">
                <SparklesIcon className="w-6 h-6" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-slate-900"></span>
              </div>
              <div>
                <h3 className="font-bold text-base text-amber-100 flex items-center gap-1.5">
                  AttireAI Helper
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.5 rounded font-mono">
                    v1.0
                  </span>
                </h3>
                <p className="text-xs text-slate-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                  Online • Smart Assistance
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
              aria-label="Close Chat"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-sm scrollbar-thin scrollbar-thumb-slate-700">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-amber-600 to-yellow-600 text-white rounded-br-none'
                      : 'bg-slate-800/90 text-slate-200 border border-slate-700/80 rounded-bl-none'
                  }`}
                >
                  <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>
                  <div
                    className={`text-[10px] mt-1.5 ${
                      msg.sender === 'user' ? 'text-amber-200 text-right' : 'text-slate-400'
                    }`}
                  >
                    {msg.time}
                  </div>
                </div>

                {/* Quick Reply Chips */}
                {msg.quickReplies && (
                  <div className="flex flex-wrap gap-1.5 mt-2.5 max-w-[90%]">
                    {msg.quickReplies.map((reply, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(reply)}
                        className="text-xs bg-slate-800 hover:bg-amber-900/40 text-amber-300 border border-amber-500/30 rounded-full px-3 py-1.5 transition-all duration-200 hover:border-amber-400"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center space-x-2 text-slate-400 text-xs bg-slate-800/50 p-2.5 rounded-xl max-w-[120px] border border-slate-700/40">
                <ArrowPathIcon className="w-4 h-4 animate-spin text-amber-400" />
                <span>Thinking...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Action Footer Chips */}
          <div className="px-3 py-2 bg-slate-950/60 border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto whitespace-nowrap text-xs">
            <button
              onClick={() => handleSend('🎓 How do I verify my Student ID?')}
              className="flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-[11px]"
            >
              <AcademicCapIcon className="w-3.5 h-3.5 text-amber-400" /> ID Discount
            </button>
            <button
              onClick={() => handleSend('👗 What attire is available for rent?')}
              className="flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-[11px]"
            >
              <ShoppingBagIcon className="w-3.5 h-3.5 text-indigo-400" /> Catalog
            </button>
            <button
              onClick={() => handleSend('📅 Rental duration')}
              className="flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-[11px]"
            >
              <QuestionMarkCircleIcon className="w-3.5 h-3.5 text-emerald-400" /> Rules
            </button>
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSend()
            }}
            className="p-3 bg-slate-900 border-t border-slate-800 flex items-center space-x-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask AttireAI about gown rentals..."
              className="flex-1 bg-slate-800/90 text-slate-100 placeholder-slate-400 text-xs sm:text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500/50 border border-slate-700"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="p-2.5 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 disabled:opacity-50 text-white rounded-xl transition shadow-md"
            >
              <PaperAirplaneIcon className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default AIChatbot
