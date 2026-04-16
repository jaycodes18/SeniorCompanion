import { motion } from 'framer-motion'
import { useState } from 'react'
import axios from 'axios'

export default function HealthGuide() {
  const [input, setInput] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [inputType, setInputType] = useState('text')

  const handleAnalyze = async () => {
    if (!input.trim()) return

    setLoading(true)
    try {
      const res = await axios.post('/api/chat', {
        prompt: `You are a helpful health information assistant for seniors. Analyze this medical/health information and explain it in VERY SIMPLE language that a senior can understand. Include: what it means, what you should do, and any important warnings. Input: ${input}`,
      })
      setResponse(res.data.message)
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
          <h2 className="text-5xl font-bold gradient-text mb-4">Health Information Guide</h2>
          <p className="text-xl text-gray-300">Upload or describe your prescription, medical document, or health question</p>
        </div>

        {/* Input Type Selector */}
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="glassmorphism p-6 rounded-2xl mb-6"
        >
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={inputType === 'text'}
                onChange={() => setInputType('text')}
                className="w-5 h-5"
              />
              <span className="text-lg">Type Text</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={inputType === 'upload'}
                onChange={() => setInputType('upload')}
                className="w-5 h-5"
              />
              <span className="text-lg">Upload Image</span>
            </label>
          </div>
        </motion.div>

        {/* Input Box */}
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="glassmorphism p-8 rounded-3xl mb-8"
        >
          {inputType === 'text' ? (
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your prescription, medical document, or health question..."
              className="w-full h-40 px-6 py-4 bg-slate-800/50 border-2 border-cyan-500/30 rounded-xl text-lg focus:border-cyan-500 focus:outline-none transition-all resize-none"
            />
          ) : (
            <div className="border-2 border-dashed border-cyan-500/30 rounded-xl p-8 text-center hover:border-cyan-500/60 transition-all">
              <p className="text-gray-400 mb-4">📷 Click to upload prescription image</p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    const reader = new FileReader()
                    reader.onload = (event) => {
                      setInput(event.target?.result as string)
                    }
                    reader.readAsDataURL(file)
                  }
                }}
                className="hidden"
                id="upload"
              />
              <label htmlFor="upload" className="cursor-pointer">
                Choose File
              </label>
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full mt-4 px-6 py-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-green-500/50 disabled:opacity-50 transition-all duration-300"
          >
            {loading ? 'Analyzing...' : 'Analyze My Health Info'}
          </motion.button>
        </motion.div>

        {/* Response */}
        {response && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glassmorphism p-8 rounded-3xl glow-card border-2 border-green-500/30"
          >
            <h3 className="text-2xl font-bold mb-4 text-green-300">✅ Here's What This Means:</h3>
            <p className="text-lg leading-relaxed text-gray-100 whitespace-pre-wrap">{response}</p>
            <div className="mt-6 p-4 bg-amber-500/10 border-l-4 border-amber-500 rounded">
              <p className="text-amber-200 font-bold">⚠️ Important:</p>
              <p className="text-amber-100 text-sm mt-2">If you have serious health concerns, always talk to your doctor.</p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
