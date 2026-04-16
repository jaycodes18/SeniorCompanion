import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import axios from 'axios'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi! I\'m ElderWise, your AI assistant. Ask me anything about technology or health!' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = { role: 'user' as const, content: input }
    setMessages([...messages, userMessage])
    setInput('')
    setLoading(true)

    try {
      const res = await axios.post('/api/chat', {
        prompt: `You are ElderWise, a helpful AI assistant for seniors. Be friendly, patient, and use simple language. User message: ${input}`,
      })
      setMessages((prev) => [...prev, { role: 'assistant', content: res.data.message }])
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }])
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 pb-12 flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto w-full flex flex-col flex-grow"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-5xl font-bold gradient-text">Ask ElderWise AI</h2>
          <p className="text-gray-300 mt-2">Chat with your personal AI assistant</p>
        </div>

        {/* Chat Container */}
        <div className="glassmorphism rounded-3xl p-6 flex-grow flex flex-col mb-6 max-h-[500px] overflow-y-auto">
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-br-none'
                    : 'bg-slate-700/50 text-gray-100 rounded-bl-none border border-cyan-500/30'
                }`}
              >
                <p className="text-sm leading-relaxed">{msg.content}</p>
              </div>
            </motion.div>
          ))}
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 mb-4"
            >
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Box */}
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="glassmorphism p-4 rounded-2xl flex gap-3"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your question..."
            className="flex-1 px-4 py-3 bg-slate-800/50 border-2 border-cyan-500/30 rounded-xl focus:border-cyan-500 focus:outline-none transition-all"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSend}
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-bold hover:shadow-xl hover:shadow-cyan-500/50 disabled:opacity-50 transition-all duration-300"
          >
            Send
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  )
}
