import { motion } from 'framer-motion'
import { useState } from 'react'
import axios from 'axios'

export default function TechTutor() {
  const [query, setQuery] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState<{ q: string; a: string }[]>([])

  const handleSearch = async () => {
    if (!query.trim()) return

    setLoading(true)
    try {
      const res = await axios.post('/api/chat', {
        prompt: `You are a patient tech tutor for seniors. Explain step-by-step in simple language (use LARGE TEXT, avoid jargon): ${query}`,
      })
      setResponse(res.data.message)
      setHistory([{ q: query, a: res.data.message }, ...history])
      setQuery('')
    } catch (error) {
      setResponse('Sorry, I encountered an error. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold gradient-text mb-4">Learn Technology</h2>
          <p className="text-xl text-gray-300">Ask any tech question and I'll explain it simply</p>
        </div>

        {/* Search Box */}
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="glassmorphism p-8 rounded-3xl mb-8"
        >
          <div className="flex flex-col gap-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="How do I video call? What is cloud storage? etc..."
              className="w-full px-6 py-4 bg-slate-800/50 border-2 border-cyan-500/30 rounded-xl text-lg focus:border-cyan-500 focus:outline-none transition-all"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSearch}
              disabled={loading}
              className="w-full px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-cyan-500/50 disabled:opacity-50 transition-all duration-300"
            >
              {loading ? 'Thinking...' : 'Get Help'}
            </motion.button>
          </div>
        </motion.div>

        {/* Response */}
        {response && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glassmorphism p-8 rounded-3xl mb-8 glow-card"
          >
            <h3 className="text-2xl font-bold mb-4 text-cyan-300">📚 Here's the Answer:</h3>
            <p className="text-lg leading-relaxed text-gray-100 whitespace-pre-wrap">{response}</p>
          </motion.div>
        )}

        {/* History */}
        {history.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-cyan-300">Previous Questions</h3>
            {history.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glassmorphism p-4 rounded-xl hover:bg-cyan-500/10 cursor-pointer transition-all"
              >
                <p className="font-bold text-cyan-300">Q: {item.q}</p>
                <p className="text-gray-400 mt-2">A: {item.a.substring(0, 100)}...</p>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}
